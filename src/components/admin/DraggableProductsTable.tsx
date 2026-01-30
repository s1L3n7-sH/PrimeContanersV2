"use client";

import { useState, useEffect } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Package, Check, Loader2 } from "lucide-react";
import ProductActions from "./ProductActions";
import { updateProductOrder } from "@/actions/product.actions";

type ProductWithImages = {
    id: number;
    title: string;
    length: string | null;
    inStock: boolean;
    createdAt: Date;
    displayOrder: number;
    images: { id: number; url: string }[];
};

interface DraggableProductsTableProps {
    initialProducts: ProductWithImages[];
}

function SortableRow({ product }: { product: ProductWithImages }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: product.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isDragging ? "#f0f9ff" : undefined,
    };

    return (
        <tr
            ref={setNodeRef}
            style={style}
            className={`hover:bg-gray-50 transition-colors group ${!product.inStock ? 'bg-gray-50/50' : ''} ${isDragging ? 'shadow-lg z-50 relative' : ''}`}
        >
            <td className="px-3 py-4 w-8">
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Drag to reorder"
                >
                    <GripVertical className="h-5 w-5" />
                </button>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden relative flex-shrink-0">
                        {product.images && product.images[0] ? (
                            <img
                                src={product.images[0].url}
                                alt={product.title}
                                className={`w-full h-full object-cover ${!product.inStock ? 'opacity-50' : ''}`}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Package className="h-5 w-5 text-gray-400" />
                            </div>
                        )}
                    </div>
                    <div className={`font-medium text-gray-900 ${!product.inStock ? 'text-gray-500' : ''}`}>
                        {product.title}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-gray-600">{product.length || '-'}</td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {product.inStock ? 'In Stock' : 'Unavailable'}
                </span>
            </td>
            <td className="px-6 py-4 text-gray-500">
                {new Date(product.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 text-right">
                <ProductActions productId={product.id} initialInStock={product.inStock} />
            </td>
        </tr>
    );
}

export default function DraggableProductsTable({ initialProducts }: DraggableProductsTableProps) {
    const [products, setProducts] = useState<ProductWithImages[]>(initialProducts);
    const [isSaving, setIsSaving] = useState(false);
    const [showSaved, setShowSaved] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Update products when initialProducts changes (e.g., after server revalidation)
    useEffect(() => {
        setProducts(initialProducts);
    }, [initialProducts]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = products.findIndex((p) => p.id === active.id);
            const newIndex = products.findIndex((p) => p.id === over.id);

            const newProducts = arrayMove(products, oldIndex, newIndex);
            setProducts(newProducts);
            setHasChanges(true);

            // Auto-save the new order
            setIsSaving(true);
            try {
                await updateProductOrder(newProducts.map((p) => p.id));
                setShowSaved(true);
                setTimeout(() => setShowSaved(false), 2000);
                setHasChanges(false);
            } catch (error) {
                console.error("Failed to save order:", error);
                // Revert on error
                setProducts(initialProducts);
            } finally {
                setIsSaving(false);
            }
        }
    };

    return (
        <div className="relative">
            {/* Status indicator */}
            <div className="absolute -top-12 right-0 flex items-center gap-2">
                {isSaving && (
                    <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Saving order...</span>
                    </div>
                )}
                {showSaved && !isSaving && (
                    <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full animate-pulse">
                        <Check className="h-4 w-4" />
                        <span>Order saved!</span>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-3 py-4 w-8">
                                    <span className="sr-only">Drag Handle</span>
                                </th>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Length</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date Added</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <SortableContext
                                items={products.map((p) => p.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {products.map((product) => (
                                    <SortableRow key={product.id} product={product} />
                                ))}
                            </SortableContext>
                        </tbody>
                    </table>
                </DndContext>
            </div>

            {/* Help text */}
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <GripVertical className="h-4 w-4" />
                <span>Drag products to reorder. Changes are saved automatically.</span>
            </div>
        </div>
    );
}
