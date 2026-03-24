"use client";

import React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import ActionsMenu from "./ActionsMenu";

export interface ExtractedField {
    id: number;
    date: string;
    group: string;
    fieldName: string;
    value: string;
    attachment: "Image" | "Table" | null;
    page: number;
}

interface DocumentFieldsTableProps {
    data: ExtractedField[];
    onHoverField: (id: number | null) => void;
    selectedRows: number[];
    onToggleRow: (id: number) => void;
    onToggleAll: () => void;
    allSelected: boolean;
}

const ATTACHMENT_STYLES: Record<string, string> = {
    Image: "bg-emerald-100 text-emerald-700 border border-emerald-300",
    Table: "bg-blue-100 text-blue-700 border border-blue-300",
};

export default function DocumentFieldsTable({
    data,
    onHoverField,
    selectedRows,
    onToggleRow,
    onToggleAll,
    allSelected,
}: DocumentFieldsTableProps) {
    const columns: ColumnDef<ExtractedField>[] = [
        {
            id: "select",
            header: () => (
                <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={onToggleAll}
                    className="w-4 h-4 rounded border-grey-2 accent-primary cursor-pointer"
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={selectedRows.includes(row.original.id)}
                    onChange={() => onToggleRow(row.original.id)}
                    className="w-4 h-4 rounded border-grey-2 accent-primary cursor-pointer"
                />
            ),
            size: 40,
        },
        {
            accessorKey: "date",
            header: ({ column }) => (
                <button className="flex items-center gap-1 font-medium cursor-pointer" onClick={() => column.toggleSorting()}>
                    Date <span className="text-grey-3 text-xs">⇅</span>
                </button>
            ),
        },
        {
            accessorKey: "group",
            header: ({ column }) => (
                <button className="flex items-center gap-1 font-medium cursor-pointer" onClick={() => column.toggleSorting()}>
                    Group <span className="text-grey-3 text-xs">⇅</span>
                </button>
            ),
            cell: ({ row }) => (
                <span className="text-xs font-semibold text-[#334155] uppercase tracking-wide">
                    {row.original.group}
                </span>
            ),
        },
        {
            id: "fieldInfo",
            header: () => (
                <span className="flex items-center gap-1 font-medium">
                    Field
                </span>
            ),
            cell: ({ row }) => (
                <span className="font-medium text-foreground">
                    {row.original.fieldName}
                </span>
            ),
        },
        {
            id: "value",
            header: () => <span className="font-medium">Value</span>,
            cell: ({ row }) => {
                const isPreview = row.original.attachment === "Image" || row.original.attachment === "Table";
                if (isPreview) {
                    return (
                        <a
                            href={row.original.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2563EB] hover:text-blue-700 underline font-medium"
                        >
                            Preview link
                        </a>
                    );
                }

                return (
                    <span className="text-[#334155]">
                        {row.original.value}
                    </span>
                );
            },
        },
        {
            accessorKey: "attachment",
            header: ({ column }) => (
                <button className="flex items-center gap-1 font-medium cursor-pointer" onClick={() => column.toggleSorting()}>
                    Attachment <span className="text-grey-3 text-xs">⇅</span>
                </button>
            ),
            cell: ({ row }) => {
                const val = row.original.attachment;
                if (!val) return null;
                return (
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${ATTACHMENT_STYLES[val]}`}
                    >
                        {val}
                    </span>
                );
            },
        },
        {
            accessorKey: "page",
            header: ({ column }) => (
                <button className="flex items-center gap-1 font-medium cursor-pointer" onClick={() => column.toggleSorting()}>
                    page <span className="text-grey-3 text-xs">⇅</span>
                </button>
            ),
            cell: ({ row }) => (
                <span className="text-center block">{row.original.page}</span>
            ),
        },
        {
            id: "actions",
            cell: () => <ActionsMenu />,
            size: 50,
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    return (
        <div className="flex flex-col h-full">
            {/* Table */}
            <div className="flex-1 overflow-auto rounded-md border border-border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-white hover:bg-white">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-grey-3 text-xs font-medium whitespace-nowrap"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                                    onMouseEnter={() =>
                                        onHoverField(row.original.id)
                                    }
                                    onMouseLeave={() => onHoverField(null)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="text-sm py-3"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-2 py-3 text-sm text-grey-3 font-inter">
                <span>
                    {selectedRows.length} of {data.length} row(s) selected.
                </span>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs">Rows per page</span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) =>
                                table.setPageSize(Number(e.target.value))
                            }
                            className="border border-border rounded-md px-2 py-1 text-xs bg-white text-foreground cursor-pointer"
                        >
                            {[10, 20, 30].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <span className="text-xs">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronsLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                            className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronsRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
