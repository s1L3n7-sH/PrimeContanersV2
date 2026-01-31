"use client";

import { format } from "date-fns";
import OrderDetailsDialog from "@/components/admin/OrderDetailsDialog";
import { SerializedOrder } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Trash2, Loader2, Search } from "lucide-react";
import { deleteOrder } from "@/actions/admin-orders.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface OrdersTableProps {
    orders: SerializedOrder[];
    currentUserId: number | null;
    currentUserRole: string | null;
}

export default function OrdersTable({ orders, currentUserId, currentUserRole }: OrdersTableProps) {
    const router = useRouter();
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Search and Sort State
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");

    useEffect(() => {
        const interval = setInterval(() => {
            router.refresh();
        }, 5000);

        return () => clearInterval(interval);
    }, [router]);

    const handleRowClick = (order: SerializedOrder) => {
        setSelectedOrderId(order.id);
        setIsDialogOpen(true);
    };

    const handleDelete = async (e: React.MouseEvent, orderId: number) => {
        e.stopPropagation(); // Prevent row click in case the dialog trigger bubbles

        // This function will be called by AlertDialogAction
        setDeletingId(orderId);
        try {
            const result = await deleteOrder(orderId);
            if (result.success) {
                router.refresh();
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error("Failed to delete order");
        } finally {
            setDeletingId(null);
        }
    };

    // Filter and Sort Logic
    const filteredAndSortedOrders = useMemo(() => {
        let result = [...orders];

        // Filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(order =>
                order.customerName.toLowerCase().includes(query) ||
                order.customerEmail.toLowerCase().includes(query) ||
                order.customerPhone.includes(query) ||
                order.id.toString().includes(query)
            );
        }

        // Sort
        result.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();

            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return result;
    }, [orders, searchQuery, sortOrder]);

    const activeOrder = orders.find(o => o.id === selectedOrderId) || null;

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search orders..."
                        className="pl-9 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-white">
                            <SelectValue placeholder="Sort order" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="border rounded-lg bg-white overflow-hidden shadow-sm overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-medium">Order ID</th>
                            <th className="px-6 py-4 font-medium">Customer</th>
                            <th className="px-6 py-4 font-medium">Contact</th>
                            <th className="px-6 py-4 font-medium">Origin</th>
                            <th className="px-6 py-4 font-medium hidden md:table-cell">Status</th>
                            <th className="px-6 py-4 font-medium hidden md:table-cell">Assigned To</th>
                            <th className="px-6 py-4 font-medium hidden md:table-cell">Date Added</th>
                            {currentUserRole === 'ADMIN' && (
                                <th className="px-6 py-4 font-medium">Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredAndSortedOrders.length === 0 ? (
                            <tr>
                                <td colSpan={currentUserRole === 'ADMIN' ? 8 : 7} className="px-6 py-8 text-center text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            filteredAndSortedOrders.map((order) => (
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
                                    {currentUserRole === 'ADMIN' && (
                                        <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="hover:bg-red-50 hover:border-red-500 hover:text-red-600 h-8 w-8 p-0"
                                                        disabled={deletingId === order.id}
                                                    >
                                                        {deletingId === order.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Order</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete order <strong>#{order.id}</strong>? This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={(e) => handleDelete(e, order.id)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </td>
                                    )}
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
                currentUserRole={currentUserRole}
            />
        </>
    );
}
