"use client";

import { toggleStaffStatus, deleteStaff } from "./actions";
import { Power, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function StaffListActions({ user }: { user: any }) {
    return (
        <div className="flex items-center justify-end gap-2">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={
                            user.isActive
                                ? "text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                : "text-green-600 hover:text-green-700 hover:bg-green-50"
                        }
                        title={user.isActive ? "Disable Account" : "Enable Account"}
                    >
                        <Power className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Change User Status?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to {user.isActive ? "disable" : "enable"}{" "}
                            <span className="font-semibold">{user.email}</span>?
                            {user.isActive && " They will immediately lose access to the panel."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className={user.isActive ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"}
                            onClick={async () => {
                                await toggleStaffStatus(user.id, user.isActive);
                            }}
                        >
                            {user.isActive ? "Disable" : "Enable"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Delete Account"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the account for{" "}
                            <span className="font-semibold">{user.email}</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={async () => {
                                await deleteStaff(user.id);
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
