'use server'

import { prisma } from '@/lib/prisma'
import * as bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SECRET_KEY } from '@/lib/auth'

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    try {
        // Use raw query to ensure we get the latest schema fields (isActive) even if Prisma Client is stale
        const users: any[] = await prisma.$queryRaw`SELECT * FROM User WHERE email = ${email} LIMIT 1`;
        const user = users[0];
        console.log('DEBUG LOGIN USER (RAW):', user);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return { error: 'Invalid email or password' }
        }

        // MySQL returns 1/0 for booleans in raw queries
        const isActive = user.isActive === 1 || user.isActive === true;
        if (!isActive) {
            return { error: 'Your account has been disabled. Please contact an administrator.' }
        }

        // Removed role restriction so STAFF can also login. 
        // RBAC is handled in middleware and per-route/action.

        // Create session
        const token = await new SignJWT({ userId: user.id, role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(SECRET_KEY)

        cookies().set('admin_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        })

    } catch (error) {
        console.error('Login error:', error)
        return { error: 'Something went wrong. Please try again.' }
    }

    redirect('/prime-panel/dashboard')
}
