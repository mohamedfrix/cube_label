"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Pencil, Eye, Trash2 } from "lucide-react";

export default function ActionsMenu() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
                <MoreHorizontal className="w-5 h-5 text-grey-3" />
            </button>
            {open && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-border rounded-lg shadow-lg z-50 py-1 animate-in fade-in-0 zoom-in-95">
                    <button
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        <Pencil className="w-4 h-4 text-grey-3" />
                        Edit
                    </button>
                    <button
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        <Eye className="w-4 h-4 text-grey-3" />
                        Preview
                    </button>
                    <button
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-error hover:bg-red-50 transition-colors cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        <Trash2 className="w-4 h-4 text-error" />
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
