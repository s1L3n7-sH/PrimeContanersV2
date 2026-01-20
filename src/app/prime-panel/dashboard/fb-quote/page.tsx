'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createFacebookQuote } from '@/actions/admin-orders.actions';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function FBQuotePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setStatus({ type: null, message: '' });

        const data = {
            customerName: formData.get('customerName') as string,
            customerEmail: formData.get('customerEmail') as string,
            customerPhone: formData.get('customerPhone') as string,
            customerZip: formData.get('customerZip') as string,
        };

        const result = await createFacebookQuote(data);

        if (result.success) {
            setStatus({ type: 'success', message: 'FB Quote created successfully!' });
            const form = document.getElementById('fb-quote-form') as HTMLFormElement;
            if (form) form.reset();
        } else {
            setStatus({ type: 'error', message: result.error as string || 'Failed to create quote' });
        }
        setIsLoading(false);
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-[#2c2c9c] mb-6">Create FB Quote</h1>

            {status.type === 'success' && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Success:</span> {status.message}
                </div>
            )}

            {status.type === 'error' && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-md flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Error:</span> {status.message}
                </div>
            )}

            <form id="fb-quote-form" action={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border shadow-sm">
                <div className="space-y-2">
                    <label htmlFor="customerName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700">Full Name</label>
                    <input
                        id="customerName"
                        name="customerName"
                        required
                        placeholder="Full Name"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="customerEmail" className="text-sm font-medium leading-none text-gray-700">Email Address</label>
                        <input
                            id="customerEmail"
                            name="customerEmail"
                            type="email"
                            required
                            placeholder="Email Address"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="customerPhone" className="text-sm font-medium leading-none text-gray-700">Phone Number</label>
                        <input
                            id="customerPhone"
                            name="customerPhone"
                            type="tel"
                            required
                            placeholder="(555) 123-4567"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="customerZip" className="text-sm font-medium leading-none text-gray-700">Zip Code</label>
                    <input
                        id="customerZip"
                        name="customerZip"
                        required
                        placeholder="12345"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <Button type="submit" className="w-full bg-[#2c2c9c] hover:bg-[#1a1a7a]" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Quote...
                        </>
                    ) : (
                        'Create Quote'
                    )}
                </Button>
            </form>
        </div>
    );
}
