# Implementation Plan - Security Fixes (Batch 2)

## Goal
Fix the remaining logical IDOR vulnerability ("Lead Stealing") identified in the security audit.

## User Review Required
> [!NOTE]
> This change modifies business logic. Staff members will no longer be able to re-assign orders that are already claimed by others. Only Admins can override assignments.

## Proposed Changes

### [src/actions]

#### [MODIFY] [admin-orders.actions.ts](file:///c:/Projects/PrimeContanersV2/src/actions/admin-orders.actions.ts)
- Update `assignOrderToMe` to check `order.assignedToUserId`.
- Prevent assignment if `assignedToUserId` is set AND `assignedToUserId !== currentUserId` AND `currentUserRole !== 'ADMIN'`.

## Verification Plan

### Manual Verification
1.  **Test Environment**: Requires 2 users (Staff A, Staff B) and 1 Admin.
2.  **Scenario 1 (Staff vs Staff)**:
    - Staff A assigns Order X to self.
    - Staff B tries to assign Order X to self.
    - **Expectation**: Staff B fails with "Order is already assigned".
3.  **Scenario 2 (Admin Override)**:
    - Staff A assigns Order Y to self.
    - Admin tries to assign Order Y to self (or unassign).
    - **Expectation**: Success.
