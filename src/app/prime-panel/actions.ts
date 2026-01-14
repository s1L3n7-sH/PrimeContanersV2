'use server'

import { verifySession, SessionPayload } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
    const cookie = cookies().get('admin_session')

    if (cookie) {
        try {
            const session = await verifySession(cookie.value) as SessionPayload | null

            if (session?.userId) {
                // Invalidate all tokens for this user by incrementing the version
                // Using raw query to avoid TS errors if client generation is stale
                await prisma.$executeRaw`UPDATE User SET tokenVersion = tokenVersion + 1 WHERE id = ${session.userId}`
            }
        } catch (error) {
            console.error('Logout error:', error)
        }

        cookies().delete('admin_session')
    }

    redirect('/prime-panel/login')
}
