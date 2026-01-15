import { cookies } from "next/headers";
import { verifySessionWithDb } from "@/lib/auth-server";

export default async function DashboardPage() {
    const cookie = cookies().get('admin_session');
    const session = cookie ? await verifySessionWithDb(cookie.value) : null;
    const userName = (session?.name as string) || "Admin";

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h1 className="text-2xl font-bold mb-4">Welcome back, {userName}</h1>
            <p className="text-gray-500">
                Select an option from the sidebar to manage your store.
            </p>
        </div>
    );
}
