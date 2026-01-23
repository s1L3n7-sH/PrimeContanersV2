"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCareerApplications() {
    try {
        const applications = await prisma.careerApplication.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return applications.map((app) => ({
            ...app,
            createdAt: app.createdAt.toISOString(),
            updatedAt: app.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Error fetching career applications:", error);
        return [];
    }
}

export async function updateApplicationStatus(
    id: number,
    status: "NEW" | "REVIEWED" | "SHORTLISTED" | "REJECTED" | "HIRED"
) {
    try {
        await prisma.careerApplication.update({
            where: { id },
            data: { status },
        });

        revalidatePath("/prime-panel/dashboard/careers");

        return { success: true };
    } catch (error) {
        console.error("Error updating application status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

export async function deleteApplication(id: number) {
    try {
        await prisma.careerApplication.delete({
            where: { id },
        });

        revalidatePath("/prime-panel/dashboard/careers");

        return { success: true };
    } catch (error) {
        console.error("Error deleting application:", error);
        return { success: false, error: "Failed to delete application" };
    }
}
