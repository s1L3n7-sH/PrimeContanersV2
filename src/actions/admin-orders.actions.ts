'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { verifySessionWithDb } from "@/lib/auth-server";

export async function updateOrderStatus(orderId: number, status: OrderStatus) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('admin_session')?.value;

        if (!token) {
            return { success: false, error: "Not authenticated" };
        }

        const session = await verifySessionWithDb(token);

        if (!session) {
            return { success: false, error: "Invalid session" };
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            select: { assignedToUserId: true }
        });

        if (!order) {
            return { success: false, error: "Order not found" };
        }

        if (order.assignedToUserId !== session.userId) {
            return { success: false, error: "You must be assigned to this order to change its status" };
        }

        await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });

        revalidatePath("/prime-panel/dashboard/orders");
        revalidatePath("/prime-panel/dashboard/sales-pipeline");
        revalidatePath("/prime-panel/dashboard/sales-pipeline/[status]");
        revalidatePath("/prime-panel/dashboard/orders/[status]");

        return { success: true };
    } catch (error) {
        console.error("Failed to update order status:", error);
        throw new Error("Failed to update status");
    }
}

export async function expireLeads() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    try {
        const result = await prisma.order.updateMany({
            where: {
                status: {
                    in: ['NEW_LEAD', 'HOT_LEAD', 'NOT_INTERESTED', 'LEAD'] as any
                },
                createdAt: {
                    lt: sevenDaysAgo
                }
            },
            data: {
                status: 'EXPIRED' as any
            }
        });

        if (result.count > 0) {
            revalidatePath("/prime-panel/dashboard/orders");
            revalidatePath("/prime-panel/dashboard/sales-pipeline");
        }
        return { success: true, count: result.count };
    } catch (error) {
        console.error("Failed to expire leads:", error);
        return { success: false, error };
    }
}


export async function assignOrderToMe(orderId: number) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('admin_session')?.value;

        if (!token) {
            return { success: false, error: "Not authenticated" };
        }

        const session = await verifySessionWithDb(token);

        if (!session) {
            return { success: false, error: "Invalid session" };
        }

        const user = await prisma.user.findUnique({ where: { id: session.userId } });

        if (!user) {
            return { success: false, error: "User not found" };
        }

        await prisma.order.update({
            where: { id: orderId },
            data: {
                assignedToUserId: session.userId
            } as any
        });

        revalidatePath("/prime-panel/dashboard/sales-pipeline/[status]");
        revalidatePath("/prime-panel/dashboard/orders/[status]");
        revalidatePath("/prime-panel/dashboard/sales-pipeline", 'layout');
        revalidatePath("/prime-panel/dashboard/orders", 'layout');

        return { success: true, user: { name: user?.name } };
    } catch (error) {
        console.error("Failed to assign order:", error);
        return { success: false, error: "Failed to assign order" };
    }
}

export async function unassignOrder(orderId: number) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('admin_session')?.value;

        if (!token) {
            return { success: false, error: "Not authenticated" };
        }


        const session = await verifySessionWithDb(token);

        if (!session) {
            return { success: false, error: "Invalid session" };
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            select: { assignedToUserId: true }
        });

        if (!order) {
            return { success: false, error: "Order not found" };
        }

        if (order.assignedToUserId !== session.userId) {
            return { success: false, error: "You can only unassign orders assigned to you" };
        }

        await prisma.order.update({
            where: { id: orderId },
            data: {
                assignedToUserId: null
            } as any
        });


        revalidatePath("/prime-panel/dashboard/sales-pipeline/[status]");
        revalidatePath("/prime-panel/dashboard/orders/[status]");
        revalidatePath("/prime-panel/dashboard/sales-pipeline", 'layout');
        revalidatePath("/prime-panel/dashboard/orders", 'layout');

        return { success: true };
    } catch (error) {
        console.error("Failed to unassign order:", error);
        return { success: false, error: "Failed to unassign order" };
    }
}


export async function createFacebookQuote(data: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerZip: string;
}) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('admin_session')?.value;

        if (!token) {
            return { success: false, error: "Not authenticated" };
        }

        const session = await verifySessionWithDb(token);

        if (!session) {
            return { success: false, error: "Invalid session" };
        }

        const order = await prisma.order.create({
            data: {
                customerName: data.customerName,
                customerEmail: data.customerEmail,
                customerPhone: data.customerPhone,
                customerZip: data.customerZip,
                status: 'NEW_LEAD' as any,
                origin: 'Facebook',
                assignedToUserId: session.userId
            }
        });

        revalidatePath("/prime-panel/dashboard/sales-pipeline/[status]");
        revalidatePath("/prime-panel/dashboard/orders/[status]");
        revalidatePath("/prime-panel/dashboard/sales-pipeline", 'layout');

        return { success: true, orderId: order.id };
    } catch (error) {
        console.error("Failed to create FB quote:", error);
        return { success: false, error: "Failed to create quote" };
    }
}
