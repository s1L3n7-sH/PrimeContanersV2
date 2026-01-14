"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { login } from "./actions";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className="w-full bg-[#2c2c9c] hover:bg-[#2c2c9c]/90 text-white font-semibold h-10 transition-all duration-300 shadow-md hover:shadow-lg"
            disabled={pending}
        >
            {pending ? (
                <span className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Authenticating...
                </span>
            ) : (
                "Sign in to Dashboard"
            )}
        </Button>
    );
}

export default function AdminLoginPage() {
    const [state, dispatch] = useFormState(login, null);
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-white/50 backdrop-blur-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Admin Panel
                    </h1>
                    <p className="text-sm text-gray-500">
                        Welcome back. Please login to your account.
                    </p>
                </div>

                <form action={dispatch} className="space-y-6">
                    {state?.error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md text-center">
                            {state.error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700">
                                Email Reference
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="admin@prime.com"
                                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 pl-9 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c2c9c] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-[#2c2c9c]/50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 pl-9 pr-10 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c2c9c] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-[#2c2c9c]/50"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <SubmitButton />

                    <p className="px-8 text-center text-xs text-gray-400">
                        By clicking continue, you agree to our{" "}
                        <a
                            href="#"
                            className="underline underline-offset-4 hover:text-[#2c2c9c]"
                        >
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                            href="#"
                            className="underline underline-offset-4 hover:text-[#2c2c9c]"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </form>
            </div>
        </div>
    );
}
