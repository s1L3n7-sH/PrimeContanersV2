import React from "react";
import Sidebar from "@/components/admin/Sidebar";
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
            <div className="pl-64">
                <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-40">
                    <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
                            <div className="h-8 w-8 rounded-full bg-[#2c2c9c]/10 flex items-center justify-center text-[#2c2c9c]">
                                <User className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 hidden md:block">
                                {userName}
                            </span>
                        </div>
                    </div>
                </header>
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
