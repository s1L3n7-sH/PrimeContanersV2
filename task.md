# Security Audit & Fix Plan

## Goal
Perform a targeted security audit for Remote Code Execution (RCE), Local File Inclusion (LFI), and Insecure Direct Object References (IDOR), and fix identified issues.

## Checklist
- [ ] **Scan for RCE**
    - [ ] Search for `child_process` (exec, spawn, fork).
    - [ ] Search for `eval`, `new Function`, `setTimeout(string)`.
    - [ ] Review serialization usage.
- [ ] **Scan for IDOR**
    - [ ] Review `assignOrderToMe` in `src/actions/admin-orders.actions.ts` (Lead Stealing risk).
    - [ ] Review `createFacebookQuote` (Can I create quotes for others? - Limit risk).
    - [ ] Check if Staff can view/edit Admins or other protected resources.
- [ ] **Scan for LFI**
    - [ ] Review all `fs` module usages (already fixed `download-resume`).
    - [ ] Check for other dynamic file paths.
- [ ] **Report & Fix**
    - [ ] Update `vulnerabilities.md` with new findings.
    - [ ] Create implementation plan for fixes.
    - [ ] Apply fixes.
