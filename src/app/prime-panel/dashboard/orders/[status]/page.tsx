import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import OrdersTable from "@/components/admin/OrdersTable";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { verifySessionWithDb } from "@/lib/auth-server";
import { expireLeads } from "@/actions/admin-orders.actions";

interface PageProps {
    params: {
        status: string;
    }
}

export default async function OrdersStatusPage({ params }: PageProps) {
    if (params.status && ['leads', 'hot-leads', 'not-interested'].includes(params.status)) {
        await expireLeads();
    }

    const cookieStore = cookies();
    const token = cookieStore.get('admin_session')?.value;
    let currentUserId: number | null = null;
    let currentUserRole: string | null = null;

    if (token) {
        const session = await verifySessionWithDb(token);
        if (session) {
            currentUserId = session.userId;
            currentUserRole = session.role;
        }
    }

    const statusParam = params.status;

    const statusMap: Record<string, OrderStatus> = {
        leads: 'LEAD' as OrderStatus,
        'hot-leads': 'HOT_LEAD' as OrderStatus,
        'not-interested': 'NOT_INTERESTED' as OrderStatus,
        'paid': 'PAID' as any,
        pending: 'PENDING',
        processed: 'REVIEWED',
        done: 'COMPLETED',
        canceled: 'CANCELLED',
        expired: 'EXPIRED'
    };

    if (statusParam === 'leads') {
        const rawOrders = await prisma.order.findMany({
            where: {
                status: {
                    in: ['NEW_LEAD', 'LEAD']
                }
            },
            orderBy: { createdAt: 'desc' },
            include: {
                items: { include: { product: { include: { images: true } } } },
                assignedTo: true
            }
        });
        const orders = rawOrders.map((order) => {
            const orderAny = order as any;
            return {
                ...order,
                totalAmount: order.totalAmount.toNumber(),
                assignedToUserId: orderAny.assignedToUserId,
                assignedToName: orderAny.assignedTo?.name || null,
                items: orderAny.items.map((item: any) => ({
                    ...item,
                    price: item.price.toNumber(),
                    product: item.product ? {
                        ...item.product,
                        price: item.product.price.toNumber(),
                        rating: item.product.rating.toNumber()
                    } : null
                }))
            };
        });
        return <OrdersTable orders={orders} currentUserId={currentUserId} currentUserRole={currentUserRole} />;
    }

    const status = statusMap[statusParam];

    if (!status) {
        return (
            <div className="p-8 text-center text-gray-500">
                Invalid status directory.
            </div>
        );
    }

    const rawOrders = await prisma.order.findMany({
        where: { status },
        orderBy: { createdAt: 'desc' },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            images: true
                        }
                    }
                }
            },
            assignedTo: true
        }
    });

    const orders = rawOrders.map((order) => {
        const orderAny = order as any;
        return {
            ...order,
            totalAmount: order.totalAmount.toNumber(),
            assignedToUserId: orderAny.assignedToUserId,
            assignedToName: orderAny.assignedTo?.name || null,
            items: orderAny.items.map((item: any) => ({
                ...item,
                price: item.price.toNumber(),
                product: item.product ? {
                    ...item.product,
                    price: item.product.price.toNumber(),
                    rating: item.product.rating.toNumber()
                } : null
            }))
        };
    });





    return <OrdersTable orders={orders} currentUserId={currentUserId} currentUserRole={currentUserRole} />;
}
