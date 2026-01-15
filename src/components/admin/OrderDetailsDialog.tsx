"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { Order, OrderItem, Product, ProductImage } from "@prisma/client";
import { SerializedOrder } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import { updateOrderStatus } from "@/actions/admin-orders.actions";
import { useRouter } from "next/navigation";

interface OrderDetailsDialogProps {
    order: SerializedOrder | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function OrderDetailsDialog({ order, open, onOpenChange }: OrderDetailsDialogProps) {
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();

    if (!order) return null;

    const handleStatusChange = async (newStatus: string) => {
        setIsUpdating(true);
        try {
            await updateOrderStatus(order.id, newStatus as any);
            router.refresh(); // Refresh to show updated data if needed (though Dialog content might not auto-refresh strictly without state, but revalidatePath does the heavy lift)
        } catch (error) {
            console.error("Failed to update status");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl bg-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-[#2c2c9c]">Order #{order.id} Details</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Customer Information */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            Customer Information
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="grid grid-cols-3 gap-2">
                                <span className="text-gray-500">Name:</span>
                                <span className="col-span-2 font-medium text-gray-900">{order.customerName}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="text-gray-500">Email:</span>
                                <span className="col-span-2 font-medium text-gray-900 break-all">{order.customerEmail}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="text-gray-500">Phone:</span>
                                <span className="col-span-2 font-medium text-gray-900">{order.customerPhone}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="text-gray-500">Zip:</span>
                                <span className="col-span-2 font-medium text-gray-900">{order.customerZip}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Status Management */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-3">Manage Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Current Status:</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                    order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                        order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Select
                                    disabled={isUpdating}
                                    onValueChange={handleStatusChange}
                                    defaultValue={order.status}
                                >
                                    <SelectTrigger className="w-[180px] bg-white">
                                        <SelectValue placeholder="Change Status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="REVIEWED">Processed</SelectItem>
                                        <SelectItem value="COMPLETED">Done</SelectItem>
                                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                                {isUpdating && <Loader2 className="w-4 h-4 animate-spin text-[#2c2c9c]" />}
                            </div>

                            <div className="text-xs text-gray-400 mt-2">
                                Submitted: {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items Table */}
                <div className="mt-6 border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b font-medium text-sm text-gray-700">
                        Ordered Items
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-white border-b text-xs text-gray-500 uppercase sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 text-left w-[80px]">Image</th>
                                    <th className="px-4 py-3 text-left">Product</th>
                                    <th className="px-4 py-3 text-left">Attributes</th>
                                    <th className="px-4 py-3 text-center">Qty</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {order.items.map((item, idx) => {
                                    // Resolve image URL: try item.product relations first
                                    const productImages = item.product?.images || [];
                                    // Use the first image if available, otherwise fallback
                                    const mainImage = productImages.length > 0 ? productImages[0].url : '/placeholder.png'; // You might want a real placeholder

                                    return (
                                        <tr key={idx} className="bg-white hover:bg-gray-50/50">
                                            <td className="px-4 py-3">
                                                <div className="relative w-12 h-12 rounded-md overflow-hidden border border-gray-200 bg-gray-100">
                                                    {mainImage && (
                                                        <Image
                                                            src={mainImage}
                                                            alt={item.productTitle}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                {item.productTitle}
                                                {item.product && (
                                                    <div className="text-[10px] text-gray-400">ID: {item.product.id}</div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {Array.isArray(item.attributes)
                                                    ? item.attributes.join(", ")
                                                    : JSON.stringify(item.attributes).replace(/[\[\]"]/g, '').replace(/,/g, ', ')
                                                }
                                            </td>
                                            <td className="px-4 py-3 text-center text-gray-900 font-medium">
                                                {item.quantity}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}
