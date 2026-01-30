import { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
    title: "Privacy Policy | Prime Containers",
    description: "Read Prime Containers' privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
    return <PrivacyContent />;
}
