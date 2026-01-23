# Career Application Security Implementation Summary

## Overview
Comprehensive multi-layer security implementation for PDF upload in the career application feature to prevent malicious file uploads including webshells, executables, and other dangerous content.

## Security Layers Implemented

### 1. Client-Side Validation (Career Page)
**File:** `src/app/career/page.tsx`

#### Validation Checks:
1. **File Size Validation**
   - Minimum: 100 bytes (prevents empty/fake files)
   - Maximum: 5MB (prevents DoS attacks)

2. **File Extension Check**
   - Only allows `.pdf` extension
   - Case-insensitive check

3. **Suspicious Pattern Detection**
   - Blocks double extensions (e.g., `file.exe.pdf`, `file.pdf.exe`)
   - Detects common executable extensions disguised as PDF

4. **MIME Type Validation**
   - Verifies file type is exactly `application/pdf`

5. **PDF Magic Number Verification**
   - Reads file signature (first 4 bytes)
   - Validates against PDF magic number: `%PDF` (hex: 25 50 44 46)
   - Prevents non-PDF files with fake `.pdf` extension

### 2. Server-Side Validation (Career Actions)
**File:** `src/app/career/actions.ts`

#### Validation Checks:
1. **Input Sanitization**
   - All text inputs (name, email, phone) are sanitized
   - XSS protection via HTML tag removal
   - Special character encoding

2. **MIME Type Validation**
   - Server-side verification of `application/pdf`

3. **File Extension Validation**
   - Strict `.pdf` extension check
   - Case-insensitive validation

4. **Double Extension Detection**
   - Pattern matching for suspicious combinations
   - Blocks: `.pdf.exe`, `.exe.pdf`, etc.
   - Detects hidden dangerous extensions

5. **File Size Validation**
   - Min: 100 bytes
   - Max: 5MB
   - Prevents both tiny fake files and large DoS attempts

6. **PDF File Signature Verification**
   - Validates PDF magic number on server
   - Reads actual file buffer content
   - Prevents renamed executables

7. **PDF Structure Validation**
   - Checks for `%%EOF` marker (PDF end marker)
   - Verifies `/Type /Catalog` (PDF structure)
   - Ensures file is structurally valid PDF

8. **Embedded Content Scanning**
   - Scans file content for dangerous patterns:
     - `MZ` - Windows executable header
     - `#!/` - Shell script shebang
     - `<?php` - PHP code
     - `<script` - JavaScript
     - `eval(` - Potentially dangerous code
   
9. **Secure Filename Generation**
   - Timestamp prefix
   - Random string component
   - Sanitized original name
   - Forces `.pdf` extension

10. **File Upload Verification**
    - Verifies written file size matches buffer
    - Auto-cleanup on verification failure

### 3. Sanitization Utilities
**File:** `src/lib/sanitize.ts`

#### Functions:

**`validatePDFFile(file: File)`** - Client-side
- Comprehensive PDF validation
- Returns validation result with error messages

**`validatePDFBuffer(buffer: Buffer, filename: string)`** - Server-side
- Buffer-level PDF validation
- Magic number verification
- Structure validation

**`sanitizeInput(input: string)`**
- Removes HTML tags
- Removes script tags
- Encodes special characters
- XSS protection

**`sanitizeFilename(filename: string)`**
- Removes path separators (prevents directory traversal)
- Removes dangerous characters
- Enforces `.pdf` extension
- Limits filename length
- Alphanumeric + safe characters only

**`sanitizeEmail(email: string)`**
- Email-specific sanitization
- Lowercase conversion
- Dangerous character removal

**`sanitizePhone(phone: string)`**
- Phone-specific sanitization
- Allows only: digits, spaces, hyphens, plus, parentheses

## Attack Prevention

### Prevented Attack Vectors:
1. ✅ **Webshell Upload** - Blocked via magic number verification
2. ✅ **Executable Upload** - Multiple layers of detection
3. ✅ **Double Extension Attack** - Pattern detection
4. ✅ **MIME Type Spoofing** - Magic number verification
5. ✅ **Directory Traversal** - Filename sanitization
6. ✅ **XSS in Form Fields** - Input sanitization
7. ✅ **File Bomb/DoS** - File size limits
8. ✅ **Embedded Scripts** - Content scanning
9. ✅ **PHP/ASP Webshells** - Extension blacklist & content scan
10. ✅ **Polyglot Files** - Multiple validation layers

## File Upload Flow

```
User uploads file
    ↓
Client-Side Validation (JavaScript)
    → Extension check
    → MIME type check
    → Size check
    → Magic number verification
    → Suspicious pattern detection
    ↓
Server-Side Validation (Node.js)
    → Re-validate all client checks
    → Buffer-level magic number check
    → PDF structure validation
    → Embedded content scanning
    → Dangerous pattern detection
    ↓
Secure File Storage
    → Sanitized filename generation
    → Timestamp + random string prefix
    → Force .pdf extension
    → Write verification
    ↓
Database Storage
    → Sanitized user inputs
    → Safe file path reference
```

## Security Best Practices Implemented

1. **Defense in Depth** - Multiple validation layers
2. **Never Trust Client** - All validations repeated on server
3. **Whitelist Approach** - Only PDF allowed, everything else blocked
4. **Content-Based Validation** - Not just extension/MIME
5. **Secure File Naming** - Prevents all path manipulation
6. **Input Sanitization** - XSS protection on all text fields
7. **Size Limits** - Prevents DoS attacks
8. **Content Scanning** - Detects embedded malicious code
9. **Verification** - File write is verified before database commit
10. **Error Handling** - Proper cleanup on failures

## Testing Recommendations

To test the security:
1. Try uploading .exe renamed to .pdf
2. Try uploading .exe.pdf (double extension)
3. Try uploading text file with .pdf extension
4. Try uploading file > 5MB
5. Try uploading empty .pdf
6. Try uploading PHP file with PDF header added
7. Try XSS payloads in form fields
8. Try SQL injection in form fields

All should be blocked with appropriate error messages.

## Notes

- Server will restart to apply changes
- Run `npx prisma generate` if Prisma client errors occur
- All uploaded files stored in: `public/uploads/resumes/`
- File format: `{timestamp}-{random}-{sanitized-name}.pdf`

## Admin Features

- View all applications in admin panel
- Update application status
- Download resumes
- Delete applications (with confirmation)
- Responsive table layout
