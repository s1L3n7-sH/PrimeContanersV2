import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from './lib/auth'
import { ADMIN_ONLY_ROUTES } from './lib/rbac-config'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isLoginRoute = path === '/prime-panel/login'
    const isDashboardRoute = path.startsWith('/prime-panel')

    // 1. Handle Admin Panel Routes
    if (isDashboardRoute && !isLoginRoute) {
        const cookie = request.cookies.get('admin_session')
        const session = cookie ? await verifySession(cookie.value) : null

        // Authentication Check
        if (!session) {
            const response = NextResponse.redirect(new URL('/prime-panel/login', request.url))
            // Clear cookie just in case
            response.cookies.delete('admin_session')
            return response
        }

        // Role-Based Access Control (RBAC)
        // "Staff... Can ONLY view orders"
        // Block staff from accessing any route in ADMIN_ONLY_ROUTES
        if (session.role !== 'ADMIN') {
            const isRestricted = ADMIN_ONLY_ROUTES.some(route => path.startsWith(route))
            if (isRestricted) {
                // Redirect staff to orders or show unauthorized
                // For better UX, redirect to orders if they try to access a forbidden page
                return NextResponse.redirect(new URL('/prime-panel/dashboard/orders', request.url))
            }
        }
    }

    // 2. Redirect authenticated users away from login page
    if (isLoginRoute) {
        const cookie = request.cookies.get('admin_session')
        const session = cookie ? await verifySession(cookie.value) : null

        if (session) {
            // Redirect based on role if needed, or just to dashboard home
            return NextResponse.redirect(new URL('/prime-panel/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/prime-panel/:path*',
    ],
}
