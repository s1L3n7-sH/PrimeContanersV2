"use client";

import { format } from "date-fns";
import OrderDetailsDialog from "@/components/admin/OrderDetailsDialog";
import { SerializedOrder } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface OrdersTableProps {
    orders: SerializedOrder[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
    const router = useRouter();
    const [selectedOrder, setSelectedOrder] = useState<SerializedOrder | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        // Poll for new orders every 5 seconds
        const interval = setInterval(() => {
            router.refresh();
        }, 5000);

        return () => clearInterval(interval);
    }, [router]);

    const handleRowClick = (order: SerializedOrder) => {
        setSelectedOrder(order);
        setIsDialogOpen(true);
    };

    return (
        <>
            <div className="border rounded-lg bg-white overflow-hidden shadow-sm overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-medium">Order ID</th>
                            <th className="px-6 py-4 font-medium">Customer</th>
                            <th className="px-6 py-4 font-medium">Contact</th>
                            {/* <th className="px-6 py-4 font-medium hidden md:table-cell">Action</th> */}
                            <th className="px-6 py-4 font-medium hidden md:table-cell">Status</th>
                            <th className="px-6 py-4 font-medium hidden md:table-cell">Date Added</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                                    onClick={() => handleRowClick(order)}
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        #{order.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{order.customerName}</div>
                                        <div className="text-xs text-gray-500 md:hidden">{order.customerEmail}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-600">{order.customerEmail}</div>
                                        <div className="text-gray-500 text-xs">{order.customerPhone}</div>
                                    </td>
                                    {/* Removed Action Cell */}
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'REVIEWED' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {/* Display user-friendly status names */}
                                            {order.status === 'REVIEWED' ? 'PROCESSED' :
                                                order.status === 'COMPLETED' ? 'DONE' : order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-500">
                                        {format(new Date(order.createdAt), "MMM d, yyyy")}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <OrderDetailsDialog
                order={selectedOrder}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </>
    );
}
