'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient() as any

export async function getAllCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: 'desc' },
        })
        return { success: true, data: categories }
    } catch (error) {
        console.error('Error fetching categories:', error)
        return { success: false, error: 'Failed to fetch categories' }
    }
}

export async function createCategory(data: { name: string; description?: string }) {
    try {
        const category = await prisma.category.create({
            data: {
                name: data.name,
                description: data.description,
                isActive: true, // Default to active
            },
        })
        revalidatePath('/prime-panel/dashboard/categories')
        return { success: true, data: category }
    } catch (error) {
        console.error('Error creating category:', error)
        return { success: false, error: 'Failed to create category' }
    }
}

export async function updateCategory(id: number, data: { name?: string; description?: string; isActive?: boolean }) {
    try {
        const category = await prisma.category.update({
            where: { id },
            data,
        })
        revalidatePath('/prime-panel/dashboard/categories')
        return { success: true, data: category }
    } catch (error) {
        console.error('Error updating category:', error)
        return { success: false, error: 'Failed to update category' }
    }
}

export async function deleteCategory(id: number) {
    try {
        await prisma.category.delete({
            where: { id },
        })
        revalidatePath('/prime-panel/dashboard/categories')
        return { success: true }
    } catch (error) {
        console.error('Error deleting category:', error)
        return { success: false, error: 'Failed to delete category' }
    }
}

export async function toggleCategoryStatus(id: number, currentStatus: boolean) {
    return updateCategory(id, { isActive: !currentStatus })
}
