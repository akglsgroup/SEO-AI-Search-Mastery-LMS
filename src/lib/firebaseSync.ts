import { 
  getFirebaseAuth, 
  getFirebaseFirestore, 
  isFirebaseConfigured 
} from "./firebase";

export { isFirebaseConfigured };
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  User as FirebaseUser
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot,
  arrayUnion,
  deleteDoc
} from "firebase/firestore";
import { UserProfile, CRMLead } from "../types";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const auth = getFirebaseAuth();
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// 1. Authenticate with Google
export async function signInWithGoogle(): Promise<{ firebaseUser: FirebaseUser; profile: UserProfile }> {
  try {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    const email = firebaseUser.email || "";
    const name = firebaseUser.displayName || "Verified Apprentice";
    const isAdmin = email.trim().toLowerCase() === "amrish.singh01@gmail.com";

    // Try loading existing profile from Firestore
    let profile: UserProfile = {
      isLoggedIn: true,
      name,
      email,
      phone: "",
      role: isAdmin ? "Global Admin" : "Student",
      linkedin: "",
      avatarUrl: firebaseUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      isAdmin
    };

    try {
      const db = getFirebaseFirestore();
      const userRef = doc(db, "users", firebaseUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        profile = {
          isLoggedIn: true,
          name: data.name || name,
          email: data.email || email,
          phone: data.phone || "",
          role: data.role || (isAdmin ? "Global Admin" : "Student"),
          linkedin: data.linkedin || "",
          avatarUrl: data.avatarUrl || firebaseUser.photoURL || profile.avatarUrl,
          isAdmin: data.isAdmin || isAdmin,
          userPoints: data.userPoints,
          streakCount: data.streakCount
        };
      } else {
        // Create initial user document
        await setDoc(userRef, {
          ...profile,
          userPoints: 50,
          streakCount: 1,
          completedItemIds: []
        });
      }
    } catch (dbError) {
      console.warn("Could not load user profile from Firestore, using default", dbError);
    }

    return { firebaseUser, profile };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, "auth/google-sign-in");
    throw error;
  }
}

// 2. Sign Out
export async function logoutUser(): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    await signOut(auth);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, "auth/sign-out");
  }
}

// 3. Sync User Profile (Points, Streaks, Completions) to Firestore
export async function syncUserProfileToFirestore(
  uid: string, 
  profile: Partial<UserProfile> & { userPoints?: number; streakCount?: number; completedItemIds?: string[]; pointLogs?: any[] }
): Promise<void> {
  if (!isFirebaseConfigured()) return;
  const path = `users/${uid}`;
  try {
    const db = getFirebaseFirestore();
    const userRef = doc(db, "users", uid);
    
    // Read first to check existence
    const userSnap = await getDoc(userRef);
    const dataToSave = {
      isLoggedIn: true,
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      role: profile.role || "Student",
      linkedin: profile.linkedin || "",
      avatarUrl: profile.avatarUrl || "",
      isAdmin: profile.isAdmin || false,
      userPoints: profile.userPoints ?? 50,
      streakCount: profile.streakCount ?? 1,
      completedItemIds: profile.completedItemIds ?? [],
      pointLogs: profile.pointLogs ?? []
    };

    await setDoc(userRef, dataToSave, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 4. Load User Extra Progress Data from Firestore
export async function loadUserProgressFromFirestore(uid: string): Promise<any> {
  const path = `users/${uid}`;
  try {
    const db = getFirebaseFirestore();
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

// 5. Submit Lead to Firestore
export async function submitLeadToFirestore(lead: Omit<CRMLead, "id"> & { id?: string }): Promise<void> {
  const path = "leads";
  try {
    const db = getFirebaseFirestore();
    const leadId = lead.id || `lead-${Date.now()}`;
    const leadRef = doc(db, "leads", leadId);
    
    await setDoc(leadRef, {
      id: leadId,
      name: lead.name || "",
      email: lead.email || "",
      organization: lead.organization || "",
      website: lead.website || "",
      interest: lead.interest || "seo-strategy",
      message: lead.message || "",
      status: lead.status || "New",
      createdAt: lead.createdAt || new Date().toISOString(),
      notes: lead.notes || ""
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 6. Load Leads from Firestore (Admin Only)
export async function loadLeadsFromFirestore(): Promise<CRMLead[]> {
  const path = "leads";
  try {
    const db = getFirebaseFirestore();
    const leadsColl = collection(db, "leads");
    const snapshot = await getDocs(leadsColl);
    const leadsList: CRMLead[] = [];
    snapshot.forEach(doc => {
      leadsList.push(doc.data() as CRMLead);
    });
    // Sort by date descending
    return leadsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

// 7. Update Lead (Admin Only)
export async function updateLeadInFirestore(leadId: string, updates: Partial<CRMLead>): Promise<void> {
  const path = `leads/${leadId}`;
  try {
    const db = getFirebaseFirestore();
    const leadRef = doc(db, "leads", leadId);
    await updateDoc(leadRef, updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 8. Delete Lead (Admin Only)
export async function deleteLeadInFirestore(leadId: string): Promise<void> {
  const path = `leads/${leadId}`;
  try {
    const db = getFirebaseFirestore();
    await deleteDoc(doc(db, "leads", leadId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// 9. Load Community Questions
export async function loadQuestionsFromFirestore(): Promise<any[]> {
  const path = "community_questions";
  try {
    const db = getFirebaseFirestore();
    const snapshot = await getDocs(collection(db, "community_questions"));
    const list: any[] = [];
    snapshot.forEach(docSnap => {
      list.push(docSnap.data());
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

// 10. Subscribe to Community Questions (Real-time updates)
export function subscribeToCommunityQuestions(onUpdate: (questions: any[]) => void, onError?: (err: any) => void) {
  const path = "community_questions";
  const db = getFirebaseFirestore();
  return onSnapshot(collection(db, "community_questions"), (snapshot) => {
    const list: any[] = [];
    snapshot.forEach(docSnap => {
      list.push(docSnap.data());
    });
    // Sort by createdAt descending
    const sorted = list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    onUpdate(sorted);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, path);
    if (onError) onError(error);
  });
}

// 11. Add/Update Question
export async function saveQuestionToFirestore(question: any): Promise<void> {
  const path = `community_questions/${question.id}`;
  try {
    const db = getFirebaseFirestore();
    const ref = doc(db, "community_questions", question.id);
    await setDoc(ref, question);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
