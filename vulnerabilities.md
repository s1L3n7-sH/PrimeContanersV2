# Security Vulnerability Assessments

## 1. Unauthenticated Arbitrary File Read / Path Traversal
**Severity**: High
**Location**: `src/app/api/download-resume/[filename]/route.ts`
**Status**: ✅ **FIXED**

### Remediation Applied
- Added authentication check using `verifySession`. Access is now restricted to logged-in Staff/Admins.
- Implemented `path.basename()` to sanitize filenames, preventing directory traversal attacks.
- Enforced strict `.pdf` extension validation.

---

## 2. Weak Randomness in Filename Generation
**Severity**: Medium
**Location**: `src/app/career/actions.ts`
**Status**: ✅ **FIXED**

### Remediation Applied
- Replaced `Math.random()` with `crypto.randomUUID()` to generate cryptographically secure, unpredictable filenames for uploaded resumes.

---

## 3. Potential Email HTML Injection
**Severity**: Low/Medium
**Location**: `src/actions/order.actions.ts`
**Status**: ✅ **FIXED**

### Remediation Applied
- Implemented `escapeHtml` helper function.
- All user-provided names are now escaped before being interpolated into the email template, preventing HTML/link injection.

---

## 4. "Lead Stealing" Logic Flaw (IDOR / Privilege Escalation)
**Severity**: Medium
**Location**: `src/actions/admin-orders.actions.ts`
**Status**: ✅ **FIXED**

### Remediation Applied
- Updated `assignOrderToMe` to enforce assignment rules.
- Orders already assigned to another user cannot be re-assigned by Staff.
- Admins retain the ability to override assignments.

---

## 5. Lack of Rate Limiting on Public Forms
**Severity**: Medium
**Location**: `src/actions/order.actions.ts`
**Status**: ⚠️ **Pending / Operational**

### Mitigation
- Recommend enabling rate limiting at the infrastructure level (Vercel/Cloudflare).

---

## Vulnerability Scan Summary

*   **RCE**: **Safe** (No unsafe execution or serialization found).
*   **LFI**: **Safe** (Fixed resume download).
*   **IDOR**: **Fixed** (Resume download & Lead Stealing).
*   **XSS**: **Safe** (React + Email Fix).
*   **SQLi**: **Safe** (Prisma ORM).
