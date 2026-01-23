"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload,
    Mail,
    Phone,
    User,
    Briefcase,
    CheckCircle,
    XCircle,
    Loader2,
    Award,
    Rocket,
    Users,
    TrendingUp,
    Sparkles,
    ArrowRight
} from "lucide-react";
import { submitCareerApplication } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CareerPage() {
    const [formState, setFormState] = useState({
        fullName: "",
        email: "",
        phone: "",
        resume: null as File | null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // Comprehensive PDF validation function
    const validatePDFFile = async (file: File): Promise<{ valid: boolean; error?: string }> => {
        // 1. Check file size (5MB max, 100 bytes min)
        const maxSize = 5 * 1024 * 1024;
        const minSize = 100;

        if (file.size > maxSize) {
            return { valid: false, error: "File size must be less than 5MB" };
        }

        if (file.size < minSize) {
            return { valid: false, error: "File is too small to be a valid PDF" };
        }

        // 2. Check file extension
        const fileName = file.name.toLowerCase();
        if (!fileName.endsWith('.pdf')) {
            return { valid: false, error: "Only PDF files are allowed" };
        }

        // 3. Check for suspicious double extensions
        const suspiciousPatterns = [
            /\.pdf\.(exe|scr|bat|cmd|com|pif|vbs|js|jar|sh|php)$/i,
            /\.(exe|scr|bat|cmd|com|pif|vbs|js|jar|sh|php)\.pdf$/i,
        ];

        for (const pattern of suspiciousPatterns) {
            if (pattern.test(file.name)) {
                return { valid: false, error: "Suspicious file name detected" };
            }
        }

        // 4. Check MIME type
        if (file.type !== 'application/pdf') {
            return { valid: false, error: "Invalid file type. Only PDF files are allowed" };
        }

        // 5. Verify PDF magic number (file signature)
        try {
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            const pdfSignature = [0x25, 0x50, 0x44, 0x46]; // %PDF

            if (uint8Array.length < 4) {
                return { valid: false, error: "Invalid PDF file" };
            }

            for (let i = 0; i < pdfSignature.length; i++) {
                if (uint8Array[i] !== pdfSignature[i]) {
                    return { valid: false, error: "This is not a valid PDF file" };
                }
            }

            return { valid: true };
        } catch (error) {
            return { valid: false, error: "Failed to validate PDF file" };
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];

            const validation = await validatePDFFile(file);

            if (validation.valid) {
                setFormState({ ...formState, resume: file });
                setMessage(null);
            } else {
                setMessage({ type: "error", text: validation.error || "Invalid PDF file" });
            }
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            const validation = await validatePDFFile(file);

            if (validation.valid) {
                setFormState({ ...formState, resume: file });
                setMessage(null);
            } else {
                setMessage({ type: "error", text: validation.error || "Invalid PDF file" });
                e.target.value = ''; // Reset file input
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formState.fullName || !formState.email || !formState.phone || !formState.resume) {
            setMessage({ type: "error", text: "Please fill in all fields" });
            return;
        }

        // Additional client-side file size check
        const maxSizeInMB = 5;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        if (formState.resume.size > maxSizeInBytes) {
            setMessage({
                type: "error",
                text: `File size (${(formState.resume.size / 1024 / 1024).toFixed(2)} MB) exceeds the maximum allowed size of ${maxSizeInMB} MB. Please upload a smaller file.`
            });
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        try {
            const formData = new FormData();
            formData.append("fullName", formState.fullName);
            formData.append("email", formState.email);
            formData.append("phone", formState.phone);
            formData.append("resume", formState.resume);

            const result = await submitCareerApplication(formData);

            // Check if result exists and has expected structure
            if (!result) {
                setMessage({
                    type: "error",
                    text: "Server error: No response received. Please try again or contact support."
                });
                setIsSubmitting(false);
                return;
            }

            if (result.success) {
                setMessage({ type: "success", text: result.message || "Application submitted successfully!" });
                setFormState({ fullName: "", email: "", phone: "", resume: null });
                const fileInput = document.getElementById("resume") as HTMLInputElement;
                if (fileInput) fileInput.value = "";
            } else {
                // Provide specific error messages
                let errorMessage = result.error || "Failed to submit application";

                // Handle common error cases
                if (errorMessage.includes("413") || errorMessage.toLowerCase().includes("too large")) {
                    errorMessage = "Your file is too large for the server to process. Please reduce the file size and try again (maximum 2-3 MB recommended).";
                }

                setMessage({ type: "error", text: errorMessage });
            }
        } catch (error: any) {
            console.error("Submission error:", error);

            // Handle network or server errors
            let errorMessage = "An unexpected error occurred. Please try again.";

            if (error?.message?.includes("413") || error?.status === 413) {
                errorMessage = "File size exceeds server limit. Please upload a smaller PDF (2-3 MB recommended).";
            } else if (error?.message?.includes("network") || error?.message?.includes("fetch")) {
                errorMessage = "Network error. Please check your connection and try again.";
            }

            setMessage({ type: "error", text: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    const benefits = [
        { icon: Award, title: "Growth", description: "Continuous learning opportunities" },
        { icon: Users, title: "Team", description: "Collaborative work environment" },
        { icon: TrendingUp, title: "Career", description: "Clear advancement paths" },
        { icon: Rocket, title: "Innovation", description: "Cutting-edge projects" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.2, 0.3],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"
                />
            </div>

            {/* Hero Section */}
            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-cyan-900 bg-clip-text text-transparent"
                        >
                            Shape Your Future
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8"
                        >
                            Join Prime Containers and be part of a team that's revolutionizing the container industry
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="flex items-center justify-center gap-2 text-blue-600"
                        >
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            <span className="font-semibold">We're actively hiring</span>
                            <Sparkles className="w-5 h-5 animate-pulse" />
                        </motion.div>
                    </motion.div>

                    {/* Benefits Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
                    >
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-6 text-center">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-3">
                                            <benefit.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                                        <p className="text-sm text-gray-600">{benefit.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Application Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="max-w-2xl mx-auto"
                    >
                        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md overflow-hidden">

                            <CardContent className="p-8 md:p-12">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Apply Now</h2>
                                    <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Full Name */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.9, duration: 0.5 }}
                                        className="relative"
                                    >
                                        <Label
                                            htmlFor="fullName"
                                            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
                                        >
                                            <User className="w-4 h-4 text-blue-600" />
                                            Full Name
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="fullName"
                                                type="text"
                                                placeholder="Enter your full name"
                                                value={formState.fullName}
                                                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                                                onFocus={() => setFocusedField("fullName")}
                                                onBlur={() => setFocusedField(null)}
                                                className={`h-12 pl-4 pr-4 border-2 transition-all duration-300 ${focusedField === "fullName"
                                                    ? "border-blue-500 ring-4 ring-blue-100"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                                required
                                            />
                                            <AnimatePresence>
                                                {focusedField === "fullName" && (
                                                    <motion.div
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                                    >
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>

                                    {/* Email */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.0, duration: 0.5 }}
                                        className="relative"
                                    >
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
                                        >
                                            <Mail className="w-4 h-4 text-blue-600" />
                                            Email Address
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                onFocus={() => setFocusedField("email")}
                                                onBlur={() => setFocusedField(null)}
                                                className={`h-12 pl-4 pr-4 border-2 transition-all duration-300 ${focusedField === "email"
                                                    ? "border-blue-500 ring-4 ring-blue-100"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                                required
                                            />
                                            <AnimatePresence>
                                                {focusedField === "email" && (
                                                    <motion.div
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                                    >
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>

                                    {/* Phone */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.1, duration: 0.5 }}
                                        className="relative"
                                    >
                                        <Label
                                            htmlFor="phone"
                                            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
                                        >
                                            <Phone className="w-4 h-4 text-blue-600" />
                                            Phone Number
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="+1 (555) 123-4567"
                                                value={formState.phone}
                                                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                                onFocus={() => setFocusedField("phone")}
                                                onBlur={() => setFocusedField(null)}
                                                className={`h-12 pl-4 pr-4 border-2 transition-all duration-300 ${focusedField === "phone"
                                                    ? "border-blue-500 ring-4 ring-blue-100"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                                required
                                            />
                                            <AnimatePresence>
                                                {focusedField === "phone" && (
                                                    <motion.div
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                                    >
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>

                                    {/* Resume Upload */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.2, duration: 0.5 }}
                                    >
                                        <Label
                                            htmlFor="resume"
                                            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
                                        >
                                            <Upload className="w-4 h-4 text-blue-600" />
                                            Resume / CV
                                            <span className="text-xs text-red-600 font-medium">(PDF only, max 2-3MB recommended)</span>
                                        </Label>

                                        <motion.div
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                            whileHover={{ scale: 1.01 }}
                                            className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer ${dragActive
                                                ? "border-blue-500 bg-blue-50 shadow-lg"
                                                : formState.resume
                                                    ? "border-green-400 bg-green-50"
                                                    : "border-gray-300 hover:border-blue-400 bg-gray-50/50 hover:bg-blue-50/50"
                                                }`}
                                        >
                                            <input
                                                id="resume"
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                required
                                            />

                                            <div className="text-center pointer-events-none">
                                                <AnimatePresence mode="wait">
                                                    {formState.resume ? (
                                                        <motion.div
                                                            key="uploaded"
                                                            initial={{ scale: 0.8, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            exit={{ scale: 0.8, opacity: 0 }}
                                                            className="space-y-3"
                                                        >
                                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-2">
                                                                <CheckCircle className="w-8 h-8 text-green-600" />
                                                            </div>
                                                            <p className="text-green-700 font-semibold text-lg">
                                                                {formState.resume.name}
                                                            </p>
                                                            <p className="text-sm text-green-600">
                                                                {(formState.resume.size / 1024 / 1024).toFixed(2)} MB • Click to change
                                                            </p>
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key="empty"
                                                            initial={{ scale: 0.8, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            exit={{ scale: 0.8, opacity: 0 }}
                                                            className="space-y-3"
                                                        >
                                                            <motion.div
                                                                animate={{ y: [0, -10, 0] }}
                                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-2"
                                                            >
                                                                <Upload className="w-8 h-8 text-blue-600" />
                                                            </motion.div>
                                                            <p className="text-gray-700 font-semibold text-lg">
                                                                Drop your resume here
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                or click to browse
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    </motion.div>

                                    {/* Message Alert */}
                                    <AnimatePresence>
                                        {message && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Alert
                                                    className={`border-2 ${message.type === "success"
                                                        ? "bg-green-50 border-green-400"
                                                        : "bg-red-50 border-red-400"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {message.type === "success" ? (
                                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                        ) : (
                                                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                                        )}
                                                        <AlertDescription
                                                            className={`font-semibold ${message.type === "success" ? "text-green-800" : "text-red-800"
                                                                }`}
                                                        >
                                                            {message.text}
                                                        </AlertDescription>
                                                    </div>
                                                </Alert>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Submit Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.3, duration: 0.5 }}
                                    >
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                                        >
                                            {/* Button Background Animation */}
                                            <motion.div
                                                animate={{ x: ["-100%", "100%"] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            />

                                            <span className="relative flex items-center justify-center gap-2">
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Submitting Application...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Application
                                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </span>
                                        </Button>
                                    </motion.div>
                                </form>

                                {/* Footer Note */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.4, duration: 0.5 }}
                                    className="text-center text-sm text-gray-500 mt-6"
                                >
                                    By submitting, you agree to our{" "}
                                    <button className="text-blue-600 hover:text-blue-700 font-medium underline">
                                        Privacy Policy
                                    </button>
                                </motion.p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="text-center mt-16"
                    >
                        <p className="text-gray-600 text-lg">
                            Questions about the role?{" "}
                            <a href="mailto:careers@primecontainers.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                                Get in touch
                            </a>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
