import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import OrdersTable from "@/components/admin/OrdersTable";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        status: string;
    }
}

export default async function OrdersStatusPage({ params }: PageProps) {
    const statusParam = params.status;

    const statusMap: Record<string, OrderStatus> = {
        pending: 'PENDING',
        processed: 'REVIEWED',
        done: 'COMPLETED',
        canceled: 'CANCELLED'
    };

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
            }
        }
    });

    const orders = rawOrders.map((order) => ({
        ...order,
        totalAmount: order.totalAmount.toNumber(),
        items: order.items.map((item) => ({
            ...item,
            price: item.price.toNumber(),
            product: item.product ? {
                ...item.product,
                price: item.product.price.toNumber(),
                rating: item.product.rating.toNumber()
            } : null
        }))
    }));

    return <OrdersTable orders={orders} />;
}
