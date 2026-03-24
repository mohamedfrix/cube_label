"use client";

import React, { useMemo, useState } from "react";
import { Download } from "lucide-react";
import DocumentFieldsTable, { ExtractedField } from "./components/DocumentFieldsTable";
import dynamic from "next/dynamic";
import { BoundingBox } from "./components/PdfViewer";
import { useParams } from "next/navigation";
import { documentsStore } from "@/db/inMemoryDb";

// Dynamic import for PdfViewer since react-pdf needs client-side only loading
const PdfViewer = dynamic(() => import("./components/PdfViewer"), {
    ssr: false,
    loading: () => (
        <div className="w-[340px] h-[480px] flex items-center justify-center text-muted bg-white rounded-lg border border-border">
            Loading viewer…
        </div>
    ),
});

export default function DocumentDetailPage() {
    const params = useParams<{ id: string }>();
    const documentId = Number(params?.id);
    const scannedDocument = Number.isFinite(documentId)
        ? documentsStore.find((document) => document.id === documentId)
        : undefined;
    const extractedFields: ExtractedField[] = scannedDocument?.extractedFields ?? [];
    const boundingBoxes: BoundingBox[] = scannedDocument?.boundingBoxes ?? [];

    const [hoveredFieldId, setHoveredFieldId] = useState<number | null>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Calculate current page from hovered field (default to 1)
    const handleHoverField = (id: number | null) => {
        setHoveredFieldId(id);
    };

    const toggleRow = (id: number) => {
        setSelectedRows((prev) =>
            prev.includes(id)
                ? prev.filter((r) => r !== id)
                : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedRows.length === extractedFields.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(extractedFields.map((f) => f.id));
        }
    };

    // Filter by search
    const filteredFields = searchQuery
        ? extractedFields.filter((f) => {
              const query = searchQuery.toLowerCase();
              return (
                  f.fieldName.toLowerCase().includes(query) ||
                  f.group.toLowerCase().includes(query)
              );
          })
        : extractedFields;

    const groupedFields = useMemo(() => {
        return extractedFields.reduce((acc, field) => {
            if (!acc[field.group]) {
                acc[field.group] = [];
            }
            acc[field.group].push(field);
            return acc;
        }, {} as Record<string, ExtractedField[]>);
    }, [extractedFields]);

    if (!scannedDocument) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-80px)] p-6 font-inter">
                <div className="bg-white border border-border rounded-xl px-8 py-7 text-center">
                    <p className="text-lg font-semibold text-[#09090B]">Document not found</p>
                    <p className="text-sm text-[#71717A] mt-2">
                        The scanned document may have been removed from the in-memory store.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-80px)] p-6 gap-6 font-inter">
            {/* LEFT PANEL — Fields Table (40%) */}
            <div className="w-[40%] flex flex-col min-w-0">
                {/* Top Toolbar */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2 flex-shrink-0">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="outline-none text-sm bg-transparent w-[160px] placeholder:text-grey-3"
                            />
                            <button className="bg-white border border-border rounded-md px-3 py-1 text-sm font-medium text-foreground hover:bg-gray-50 transition-colors cursor-pointer">
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-primary/20 transition-colors cursor-pointer">
                            Export All Data
                        </button>
                        <button className="flex items-center gap-2 bg-white border border-success/40 text-success rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-success/5 transition-colors cursor-pointer">
                            Validate
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <DocumentFieldsTable
                    data={filteredFields}
                    onHoverField={handleHoverField}
                    selectedRows={selectedRows}
                    onToggleRow={toggleRow}
                    onToggleAll={toggleAll}
                    allSelected={
                        selectedRows.length === extractedFields.length &&
                        extractedFields.length > 0
                    }
                />

                {/* Grouped View */}
                {/* <div className="mt-4 rounded-md border border-border bg-white p-3">
                    <p className="text-xs font-semibold text-grey-3 mb-2 uppercase tracking-wide">
                        Grouped extraction fields
                    </p>
                    <div className="space-y-3 max-h-[220px] overflow-auto pr-1">
                        {Object.entries(groupedFields).map(([group, fields]) => (
                            <div key={group} className="rounded-md border border-[#E4E4E7]">
                                <div className="px-3 py-2 border-b border-[#E4E4E7] bg-[#FAFAFA] text-[11px] font-semibold uppercase tracking-wide text-[#52525B]">
                                    {group}
                                </div>
                                <div className="px-3 py-2 space-y-1.5">
                                    {fields.map((field) => (
                                        <div key={field.id} className="text-xs text-[#27272A]">
                                            {field.fieldName}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>

            {/* RIGHT PANEL — PDF Viewer (60%) */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex justify-end mb-4">
                    <button className="flex items-center gap-2 bg-white border border-border rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
                <div className="flex-1 overflow-hidden rounded-xl border border-border bg-gray-50 flex flex-col items-center">
                    <PdfViewer
                        fileUrl={scannedDocument.filePath}
                        boundingBoxes={boundingBoxes}
                        highlightedId={hoveredFieldId}
                    />
                </div>
            </div>
        </div>
    );
}
