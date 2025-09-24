import { FidaProfileCompletionForm } from "@/components/fida-profile-completion-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function FidaPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center dark:text-green-500">FIDA Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                    <FidaProfileCompletionForm />
                </CardContent>

            </Card>
        </div>
    );
}   