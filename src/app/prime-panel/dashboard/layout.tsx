import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { User } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionWithDb } from "@/lib/auth-server";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // We can safely assume cookies exist and are valid here because middleware protects this route.
    // However, robust code re-checks or at least parses types properly.
    const cookie = cookies().get('admin_session');

    // Check session against DB to ensure it hasn't been revoked
    const session = cookie ? await verifySessionWithDb(cookie.value) : null;

    if (!session) {
        // Session is invalid or revoked (e.g. cookie reuse detected).
        // Redirect to logout handler to clear cookies and send to public portal.
        redirect('/api/admin-logout');
    }

    const userRole = (session?.role as string) || "STAFF";
    const userName = (session?.name as string) || "User";

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar userRole={userRole} />
            <div className="pl-0 md:pl-64 transition-all duration-300">
                <AdminHeader userName={userName} userRole={userRole} />
                <main className="p-4 md:p-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
