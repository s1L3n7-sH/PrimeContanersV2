"use client";

import { format } from "date-fns";
import OrderDetailsDialog from "@/components/admin/OrderDetailsDialog";
import { SerializedOrder } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface OrdersTableProps {
    orders: SerializedOrder[];
    currentUserId: number | null;
}

export default function OrdersTable({ orders, currentUserId }: OrdersTableProps) {
    const router = useRouter();
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        // Poll for new orders every 5 seconds
        const interval = setInterval(() => {
            router.refresh();
        }, 5000);

        return () => clearInterval(interval);
    }, [router]);

    const handleRowClick = (order: SerializedOrder) => {
        setSelectedOrderId(order.id);
        setIsDialogOpen(true);
    };

    const activeOrder = orders.find(o => o.id === selectedOrderId) || null;

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
                            <th className="px-6 py-4 font-medium">Origin</th>
                            <th className="px-6 py-4 font-medium hidden md:table-cell">Status</th>
                            <th className="px-6 py-4 font-medium hidden md:table-cell">Assigned To</th>
                            <th className="px-6 py-4 font-medium hidden md:table-cell">Date Added</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
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
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${(order as any).origin === 'Facebook' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {(order as any).origin || 'Web'}
                                        </span>
                                    </td>
                                    {/* Removed Action Cell */}
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'REVIEWED' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                        (order.status as string) === 'NEW_LEAD' ? 'bg-indigo-100 text-indigo-800' :
                                                            (order.status as string) === 'HOT_LEAD' ? 'bg-orange-100 text-orange-800' :
                                                                (order.status as string) === 'NOT_INTERESTED' ? 'bg-gray-100 text-gray-800' :
                                                                    (order.status as string) === 'EXPIRED' ? 'bg-slate-100 text-slate-800' :
                                                                        (order.status as string) === 'PAID' ? 'bg-green-100 text-green-800' :
                                                                            order.status === 'LEAD' ? 'bg-indigo-100 text-indigo-800' :
                                                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {/* Display user-friendly status names */}
                                            {(order.status as string) === 'REVIEWED' ? 'PROCESSED' :
                                                (order.status as string) === 'COMPLETED' ? 'DONE' :
                                                    (order.status as string) === 'NEW_LEAD' ? 'NEW LEAD' :
                                                        (order.status as string) === 'HOT_LEAD' ? 'HOT LEAD' :
                                                            (order.status as string) === 'NOT_INTERESTED' ? 'NOT INTERESTED' :
                                                                (order.status as string) === 'EXPIRED' ? 'EXPIRED' :
                                                                    (order.status as string) === 'PAID' ? 'PAID' :
                                                                        (order.status as string) === 'LEAD' ? 'LEAD' : order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        {order.assignedToName ? (
                                            <span className="text-gray-900 font-medium text-xs bg-gray-100 px-2 py-1 rounded">
                                                {order.assignedToName}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">Unassigned</span>
                                        )}
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
                order={activeOrder}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                currentUserId={currentUserId}
            />
        </>
    );
}
