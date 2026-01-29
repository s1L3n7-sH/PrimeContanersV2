'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";
import nodemailer from "nodemailer";


async function sendQuoteEmail(email: string, name: string) {
    console.log(`[EMAIL] Attempting to send quote confirmation email to: ${email}`);

    // Check for missing SMTP credentials
    if (!process.env.SMTP_EMAIL) {
        console.warn("[EMAIL] ❌ SMTP_EMAIL is not set in environment variables. Email not sent.");
        return;
    }
    if (!process.env.SMTP_PASSWORD) {
        console.warn("[EMAIL] ❌ SMTP_PASSWORD is not set in environment variables. Email not sent.");
        return;
    }

    const smtpConfig = {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
    };

    console.log(`[EMAIL] SMTP Config: Host=${smtpConfig.host}, Port=${smtpConfig.port}, Secure=${smtpConfig.secure}`);
    console.log(`[EMAIL] Sending from: ${process.env.SMTP_EMAIL}`);

    const transporter = nodemailer.createTransport({
        ...smtpConfig,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    try {
        console.log(`[EMAIL] Sending email to ${email}...`);
        const info = await transporter.sendMail({
            from: '"Prime Containers" <contact@primecontainers.org>',
            to: email,
            subject: "Quote Request Received - Prime Containers",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
                        <tr>
                            <td style="padding: 40px 20px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                                    
                                    <!-- Header -->
                                    <tr>
                                        <td style="padding: 32px 40px; text-align: center; border-bottom: 1px solid #e5e7eb;">
                                            <img src="http://164.90.134.53/images/chacha.png" alt="Prime Containers" style="max-width: 180px; height: auto;" />
                                        </td>
                                    </tr>
                                    
                                    <!-- Main Content -->
                                    <tr>
                                        <td style="padding: 40px;">
                                            <!-- Title -->
                                            <h1 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 600; color: #1e293b; text-align: center;">
                                                Quote Request Received
                                            </h1>
                                            
                                            <!-- Greeting -->
                                            <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #475569;">
                                                Dear ${name},
                                            </p>
                                            
                                            <!-- Message -->
                                            <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #475569;">
                                                Thank you for reaching out to Prime Containers. We have received your quote request and are excited to assist you with your container needs.
                                            </p>
                                            
                                            <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #475569;">
                                                Our team is reviewing your details and one of our agents will be in touch with you shortly.
                                            </p>
                                            
                                            <!-- Info Box -->
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f1f5f9; border-radius: 8px; margin-bottom: 24px;">
                                                <tr>
                                                    <td style="padding: 24px;">
                                                        <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #1e293b;">
                                                            What's Next?
                                                        </p>
                                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                            <tr>
                                                                <td style="padding: 6px 0; font-size: 15px; color: #475569;">
                                                                    <span style="color: #2563eb; margin-right: 8px;">✓</span> Our team has received your request
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 6px 0; font-size: 15px; color: #475569;">
                                                                    <span style="color: #2563eb; margin-right: 8px;">✓</span> One of our dedicated agents will review your details
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 6px 0; font-size: 15px; color: #475569;">
                                                                    <span style="color: #2563eb; margin-right: 8px;">✓</span> They will contact you shortly via phone or email
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <!-- Contact Info -->
                                            <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #475569;">
                                                If you have any immediate questions, feel free to contact us at <a href="mailto:contact@primecontainers.org" style="color: #2563eb; text-decoration: none;">contact@primecontainers.org</a> or call <a href="tel:+16144918402" style="color: #2563eb; text-decoration: none;">(614) 491-8402</a>.
                                            </p>
                                            
                                            <!-- Signature -->
                                            <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #475569;">
                                                Best regards,<br>
                                                The Prime Containers Team
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="padding: 24px 40px; background-color: #f8fafc; border-top: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
                                            <p style="margin: 0 0 8px 0; font-size: 14px; color: #64748b; text-align: center;">
                                                Prime Containers | Nationwide Container Solutions
                                            </p>
                                            <p style="margin: 0; font-size: 13px; color: #94a3b8; text-align: center;">
                                                © ${new Date().getFullYear()} Prime Containers. All rights reserved.
                                            </p>
                                        </td>
                                    </tr>
                                    
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        });
        console.log(`[EMAIL] ✅ Quote confirmation email sent successfully to ${email}`);
        console.log(`[EMAIL] Message ID: ${info.messageId}`);
    } catch (error: any) {
        console.error(`[EMAIL] ❌ Failed to send quote confirmation email to ${email}`);
        console.error(`[EMAIL] Error name: ${error?.name || 'Unknown'}`);
        console.error(`[EMAIL] Error message: ${error?.message || 'No message'}`);
        console.error(`[EMAIL] Error code: ${error?.code || 'No code'}`);
        if (error?.response) {
            console.error(`[EMAIL] SMTP Response: ${error.response}`);
        }
        if (error?.responseCode) {
            console.error(`[EMAIL] SMTP Response Code: ${error.responseCode}`);
        }
        console.error(`[EMAIL] Full error:`, error);
    }
}

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

        // Send confirmation email (non-blocking)
        sendQuoteEmail(email, name).catch(err => console.error("Email sending failed:", err));

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

        // Send confirmation email (non-blocking)
        sendQuoteEmail(email, name).catch(err => console.error("Email sending failed:", err));

    } catch (error) {
        console.error("Failed to submit general quote:", error);
        throw new Error("Failed to submit quote request");
    }

    revalidatePath("/prime-panel/dashboard/orders");
    return { success: true };
}
