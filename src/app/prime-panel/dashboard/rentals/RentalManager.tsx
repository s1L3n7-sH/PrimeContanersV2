"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit2, Save, X, Calendar } from "lucide-react";
import { updateRentalPlan, createRentalPlan, deleteRentalPlan } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RentalPrice {
    id?: number;
    term: string;
    price: string;
}

interface RentalPlan {
    id: number;
    type: string;
    category: "RENT_TO_OWN" | "SHORT_TERM";
    prices: RentalPrice[];
}

export default function RentalManager({ initialPlans }: { initialPlans: any[] }) {
    const [plans, setPlans] = useState<RentalPlan[]>(initialPlans);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<RentalPlan | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newPlan, setNewPlan] = useState<Partial<RentalPlan>>({
        type: "",
        category: "RENT_TO_OWN",
        prices: [{ term: "", price: "" }]
    });

    const handleEdit = (plan: RentalPlan) => {
        setEditingId(plan.id);
        setEditForm(JSON.parse(JSON.stringify(plan)));
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm(null);
    };

    const handleSave = async () => {
        if (!editForm) return;
        const res = await updateRentalPlan(editForm.id, editForm.type, editForm.prices.map(p => ({ term: p.term, price: p.price })));
        if (res.success) {
            setPlans(plans.map(p => p.id === editForm.id ? editForm : p));
            handleCancel();
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this plan?")) {
            const res = await deleteRentalPlan(id);
            if (res.success) {
                setPlans(plans.filter(p => p.id !== id));
            }
        }
    };

    const handleAddPriceRow = (isNew: boolean) => {
        if (isNew) {
            setNewPlan({
                ...newPlan,
                prices: [...(newPlan.prices || []), { term: "", price: "" }]
            });
        } else if (editForm) {
            setEditForm({
                ...editForm,
                prices: [...editForm.prices, { term: "", price: "" }]
            });
        }
    };

    const handleRemovePriceRow = (idx: number, isNew: boolean) => {
        if (isNew) {
            const updated = [...(newPlan.prices || [])];
            updated.splice(idx, 1);
            setNewPlan({ ...newPlan, prices: updated });
        } else if (editForm) {
            const updated = [...editForm.prices];
            updated.splice(idx, 1);
            setEditForm({ ...editForm, prices: updated });
        }
    };

    const handleCreate = async () => {
        if (!newPlan.type || !newPlan.category || !newPlan.prices?.length) return;
        const res = await createRentalPlan(
            newPlan.category as any,
            newPlan.type,
            newPlan.prices.map(p => ({ term: p.term, price: p.price }))
        );
        if (res.success) {
            window.location.reload(); // Simplest way to get the new ID from DB
        }
    };

    const renderPriceInputs = (plan: any, setFn: any, isNew: boolean) => (
        <div className="space-y-3 mt-4">
            <p className="text-sm font-semibold text-gray-700">Pricing Tiers</p>
            {plan.prices.map((p: any, idx: number) => (
                <div key={idx} className="flex gap-2">
                    <Input
                        placeholder="Term (e.g. 1-Year)"
                        value={p.term}
                        onChange={(e) => {
                            const updated = [...plan.prices];
                            updated[idx].term = e.target.value;
                            setFn({ ...plan, prices: updated });
                        }}
                    />
                    <Input
                        placeholder="Price (e.g. $300/Month)"
                        value={p.price}
                        onChange={(e) => {
                            const updated = [...plan.prices];
                            updated[idx].price = e.target.value;
                            setFn({ ...plan, prices: updated });
                        }}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleRemovePriceRow(idx, isNew)}
                        disabled={plan.prices.length <= 1}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddPriceRow(isNew)}
                className="mt-2"
            >
                <Plus className="h-4 w-4 mr-2" /> Add Tier
            </Button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={() => setIsCreating(true)} className="bg-[#2c2c9c]">
                    <Plus className="h-5 w-5 mr-2" /> New Rental Plan
                </Button>
            </div>

            {isCreating && (
                <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold mb-4">Create New Plan</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Container Type</label>
                            <Input
                                value={newPlan.type}
                                onChange={(e) => setNewPlan({ ...newPlan, type: e.target.value })}
                                placeholder="e.g. Used 20-Foot Standard"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <select
                                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                value={newPlan.category}
                                onChange={(e) => setNewPlan({ ...newPlan, category: e.target.value as any })}
                            >
                                <option value="RENT_TO_OWN">Rent-to-Own</option>
                                <option value="SHORT_TERM">Short-term</option>
                            </select>
                        </div>
                    </div>
                    {renderPriceInputs(newPlan, setNewPlan, true)}
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                        <Button onClick={handleCreate} className="bg-green-600 hover:bg-green-700">Create Plan</Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div key={plan.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        {editingId === plan.id && editForm ? (
                            <div className="space-y-4">
                                <Input
                                    value={editForm.type}
                                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                                />
                                {renderPriceInputs(editForm, setEditForm, false)}
                                <div className="flex justify-end gap-2 mt-4">
                                    <Button size="sm" variant="ghost" onClick={handleCancel}>
                                        <X className="h-4 w-4 mr-1" /> Cancel
                                    </Button>
                                    <Button size="sm" className="bg-[#2c2c9c]" onClick={handleSave}>
                                        <Save className="h-4 w-4 mr-1" /> Save
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col">
                                <div className="mb-4">
                                    <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${plan.category === 'RENT_TO_OWN' ? 'text-blue-600' : 'text-cyan-600'}`}>
                                        {plan.category.replace(/_/g, ' ')}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{plan.type}</h3>
                                </div>
                                <div className="space-y-2 flex-grow">
                                    {plan.prices.map((p, idx) => (
                                        <div key={idx} className="flex justify-between text-sm py-1 border-b border-gray-50">
                                            <span className="text-gray-500">{p.term}</span>
                                            <span className="font-bold text-gray-900">{p.price}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-50">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(plan)} className="text-blue-600 hover:bg-blue-50">
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(plan.id)} className="text-red-500 hover:bg-red-50">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
