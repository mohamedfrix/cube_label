"use client";

import { User, Bell, FileText, Home, Users, BarChart } from "lucide-react";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    let Icon = User;
    let title = "Profile";

    if (pathname.includes("/documents")) {
        Icon = FileText;
        title = "Documents";
    } else if (pathname.includes("/home")) {
        Icon = Home;
        title = "Home";
    } else if (pathname.includes("/users")) {
        Icon = Users;
        title = "User Management";
    } else if (pathname.includes("/statistics")) {
        Icon = BarChart;
        title = "Statistics";
    }

    return (
        <div className="w-full px-8 pt-6 pb-2 flex items-center justify-between border-b border-border h-20">
            <div className="flex items-center space-x-4">
                <Icon className="text-foreground mb-1" size={24} />
                <p className="text-foreground font-semibold font-inter text-2xl" >{title}</p>
            </div>
            <div className="flex items-center gap-x-2">
                <SearchBar />
                <Button asChild size="icon" className="bg-background h-auto w-auto p-[9px] border border-border h-11 cursor-pointer" >
                    <Bell className="text-grey-3" size={28} />
                </Button>
            </div>
        </div>
    )
}