'use server'

import { prisma } from '@/lib/prisma'
import { verifySessionWithDb } from '@/lib/auth-server'
import { cookies } from 'next/headers'
import * as bcrypt from 'bcryptjs'

export async function changePassword(prevState: any, formData: FormData) {
    const currentPassword = formData.get('currentPassword') as string
    const newPassword = formData.get('newPassword') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (!currentPassword || !newPassword || !confirmPassword) {
        return { error: 'All fields are required' }
    }

    if (newPassword !== confirmPassword) {
        return { error: 'New passwords do not match' }
    }

    if (newPassword.length < 6) {
        return { error: 'Password must be at least 6 characters long' }
    }

    const cookie = cookies().get('admin_session')
    if (!cookie) {
        return { error: 'Unauthorized' }
    }

    const session = await verifySessionWithDb(cookie.value)
    if (!session) {
        return { error: 'Unauthorized' }
    }

    try {
        // Use raw query to avoid issues with stale Prisma Client
        const users = await prisma.$queryRaw`SELECT id, password FROM User WHERE id = ${session.userId} LIMIT 1` as any[];
        const user = users[0];

        if (!user) {
            return { error: 'User not found' }
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return { error: 'Current password is incorrect' }
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        // Use raw query for update as well
        await prisma.$executeRaw`UPDATE User SET password = ${hashedPassword} WHERE id = ${session.userId}`

        return { success: 'Password updated successfully' }
    } catch (error) {
        console.error('Change password error:', error)
        return { error: 'Something went wrong. Please try again.' }
    }
}
