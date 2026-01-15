import { Order, OrderItem, Product, ProductImage } from "@prisma/client";

export type SerializedProduct = Omit<Product, 'price' | 'rating'> & {
    price: number;
    rating: number;
    images: ProductImage[];
};

export type SerializedOrderItem = Omit<OrderItem, 'price'> & {
    price: number;
    attributes: string[] | any;
    product: SerializedProduct | null;
};

export type SerializedOrder = Omit<Order, 'totalAmount'> & {
    totalAmount: number;
    items: SerializedOrderItem[];
};
