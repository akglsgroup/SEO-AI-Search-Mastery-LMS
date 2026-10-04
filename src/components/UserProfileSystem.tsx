import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  Lock, Mail, User, Phone, Linkedin, LogOut, Sparkles, 
  Shield, Check, UserCheck, Key, Globe, ArrowRight, Zap 
} from "lucide-react";
import { signInWithGoogle, isFirebaseConfigured } from "../lib/firebaseSync";


interface LockedTabScreenProps {
  tabName: string;
  onInitiateLogin: () => void;
}

export function LockedTabScreen({ tabName, onInitiateLogin }: LockedTabScreenProps) {
  const getTabDetails = () => {
    return {
      title: "Sign In to Access Advanced Features",
      desc: "Secure your workspace progress, save custom learning tracks, and sync course completions across devices.",
      benefit: "Unlock the full power of AskAmrish LMS"
    };
  };

  const details = getTabDetails();

  return (
    <div className="p-8 md:p-12 bg-white border border-neutral-200 rounded-3xl shadow-xs max-w-2xl mx-auto text-center space-y-6" id="locked-workspace-screen">
      <div className="w-16 h-16 bg-neutral-900 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
        <Lock size={28} className="text-amber-400" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-sans font-black text-neutral-900 tracking-tight leading-snug">
          {details.title}
        </h2>
        <p className="text-xs text-neutral-500 leading-relaxed max-w-lg mx-auto">
          {details.desc}
        </p>
      </div>

      <div className="p-4 bg-neutral-50 border border-neutral-200/60 rounded-2xl max-w-md mx-auto text-left flex items-start gap-3">
        <span className="text-base">🎁</span>
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase text-neutral-400 leading-none mb-1">
            VERIFIED APPRENTICE BENEFIT
          </h4>
          <p className="text-[11px] text-neutral-600 font-medium">
            {details.benefit}
          </p>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={onInitiateLogin}
          className="px-6 py-3 bg-neutral-900 hover:bg-neutral-805 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mx-auto cursor-pointer hover:scale-[1.02]"
        >
          <Mail size={14} className="text-amber-400" />
          <span>Connect Google Account</span>
        </button>
      </div>
    </div>
  );
}

interface GoogleLoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  suggestedEmail?: string;
}

export function GoogleLoginModal({ onClose, onLoginSuccess, suggestedEmail }: GoogleLoginModalProps) {
  const [email, setEmail] = useState(suggestedEmail || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [role, setRole] = useState("Student");
  const [showAdvancedForm, setShowAdvancedForm] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorText("");
    try {
      const { profile } = await signInWithGoogle();
      onLoginSuccess(profile);
      onClose();
    } catch (e: any) {
      console.error(e);
      setErrorText("Google Sign-In failed. Please verify configurations or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectQuickAccount = (selectedEmail: string, selectedName: string, selectedRole: string, isAdmin: boolean) => {
    const defaultProfile: UserProfile = {
      isLoggedIn: true,
      name: selectedName,
      email: selectedEmail,
      phone: isAdmin ? "+91 831 811 4492" : "+91 99999 00000",
      linkedin: isAdmin ? "https://linkedin.com/in/amrish-kumar-singh" : "",
      role: selectedRole,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedName)}&backgroundColor=0d0d0d,1a1a1a&textColor=ffffff`,
      isAdmin: isAdmin
    };
    
    onLoginSuccess(defaultProfile);
    onClose();
  };

  const handleSubmitCustomProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    // Check if the input email is Amrish's admin email
    const isAdmin = email.trim().toLowerCase() === "amrish.singh01@gmail.com";

    const customProfile: UserProfile = {
      isLoggedIn: true,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || "+91 831 811 4492",
      linkedin: linkedin.trim(),
      role: isAdmin ? "Global Admin" : role,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0d0d0d,1a1a1a&textColor=ffffff`,
      isAdmin: isAdmin
    };

    onLoginSuccess(customProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center z-55 p-4 animate-fade-in" id="google-login-modal">
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl max-w-md w-full overflow-hidden flex flex-col">
        
        {/* Header decoration */}
        <div className="p-5 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-neutral-900 text-white rounded-md flex items-center justify-center font-bold text-xs">
              G
            </div>
            <span className="text-[11px] font-mono font-extrabold text-neutral-400 uppercase tracking-wider">
              Google Account Gateway
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-neutral-400 hover:text-neutral-700 font-bold text-xs"
          >
            ✕
          </button>
        </div>

        {step === 1 ? (
          <div className="p-6 space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold text-neutral-900">Choose an Account</h3>
              <p className="text-[11px] text-neutral-400">to continue to AskAmrish Platform</p>
            </div>

            {/* Primary Google Auth Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full p-4 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-600 text-white border border-neutral-800 rounded-2xl flex items-center justify-center gap-3 transition-all cursor-pointer hover:scale-[1.01] shadow-md font-bold text-xs"
            >
              <div className="w-5 h-5 bg-white text-neutral-900 rounded-lg flex items-center justify-center font-black text-xs shrink-0">
                G
              </div>
              <span>{loading ? "Connecting securely..." : "Sign In with Google (Database Sync)"}</span>
            </button>

            {errorText && (
              <p className="text-[10px] text-red-600 font-mono text-center font-semibold bg-red-50 p-2 rounded-lg border border-red-100">{errorText}</p>
            )}

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-neutral-150"></div>
              <span className="flex-shrink mx-4 text-[9px] font-mono font-bold uppercase text-neutral-400 tracking-wider">OR QUICK LOGINS</span>
              <div className="flex-grow border-t border-neutral-150"></div>
            </div>

            {/* Quick Select Accounts */}
            <div className="space-y-2">
              
              {/* Amrish Admin Account Option */}
              <button
                onClick={() => handleSelectQuickAccount("amrish.singh01@gmail.com", "Amrish Kumar Singh", "Global Admin", true)}
                className="w-full p-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 bg-neutral-900 text-amber-400 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0">
                    👑
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black text-neutral-900 truncate">
                      Amrish Kumar Singh
                    </h4>
                    <p className="text-[10px] text-neutral-500 truncate">
                      amrish.singh01@gmail.com
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[8px] font-mono font-black uppercase rounded shrink-0 group-hover:scale-105 transition-all">
                  ADMIN LOGIN
                </span>
              </button>

              {/* Guest Student Option */}
              <button
                onClick={() => handleSelectQuickAccount("student.demo@gmail.com", "Verified Apprentice", "SEO Specialist", false)}
                className="w-full p-3 bg-white hover:bg-neutral-50 border border-neutral-150 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 bg-neutral-100 text-neutral-600 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0">
                    👤
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 truncate">
                      Verified Apprentice
                    </h4>
                    <p className="text-[10px] text-neutral-500 truncate">
                      student.demo@gmail.com
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-500 text-[8px] font-mono rounded shrink-0">
                  QUICK GUEST
                </span>
              </button>

            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-neutral-150"></div>
              <span className="flex-shrink mx-4 text-[9px] font-mono font-bold uppercase text-neutral-400 tracking-wider">OR</span>
              <div className="flex-grow border-t border-neutral-150"></div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-2.5 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <UserCheck size={13} className="text-neutral-500" />
              <span>Use Custom Professional Profile</span>
            </button>

            <p className="text-[10px] text-neutral-400 text-center leading-relaxed">
              We value privacy. Your local storage holds your profile data. If logging in with <b>amrish.singh01@gmail.com</b>, you will automatically switch into Global Administrator mode to manage public submissions and CRM logs.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitCustomProfile} className="p-6 space-y-4">
            <div className="text-center space-y-1 mb-2">
              <h3 className="text-base font-extrabold text-neutral-900">Construct Professional Profile</h3>
              <p className="text-[11px] text-neutral-400">Add detailed parameters so Amrish knows your context</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase text-neutral-500">Your Email Address *</label>
              <div className="relative">
                <Mail size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. apprentice@company.com"
                  className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-neutral-900"
                />
              </div>
              <p className="text-[9px] text-neutral-400 font-semibold leading-none">
                Hint: Type <b>amrish.singh01@gmail.com</b> to trigger full admin rights.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase text-neutral-500">Full Name *</label>
              <div className="relative">
                <User size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Divya Sen"
                  className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-neutral-900"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase text-neutral-500">Phone / WhatsApp</label>
              <div className="relative">
                <Phone size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 831 811 4492"
                  className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-neutral-900"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase text-neutral-500">LinkedIn URL</label>
              <div className="relative">
                <Linkedin size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-neutral-900"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase text-neutral-500">Current Professional Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3.5 py-2.5 text-xs text-neutral-900"
              >
                <option value="Student">Student / Digital Apprentice</option>
                <option value="Founder">Founder / Business Owner</option>
                <option value="SEO Specialist">SEO Specialist / Marketer</option>
                <option value="Developer">Technical Engineer / Developer</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-150 text-neutral-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-805 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
              >
                Confirm Account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface UserProfileModalProps {
  user: UserProfile;
  onClose: () => void;
  onLogout: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

export function UserProfileModal({ user, onClose, onLogout, onUpdateUser }: UserProfileModalProps) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [linkedin, setLinkedin] = useState(user.linkedin);
  const [role, setRole] = useState(user.role);
  const [isSaved, setIsSaved] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      phone,
      linkedin,
      role
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center z-55 p-4 animate-fade-in" id="user-profile-modal">
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl max-w-md w-full overflow-hidden flex flex-col">
        <div className="p-5 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">👤</span>
            <span className="text-[11px] font-mono font-extrabold text-neutral-400 uppercase tracking-wider">
              Manage Detailed Profile
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-neutral-400 hover:text-neutral-700 font-bold text-xs"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleUpdate} className="p-6 space-y-4">
          <div className="flex items-center gap-4 bg-neutral-50 border border-neutral-150 p-3.5 rounded-2xl">
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-neutral-200 shadow-3xs"
            />
            <div className="min-w-0">
              <h3 className="text-xs font-black text-neutral-900 truncate flex items-center gap-1.5">
                <span>{user.name}</span>
                {user.isAdmin && (
                  <span className="px-1.5 py-0.2 bg-amber-500 text-neutral-950 text-[7px] font-mono font-black uppercase rounded">
                    ADMIN
                  </span>
                )}
              </h3>
              <p className="text-[10px] text-neutral-500 truncate">{user.email}</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase text-neutral-500 font-extrabold">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3.5 py-2 text-xs text-neutral-900 font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase text-neutral-500 font-extrabold">Phone / WhatsApp</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91..."
              className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3.5 py-2 text-xs text-neutral-900 font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase text-neutral-500 font-extrabold">LinkedIn Link</label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/..."
              className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3.5 py-2 text-xs text-neutral-900 font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase text-neutral-500 font-extrabold">Role</label>
            <select
              value={role}
              disabled={user.isAdmin}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-250 focus:border-neutral-900 outline-none rounded-xl px-3.5 py-2 text-xs text-neutral-900 font-semibold"
            >
              <option value="Student">Student / Digital Apprentice</option>
              <option value="Founder">Founder / Business Owner</option>
              <option value="SEO Specialist">SEO Specialist / Marketer</option>
              <option value="Developer">Technical Engineer / Developer</option>
              {user.isAdmin && <option value="Global Admin">Global Admin</option>}
            </select>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {isSaved ? (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
                <Check size={14} />
                <span>Profile updated successfully!</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-805 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check size={14} />
                <span>Save Profile Updates</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <LogOut size={13} />
              <span>Log Out of AskAmrish</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
