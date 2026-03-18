'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/ui/logo"
import { Home, History, FileText, BarChart2, User, Settings, LogOut, ChevronLeft, ChevronRight, FilePen, Users, ChartColumn } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image";


// Extracted from Figma: Dashboard, History, Documents, Analytics, Profile
const menuItems = [
    { title: "Home", url: "/home", icon: Home },
    { title: "Documents", url: "/documents", icon: FilePen },
    { title: "User Management", url: "/user-management", icon: Users },
    { title: "Statistics", url: "/statistics", icon: ChartColumn },
    { title: "Profile", url: "/profile", icon: User },
]

function CollapseToggle() {
    const { expanded, setExpanded } = useSidebar()
    return (
        <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-center w-8 h-8 rounded-md text-muted hover:text-foreground hover:bg-card transition-colors ml-auto"
        >
            {expanded
                ? <ChevronLeft className="w-4 h-4" />
                : <ChevronRight className="w-4 h-4" />
            }
        </button>
    )
}

function SidebarLogo() {
    const { expanded } = useSidebar()
    if (expanded) {
        return (
            <div className="flex items-center gap-2 flex-1">
                <Logo className="w-32 h-auto" />
            </div>
        )
    }
    // Collapsed: show a small square with the brand colour "C" mark
    return (
        <span className="text-lg font-bold text-brand mx-auto">C</span>
    )
}

export function AppSidebar() {
    const pathname = usePathname()
    const { expanded } = useSidebar()

    return (
        <Sidebar>
            {/* ── Header: Logo + collapse toggle ── */}
            <SidebarHeader>
                <SidebarLogo />
                <CollapseToggle />
            </SidebarHeader>

            {/* ── Main navigation ── */}
            <SidebarContent>
                <SidebarGroup >
                    <div className="w-full border border-border rounded-md py-2 px-3 flex items-center gap-x-3">
                        <div className="relative w-6 h-6 rounded-full">
                            <Image src="/images/profile_picture.jpg" alt="" fill className="object-cover rounded-full" />
                        </div>
                        <p className="font-inter text-sm text-black font-medium">Mr. OUAZZI Mounir</p>
                    </div>
                </SidebarGroup>
                <SidebarGroup className="mt-4">
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            item.url === pathname ? (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        active={pathname === item.url || pathname.startsWith(item.url + "/")}
                                    >
                                        <a href={item.url}>
                                            <item.icon className="w-6 h-6 shrink-0 text-primary" />
                                            {expanded && <p className="truncate text-primary font-inter font-medium">{item.title}</p>}
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>    
                            ) : (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        active={pathname === item.url || pathname.startsWith(item.url + "/")}
                                    >
                                        <a href={item.url}>
                                            <item.icon className="w-6 h-6 shrink-0 text-black" />
                                            {expanded && <p className="truncate text-black font-inter font-medium">{item.title}</p>}
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                            
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* ── Footer: Settings + Log out ── */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="/settings">
                                <Settings className="w-5 h-5 shrink-0" />
                                {expanded && <span>Settings</span>}
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        {/* Figma shows Log out with a distinct reddish text colour (fill_T2JFEQ) */}
                        <SidebarMenuButton
                            asChild
                            className="text-error/80 hover:bg-error/10 hover:text-error"
                        >
                            <a href="/logout">
                                <LogOut className="w-5 h-5 shrink-0" />
                                {expanded && <span>Log out</span>}
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
