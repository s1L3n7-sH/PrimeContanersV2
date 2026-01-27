
import { prisma } from "@/lib/prisma";

export async function getRentalPlans() {
    const plans = await prisma.rentalPlan.findMany({
        include: {
            prices: true,
        },
    });
    return plans;
}
