'use client';

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

type SidebarContext = {
    expanded: boolean
    setExpanded: (expanded: boolean) => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

export function useSidebar() {
    const context = React.useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
}

export const SidebarProvider = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & {
        defaultExpanded?: boolean
    }
>(({ defaultExpanded = true, className, children, ...props }, ref) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded)

    return (
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
            <div
                ref={ref}
                className={cn("flex min-h-screen w-full bg-canvas text-foreground", className)}
                {...props}
            >
                {children}
            </div>
        </SidebarContext.Provider>
    )
})
SidebarProvider.displayName = "SidebarProvider"

export const Sidebar = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
    const { expanded } = useSidebar()

    return (
        <div
            ref={ref}
            className={cn(
                /* Figma shows sidebar with a white/background fill and a right border */
                "flex flex-col h-screen border-r border-border bg-background text-foreground transition-all duration-300 ease-in-out overflow-hidden shrink-0",
                expanded ? "w-72" : "w-16",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
Sidebar.displayName = "Sidebar"

export const SidebarHeader = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("flex items-center h-22 shrink-0 px-4", className)}
            {...props}
        />
    )
})
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-3 space-y-1",
                className
            )}
            {...props}
        />
    )
})
SidebarContent.displayName = "SidebarContent"

export const SidebarFooter = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("flex flex-col shrink-0 p-3 space-y-1 mt-auto border-t border-border", className)}
            {...props}
        />
    )
})
SidebarFooter.displayName = "SidebarFooter"

export const SidebarGroup = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
    return (
        <div ref={ref} className={cn("flex flex-col", className)} {...props} />
    )
})
SidebarGroup.displayName = "SidebarGroup"

export const SidebarGroupLabel = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
    const { expanded } = useSidebar()

    if (!expanded) return null

    return (
        <div
            ref={ref}
            className={cn("px-3 py-2 text-xs font-medium text-muted uppercase tracking-wider", className)}
            {...props}
        />
    )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

export const SidebarMenu = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-col gap-0.5 w-full m-0 p-0 list-none", className)}
        {...props}
    />
))
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("relative w-full", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
    /*
     * Base styles — Figma shows:
     *   - no background for inactive items
     *   - `--color-text-tertiary` (#52525B) for inactive text colour
     *   - hover shows a subtle card background
     */
    "flex items-center w-full gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-subtle hover:text-foreground hover:bg-card outline-none focus-visible:ring-2 focus-visible:ring-highlight cursor-pointer",
    {
        variants: {
            active: {
                /*
                 * Active state — Figma uses:
                 *   fill: Selected-item  = rgba(82, 125, 225, 0.1)  → bg-selected
                 *   text: Brand Primary  = #275DD9                  → text-brand
                 */
                true: "bg-selected text-brand font-semibold hover:bg-selected hover:text-brand",
                false: "",
            },
        },
        defaultVariants: {
            active: false,
        },
    }
)

interface SidebarMenuButtonProps
    extends React.ComponentProps<"button">,
    VariantProps<typeof sidebarMenuButtonVariants> {
    asChild?: boolean
}

export const SidebarMenuButton = React.forwardRef<
    HTMLButtonElement,
    SidebarMenuButtonProps
>(({ asChild = false, active, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const { expanded } = useSidebar()

    return (
        <Comp
            ref={ref}
            className={cn(
                sidebarMenuButtonVariants({ active }),
                expanded ? "justify-start" : "justify-center w-10 h-10 mx-auto px-0",
                className
            )}
            {...props}
        />
    )
})
SidebarMenuButton.displayName = "SidebarMenuButton"
