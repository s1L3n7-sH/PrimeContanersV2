"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createStaff } from "./actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="bg-[#2c2c9c]">
            {pending ? "Creating..." : "Create Account"}
        </Button>
    );
}

export default function CreateStaffForm({ onSuccess }: { onSuccess: () => void }) {
    const [state, dispatch] = useFormState<{ message?: string; error?: string } | null, FormData>(
        async (prev, formData) => {
            const result = await createStaff(prev, formData);
            if (result.success) {
                onSuccess();
                return { message: "Staff created successfully" };
            }
            return result;
        }, null);

    return (
        <form action={dispatch} className="space-y-4">
            {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

            <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input name="name" className="w-full border rounded-md p-2" required />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input name="email" type="email" className="w-full border rounded-md p-2" required />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input name="password" type="password" className="w-full border rounded-md p-2" required />
            </div>

            <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={onSuccess}>Cancel</Button>
                <SubmitButton />
            </div>
        </form>
    );
}
