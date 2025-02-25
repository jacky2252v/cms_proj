'use client'

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    ChevronDown,
    ChevronUp,
    Database,
    Key,
    Server,
    User,
} from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Label } from "@radix-ui/react-label";

export function MongoDBCredentialsForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        clusterName: "",
        hostname: "",
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-md border-2 border-gray-900 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <Database className="h-6 w-6" />
                        MongoDB Credentials
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-semibold">
                        Please enter your MongoDB connection details below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="flex items-center gap-2 font-semibold">
                                <User className="h-4 w-4 text-blue-500" />
                                Username
                            </Label>
                            <Input
                                id="username"
                                name="username"
                                placeholder="Your MongoDB username"
                                onChange={handleChange}
                                className="border-2 border-gray-800 placeholder-gray-400"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="flex items-center gap-2 font-semibold">
                                <Key className="h-4 w-4 text-green-500" />
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Your MongoDB password"
                                onChange={handleChange}
                                className="border-2 border-gray-800 placeholder-gray-400"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clusterName" className="flex items-center gap-2 font-semibold">
                                <Database className="h-4 w-4 text-purple-500" />
                                Cluster Name
                            </Label>
                            <Input
                                id="clusterName"
                                name="clusterName"
                                placeholder="e.g., Cluster0"
                                onChange={handleChange}
                                className="border-2 border-gray-800 placeholder-gray-400"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hostname" className="flex items-center gap-2 font-semibold">
                                <Server className="h-4 w-4 text-red-500" />
                                Hostname
                            </Label>
                            <Input
                                id="hostname"
                                name="hostname"
                                placeholder="e.g., abc123.mongodb.net"
                                onChange={handleChange}
                                className="border-2 border-gray-800 placeholder-gray-400"
                                required
                            />
                        </div>

                        <Collapsible
                            open={isOpen}
                            onOpenChange={setIsOpen}
                            className="space-y-2"
                        >
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="flex items-center justify-between w-full bg-gray-100 hover:bg-gray-200"
                                >
                                    How to find your credentials
                                    {isOpen ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-2 p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600 font-semibold">
                                    Your MongoDB connection string looks like this:
                                </p>
                                <div className="bg-white p-3 rounded border border-gray-300 text-sm font-mono break-all">
                                    mongodb+srv://
                                    <span className="text-blue-500">
                                        {formData.username || "<username>"}
                                    </span>
                                    :
                                    <span className="text-green-500">
                                        {formData.password || "<password>"}
                                    </span>
                                    @
                                    <span className="text-purple-500">
                                        {formData.clusterName || "<clusterName>"}
                                    </span>
                                    .
                                    <span className="text-red-500">
                                        {formData.hostname || "<hostName.mongodb.net>"}
                                    </span>
                                    /myFirstDatabase?retryWrites=true&w=majority
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                        <Button
                            type="submit"
                            className="w-full bg-black hover:bg-transparent hover:text-black border-2 border-black transition-all duration-500"
                        >
                            Submit Credentials
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}