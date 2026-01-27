
import { prisma } from "@/lib/prisma";
import RentalManager from "./RentalManager";

export const dynamic = 'force-dynamic';

export default async function AdminRentalsPage() {
    const plans = await prisma.rentalPlan.findMany({
        include: {
            prices: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Rental Plans</h1>
                <p className="text-gray-500">Manage the pricing and terms for container rentals</p>
            </div>

            <RentalManager initialPlans={plans} />
        </div>
    );
}
