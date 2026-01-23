"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import {
    FileText,
    Mail,
    Phone,
    Calendar,
    Download,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    Award,
    Briefcase,
    Trash2,
} from "lucide-react";
import { getCareerApplications, updateApplicationStatus, deleteApplication } from "./actions";

type ApplicationStatus = "NEW" | "REVIEWED" | "SHORTLISTED" | "REJECTED" | "HIRED";

interface CareerApplication {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    resumeUrl: string;
    status: ApplicationStatus;
    createdAt: string;
    updatedAt: string;
}

const statusConfig = {
    NEW: {
        label: "New",
        color: "bg-blue-100 text-blue-800 border-blue-300",
        icon: Clock,
    },
    REVIEWED: {
        label: "Reviewed",
        color: "bg-purple-100 text-purple-800 border-purple-300",
        icon: Eye,
    },
    SHORTLISTED: {
        label: "Shortlisted",
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        icon: Award,
    },
    REJECTED: {
        label: "Rejected",
        color: "bg-red-100 text-red-800 border-red-300",
        icon: XCircle,
    },
    HIRED: {
        label: "Hired",
        color: "bg-green-100 text-green-800 border-green-300",
        icon: CheckCircle,
    },
};

export default function CareersPage() {
    const [applications, setApplications] = useState<CareerApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        setIsLoading(true);
        const data = await getCareerApplications();
        setApplications(data);
        setIsLoading(false);
    };

    const handleStatusChange = async (id: number, newStatus: ApplicationStatus) => {
        await updateApplicationStatus(id, newStatus);
        await loadApplications();
    };

    const handleDelete = async (id: number) => {
        await deleteApplication(id);
        await loadApplications();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 md:p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-[1600px] mx-auto"
            >
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Career Applications</h1>
                    </div>
                    <p className="text-gray-600 text-base md:text-lg">
                        Manage and review all career applications
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
                    {Object.entries(statusConfig).map(([status, config]) => {
                        const count = applications.filter((app) => app.status === status).length;
                        const Icon = config.icon;
                        return (
                            <motion.div
                                key={status}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="border-l-4 hover:shadow-lg transition-shadow">
                                    <CardHeader className="pb-2 px-4 pt-4">
                                        <div className="flex items-center justify-between">
                                            <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                                            <Badge className={`${config.color} text-xs`}>{config.label}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="px-4 pb-4">
                                        <p className="text-2xl md:text-3xl font-bold text-gray-900">{count}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Applications Table */}
                <Card className="shadow-xl border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                        <CardTitle className="text-xl md:text-2xl">All Applications</CardTitle>
                        <CardDescription>
                            Total: {applications.length} application{applications.length !== 1 ? "s" : ""}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : applications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                <Briefcase className="w-16 h-16 mb-4 opacity-30" />
                                <p className="text-lg font-semibold">No applications yet</p>
                                <p className="text-sm">Applications will appear here once submitted</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead className="font-semibold whitespace-nowrap">Applicant</TableHead>
                                            <TableHead className="font-semibold whitespace-nowrap min-w-[200px]">Contact</TableHead>
                                            <TableHead className="font-semibold whitespace-nowrap">Applied On</TableHead>
                                            <TableHead className="font-semibold whitespace-nowrap">Status</TableHead>
                                            <TableHead className="font-semibold whitespace-nowrap">Resume</TableHead>
                                            <TableHead className="font-semibold text-right whitespace-nowrap">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {applications.map((application, index) => {
                                            const StatusIcon = statusConfig[application.status].icon;
                                            return (
                                                <TableRow
                                                    key={application.id}
                                                    className="hover:bg-blue-50/50 transition-colors"
                                                >
                                                    <TableCell className="font-semibold whitespace-nowrap">
                                                        {application.fullName}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="space-y-1 min-w-[180px]">
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                                <span className="text-gray-600 truncate">{application.email}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                                <span className="text-gray-600">{application.phone}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
                                                            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                            {formatDate(application.createdAt)}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Select
                                                            value={application.status}
                                                            onValueChange={(value) =>
                                                                handleStatusChange(application.id, value as ApplicationStatus)
                                                            }
                                                        >
                                                            <SelectTrigger className={`w-[150px] border-2 ${statusConfig[application.status].color}`}>
                                                                <div className="flex items-center gap-2">
                                                                    <StatusIcon className="w-4 h-4" />
                                                                    <SelectValue />
                                                                </div>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {Object.entries(statusConfig).map(([status, config]) => {
                                                                    const Icon = config.icon;
                                                                    return (
                                                                        <SelectItem key={status} value={status}>
                                                                            <div className="flex items-center gap-2">
                                                                                <Icon className="w-4 h-4" />
                                                                                {config.label}
                                                                            </div>
                                                                        </SelectItem>
                                                                    );
                                                                })}
                                                            </SelectContent>
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                                            <FileText className="w-4 h-4 text-red-600" />
                                                            <span className="text-sm text-gray-600">PDF</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <a
                                                                href={`/api/download-resume/${application.resumeUrl.split('/').pop()}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 whitespace-nowrap"
                                                                >
                                                                    <Download className="w-4 h-4 md:mr-2" />
                                                                    <span className="hidden md:inline">Download</span>
                                                                </Button>
                                                            </a>

                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="hover:bg-red-50 hover:border-red-500 hover:text-red-600"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Delete Application</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Are you sure you want to delete the application from <strong>{application.fullName}</strong>? This action cannot be undone.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => handleDelete(application.id)}
                                                                            className="bg-red-600 hover:bg-red-700"
                                                                        >
                                                                            Delete
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
