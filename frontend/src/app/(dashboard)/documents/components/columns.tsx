"use client";
import { ColumnDef } from "@tanstack/react-table";

export type Document = {
    id: number;
    familyName: string;
    firstName: string;
    phone: string;
    date: string;
    tags: string[];
    doc: string;
}

export const columns: ColumnDef<Document>[] = [
    {
        accessorKey: "familyName",
        header: "Family Name",
    },
    {   accessorKey: "firstName",
        header: "First Name",
    },
    {   accessorKey: "phone",
        header: "Phone",
    },
    {   accessorKey: "date",
        header: "Date",
    },
    {   accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => (
            <div className="flex flex-wrap gap-2">
                {row.getValue<string[]>("tags").map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {tag}
                    </span>
                ))}
            </div>
        ),
    },
    {   accessorKey: "doc",
        header: "Document",
    },
];