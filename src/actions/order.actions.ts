'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    attributes: string[];
}

export async function submitQuoteRequest(formData: FormData, cartItemsJson: string) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const zip = formData.get("zip") as string;

    if (!name || !email || !phone || !zip) {
        throw new Error("All fields are required");
    }

    let cartItems: CartItem[] = [];
    try {
        cartItems = JSON.parse(cartItemsJson);
    } catch (e) {
        throw new Error("Invalid cart data");
    }

    if (cartItems.length === 0) {
        throw new Error("Cart is empty");
    }

    // Calculate total purely for record keeping (though quotes might be custom priced later)
    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    try {
        await prisma.order.create({
            data: {
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                customerZip: zip,
                totalAmount: totalAmount,
                status: 'NEW_LEAD' as any,
                items: {
                    create: cartItems.map(item => ({
                        productId: item.id,
                        productTitle: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        attributes: item.attributes // Stored as JSON
                    }))
                }
            }
        });
    } catch (error) {
        console.error("Failed to submit quote:", error);
        throw new Error("Failed to submit quote request");
    }

    revalidatePath("/prime-panel/dashboard/orders");
    return { success: true };
}

export async function submitGeneralQuote(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const zip = formData.get("zip") as string;

    if (!name || !email || !phone || !zip) {
        throw new Error("All fields are required");
    }

    try {
        await prisma.order.create({
            data: {
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                customerZip: zip,
                totalAmount: 0,
                status: 'NEW_LEAD' as any, // Explicitly set as LEAD
            }
        });
    } catch (error) {
        console.error("Failed to submit general quote:", error);
        throw new Error("Failed to submit quote request");
    }

    revalidatePath("/prime-panel/dashboard/orders");
    return { success: true };
}
