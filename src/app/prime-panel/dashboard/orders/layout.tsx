import OrdersTabs from "@/components/admin/OrdersTabs";

export default function OrdersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Orders & Quotes</h1>
                    <p className="text-muted-foreground">Manage customer quote requests and orders.</p>
                </div>
            </div>

            <OrdersTabs />

            {children}
        </div>
    );
}
