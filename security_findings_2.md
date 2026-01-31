# Additional Security Findings: IDOR & Logic Flaws

## 1. "Lead Stealing" Logic Flaw (Lateral Privilege Escalation)
**Severity**: Medium
**Location**: `src/actions/admin-orders.actions.ts` - `assignOrderToMe`

### Description
The `assignOrderToMe` function allows any authenticated admin/staff to assign an order to themselves.
However, it **does not check if the order is already assigned to someone else**.
This allows a malicious or competitive staff member to "steal" leads from colleagues by simply calling the assignment action on orders already claimed by others.

### Proof of Concept (Hypothetical)
1. Staff A assigns Order #123 to themselves.
2. Staff B (malicious) calls `assignOrderToMe(123)`.
3. The system overwrites `assignedToUserId` with Staff B's ID.
4. Staff A loses the lead without warning.

### Recommendation
Modify `assignOrderToMe` to only allow assignment if:
1. The order is currently unassigned (`assignedToUserId` is null).
2. OR the user is an ADMIN (who might need to reassign leads).
3. OR the user is already the assignee (no-op).

```typescript
// Proposed fix logic
if (order.assignedToUserId && order.assignedToUserId !== session.userId && session.role !== 'ADMIN') {
    return { success: false, error: "Order is already assigned to another user." };
}
```

## 2. RCE & Serialization
**Status**: **Safe**
- No usage of `child_process` (exec, spawn), `eval`, or unsafe serialization was found in the codebase.

## 3. Local File Inclusion (LFI)
**Status**: **Fixed**
- The only dynamic file read was in `download-resume`, which is now secured with `path.basename()` and authentication.
