export type SessionPayload = {
    userId: number
    role: 'ADMIN' | 'STAFF'
}

export const ADMIN_ONLY_ROUTES = [
    '/prime-panel/dashboard/staff',
    '/prime-panel/dashboard/products',
    '/prime-panel/dashboard/customers'
]

export const PUBLIC_ROUTES = [
    '/prime-panel/login'
]
