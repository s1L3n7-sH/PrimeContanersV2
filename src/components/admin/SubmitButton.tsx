"use client";

import { Save } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
    text?: string;
    loadingText?: string;
    className?: string;
}

export function SubmitButton({
    text = "Save",
    loadingText = "Saving...",
    className
}: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={cn(
                "flex items-center gap-2 bg-[#2c2c9c] text-white px-6 py-2.5 rounded-lg hover:bg-[#1a1a7a] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
                className
            )}
        >
            <Save className="h-4 w-4" />
            {pending ? loadingText : text}
        </button>
    );
}
