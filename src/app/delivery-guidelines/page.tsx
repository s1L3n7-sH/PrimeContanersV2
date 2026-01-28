import { Metadata } from "next";
import DeliveryGuidelinesContent from "./DeliveryGuidelinesContent";

export const metadata: Metadata = {
    title: "Delivery Guidelines | Prime Containers",
    description: "Learn about our shipping container delivery requirements and how to prepare the delivery site for your shipping container. Understand clearance requirements, site preparation, and delivery methods.",
};

export default function DeliveryGuidelinesPage() {
    return <DeliveryGuidelinesContent />;
}
