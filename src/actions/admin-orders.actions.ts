'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: number, status: 'PENDING' | 'REVIEWED' | 'COMPLETED' | 'CANCELLED') {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });

        revalidatePath("/prime-panel/dashboard/orders");
        return { success: true };
    } catch (error) {
        console.error("Failed to update order status:", error);
        throw new Error("Failed to update status");
    }
}
