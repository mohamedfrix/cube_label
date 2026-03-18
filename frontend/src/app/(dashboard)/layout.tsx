"use client";

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import NavBar from "@/components/NavBar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 w-full bg-canvas text-foreground overflow-y-auto">
                <div className="h-full w-full">
                    <NavBar />
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}