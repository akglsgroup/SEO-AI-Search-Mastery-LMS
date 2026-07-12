# Firestore Security Specification - AskAmrish LMS

This specification defines the strict security guidelines, data invariants, and access control policies for the AskAmrish SEO & AI Search Mastery LMS platform.

## 1. Data Invariants

- **Users (`/users/{userId}`)**: 
  - A user profile can only be created by the authenticated owner (`userId == request.auth.uid`).
  - Users cannot promote themselves to admins (`isAdmin` must not be modifiable by non-admins).
  - Profile read access is strictly restricted to the owner or a global administrator.
  - Verification check: Users must have an authenticated, verified Google email.

- **Leads (`/leads/{leadId}`)**:
  - Leads contain sensitive PII (Name, Email, Phone, Organization).
  - Anyone can create a lead (to submit contact/booking requests), but the fields must be strictly validated.
  - Read/List/Update operations on Leads are restricted exclusively to authenticated Global Admins (`isAdmin()`).

- **Community Questions (`/community_questions/{questionId}`)**:
  - Any authenticated user can read or list community questions.
  - Any authenticated user can create a question under their own verified identity.
  - Upvotes can be toggled, but a user cannot arbitrarily modify the votes count without registering their UID in a tracking array.
  - Replies can be added to a question, but they must maintain correct author attribution.

---

## 2. The "Dirty Dozen" Malicious Payloads

The following payloads represent attempt-vectors designed to compromise security and are explicitly blocked by the database rules:

1. **Self-Promotion Admin Exploit**: Non-admin user tries to create/update profile with `isAdmin: true`.
2. **PII Data Scrape**: Unauthenticated or unauthorized student tries to list or read other students' profile details.
3. **Ghost Lead Injection**: Injecting a lead document with custom/ghost fields (`isPremiumClient: true`) not present in the schema.
4. **Lead PII Leak**: Authenticated non-admin student attempts to list or view lead entries.
5. **Junk Lead Poisoning**: Submitting lead data with a 1MB string or empty fields.
6. **Lead Status Bypass**: Submitting a lead with pre-set status of "Deal Closed" instead of "New".
7. **Question Identity Hijack**: Student creating a community question but setting the author field as "Amrish Kumar Singh".
8. **Junk ID Attack**: Attempting to write a document with an ID containing malicious symbols or extremely long characters (e.g. `../` directory traversal or `null`).
9. **Spam Question Injection**: Injecting a community question with extremely large text strings (exceeding 2000 chars).
10. **Self-Upvoting Exploit**: Incrementing upvotes by 500 without submitting corresponding UIDs.
11. **Admin Note Hijack**: Non-admin modifying admin notes on a lead document.
12. **Streak Counter Manipulation**: Artificially increasing local streak counter to 1000 in a database update payload.

---

## 3. Test Cases (Security Rules Verification)

All security rules are verified to ensure that:
- `create` or `update` of unauthorized fields returns `PERMISSION_DENIED`.
- Accessing other user documents returns `PERMISSION_DENIED`.
- Listing `/leads` by non-admins returns `PERMISSION_DENIED`.
