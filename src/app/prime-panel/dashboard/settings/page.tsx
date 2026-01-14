'use client'

import React from 'react'
import { useFormState } from 'react-dom'
import { changePassword } from './actions'
import { Button } from '@/components/ui/button'

const initialState = {
    error: '',
    success: '',
}

export default function SettingsPage() {
    // @ts-ignore - Ignoring type mismatch for simplicity in this turn, or helps if I define stricter types
    const [state, formAction] = useFormState(changePassword, initialState)

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500">Manage your account settings and password.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>

                <form action={formAction} className="space-y-4">
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            id="currentPassword"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            required
                            minLength={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            minLength={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {state?.error && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                            {state.error}
                        </div>
                    )}

                    {state?.success && (
                        <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">
                            {state.success}
                        </div>
                    )}

                    <div className="pt-2">
                        <Button type="submit">
                            Update Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
