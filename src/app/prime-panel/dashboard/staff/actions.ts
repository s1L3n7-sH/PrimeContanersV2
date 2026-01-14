'use server'

import { prisma } from '@/lib/prisma'
import { verifySessionWithDb } from '@/lib/auth-server'
import { cookies } from 'next/headers'
import * as bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
    const cookie = cookies().get('admin_session')
    const session = cookie ? await verifySessionWithDb(cookie.value) : null

    if (!session || session.role !== 'ADMIN') {
        throw new Error('Unauthorized: Admin access required')
    }
}

export async function createStaff(prevState: any, formData: FormData) {
    await requireAdmin()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!name || !email || !password) {
        return { error: 'All fields are required' }
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        // Using raw execute to bypass stale Prisma Client definition
        await prisma.$executeRaw`
            INSERT INTO User (email, name, password, role, isActive, createdAt, updatedAt) 
            VALUES (${email}, ${name}, ${hashedPassword}, 'STAFF', true, NOW(), NOW())
        `;

        revalidatePath('/prime-panel/dashboard/staff')
        return { success: true }
    } catch (e: any) {
        console.error(e)
        // Check for unique constraint violation (MySQL code 1062)
        if (e.message?.includes('Unique constraint') || e.code === 'P2010') {
            return { error: 'Email already exists' }
        }
        return { error: 'Failed to create staff account: ' + e.message }
    }
}

export async function toggleStaffStatus(userId: number, currentStatus: boolean) {
    try {
        await requireAdmin()

        const newStatus = !currentStatus;
        await prisma.$executeRaw`UPDATE User SET isActive = ${newStatus} WHERE id = ${userId}`;

        revalidatePath('/prime-panel/dashboard/staff')
        return { success: true }
    } catch (e) {
        console.error(e);
        return { error: 'Unauthorized or failed operation' }
    }
}

export async function deleteStaff(userId: number) {
    try {
        await requireAdmin()

        await prisma.$executeRaw`DELETE FROM User WHERE id = ${userId}`;

        revalidatePath('/prime-panel/dashboard/staff')
        return { success: true }
    } catch (e) {
        return { error: 'Unauthorized or failed operation' }
    }
}
