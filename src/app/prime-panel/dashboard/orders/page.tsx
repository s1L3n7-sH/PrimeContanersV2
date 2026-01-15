import { redirect } from "next/navigation";

export default function OrdersPage() {
    redirect("/prime-panel/dashboard/orders/pending");
}
