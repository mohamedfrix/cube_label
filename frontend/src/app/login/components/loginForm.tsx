'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


interface LoginFormInput {
    email: string;
    password: string;
}

export default function LoginForm() {

    const router = useRouter();
    const [tab, setTab] = useState("agent");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<LoginFormInput>({
        email: "",
        password: ""
    });
    const [formData, setFormData] = useState<LoginFormInput>({
        email: "",
        password: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError({
            email: "",
            password: ""
        });
        if (tab === "agent") {
            router.push("/profile");
        } else if (tab === "supervisor") {
            router.push("/profile");
        }
    }

    return (
        <div className="shadow-sm border border-border rounded-xl py-8 px-6 bg-white flex flex-col">
            <p className="text-2xl font-bold font-inter text-foreground">Sign in to Cube</p>
            <Tabs defaultValue="agent" className="w-[300px] xl:w-[500px] mt-6" value={tab} onValueChange={setTab}>

                <TabsList className="grid w-full grid-cols-2 h-12 p-2">
                    <TabsTrigger value="agent" className="font-medium font-inter">Agent</TabsTrigger>
                    <TabsTrigger value="supervisor" className="font-medium font-inter">Supervisor</TabsTrigger>
                </TabsList>

                <TabsContent value="agent" className="relative p-4 mt-3 rounded-lg border border-border text-sm">
                    <AgentForm formData={formData} setFormData={setFormData} />
                    <Button variant="default" className="w-full mt-6 bg-primary text-canvas font-medium font-inter self-center py-3 h-auto" onClick={handleSubmit}>Sign In</Button>
                </TabsContent>

                <TabsContent value="supervisor" className="p-4 mt-3 rounded-lg border border-border text-sm">
                    <SupervisorForm formData={formData} setFormData={setFormData} />
                    <Button variant="default" className="w-full mt-6 bg-primary text-canvas font-medium font-inter self-center py-3 h-auto" onClick={handleSubmit}>Sign In</Button>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function AgentForm({ formData, setFormData }: { formData: LoginFormInput, setFormData: React.Dispatch<React.SetStateAction<LoginFormInput>> }) {

    return (
        <div className="flex flex-col space-y-4 w-full p-2">
            <div className="flex flex-col space-y-2">
                <label className="text-sm xl:text-md font-medium font-inter">Email or Phone</label>
                <Input type="email" placeholder="john.doe@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="flex flex-col space-y-2">
                <label className="text-sm xl:text-md font-medium font-inter">Password</label>
                <Input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
        </div>
    )
}

function SupervisorForm({ formData, setFormData }: { formData: LoginFormInput, setFormData: React.Dispatch<React.SetStateAction<LoginFormInput>> }) {

    return (
        <div className="flex flex-col space-y-4 w-full p-2">
            <div className="flex flex-col space-y-2">
                <label className="text-sm xl:text-md font-medium font-inter">Email or Phone</label>
                <Input type="email" placeholder="john.doe@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="flex flex-col space-y-2">
                <label className="text-sm xl:text-md font-medium font-inter">Password</label>
                <Input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
        </div>
    )
}