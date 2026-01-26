import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "@/components/admin/EditProductForm";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) notFound();

    const product = await prisma.product.findUnique({
        where: { id },
        include: { images: true }
    });

    if (!product) notFound();

    const categories = await prisma.category.findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' }
    });

    return <EditProductForm product={product} categories={categories} />;
}
