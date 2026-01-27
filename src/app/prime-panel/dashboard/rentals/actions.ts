'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateRentalPlan(id: number, type: string, prices: { term: string; price: string }[]) {
    try {
        await prisma.$transaction([
            // Delete old prices
            prisma.rentalPrice.deleteMany({
                where: { rentalPlanId: id }
            }),
            // Update plan type and create new prices
            prisma.rentalPlan.update({
                where: { id },
                data: {
                    type,
                    prices: {
                        create: prices
                    }
                }
            })
        ]);
        revalidatePath('/prime-panel/dashboard/rentals');
        revalidatePath('/rental');
        return { success: true };
    } catch (error) {
        console.error('Failed to update rental plan:', error);
        return { success: false, error: 'Failed to update rental plan' };
    }
}

export async function createRentalPlan(category: 'RENT_TO_OWN' | 'SHORT_TERM', type: string, prices: { term: string; price: string }[]) {
    try {
        await prisma.rentalPlan.create({
            data: {
                category,
                type,
                prices: {
                    create: prices
                }
            }
        });
        revalidatePath('/prime-panel/dashboard/rentals');
        revalidatePath('/rental');
        return { success: true };
    } catch (error) {
        console.error('Failed to create rental plan:', error);
        return { success: false, error: 'Failed to create rental plan' };
    }
}

export async function deleteRentalPlan(id: number) {
    try {
        await prisma.rentalPlan.delete({
            where: { id }
        });
        revalidatePath('/prime-panel/dashboard/rentals');
        revalidatePath('/rental');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete rental plan:', error);
        return { success: false, error: 'Failed to delete rental plan' };
    }
}
