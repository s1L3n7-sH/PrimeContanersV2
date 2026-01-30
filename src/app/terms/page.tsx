import { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
    title: "Terms of Service | Prime Containers",
    description: "Read Prime Containers' terms of service. Understand the terms and conditions for using our products and services.",
};

export default function TermsPage() {
    return <TermsContent />;
}
