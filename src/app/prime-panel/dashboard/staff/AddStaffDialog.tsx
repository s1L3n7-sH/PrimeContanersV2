"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import CreateStaffForm from "./CreateStaffForm";

export default function AddStaffDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#2c2c9c]">
                    <UserPlus className="mr-2 h-4 w-4" /> Add Staff
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Staff Member</DialogTitle>
                    <DialogDescription>
                        Create a new staff account. They will be able to view orders but not manage other users.
                    </DialogDescription>
                </DialogHeader>
                <CreateStaffForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
