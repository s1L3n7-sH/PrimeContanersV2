import SalesPipelineTabs from "@/components/admin/SalesPipelineTabs";

export default function SalesPipelineLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Sales Pipeline</h1>
                    <p className="text-muted-foreground">Manage leads and expired quotes.</p>
                </div>
            </div>

            <SalesPipelineTabs />

            {children}
        </div>
    );
}
