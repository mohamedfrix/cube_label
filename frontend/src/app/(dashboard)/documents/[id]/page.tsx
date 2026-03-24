"use client";

import React, { useState } from "react";
import { Search, Download, CheckCircle } from "lucide-react";
import DocumentFieldsTable, { ExtractedField } from "./components/DocumentFieldsTable";
import dynamic from "next/dynamic";
import { BoundingBox } from "./components/PdfViewer";

// Dynamic import for PdfViewer since react-pdf needs client-side only loading
const PdfViewer = dynamic(() => import("./components/PdfViewer"), {
    ssr: false,
    loading: () => (
        <div className="w-[340px] h-[480px] flex items-center justify-center text-muted bg-white rounded-lg border border-border">
            Loading viewer…
        </div>
    ),
});

/* ──────────────────────────────────────────────────────────────
 * MOCK DATA — Extracted fields from test1.pdf (Constat Amiable)
 * In production this would come from an OCR API response.
 * Bounding box coords are percentages of the PDF page.
 * ────────────────────────────────────────────────────────────── */
const EXTRACTED_FIELDS: ExtractedField[] = [
    { id: 1, date: "04/03/2026", fieldName: "Date d'accident", attachment: null, page: 1 },
    { id: 2, date: "04/03/2026", fieldName: "Véhicule", attachment: "Image", page: 1 },
    { id: 3, date: "04/03/2026", fieldName: "Assuré", attachment: null, page: 1 },
    { id: 4, date: "04/03/2026", fieldName: "Date d'accident", attachment: null, page: 1 },
    { id: 5, date: "04/03/2026", fieldName: "Extracted Tables", attachment: "Table", page: 1 },
    { id: 6, date: "04/03/2026", fieldName: "Code Agence", attachment: null, page: 1 },
    { id: 7, date: "04/03/2026", fieldName: "Souscripteur info", attachment: "Table", page: 2 },
    { id: 8, date: "04/03/2026", fieldName: "Durée du voyage", attachment: null, page: 2 },
    { id: 9, date: "04/03/2026", fieldName: "Souscripteur info", attachment: null, page: 2 },
    { id: 10, date: "04/03/2026", fieldName: "Souscripteur info", attachment: null, page: 2 },
    { id: 11, date: "04/03/2026", fieldName: "Assuré", attachment: null, page: 2 },
    { id: 12, date: "04/03/2026", fieldName: "Date d'accident", attachment: "Table", page: 2 },
    { id: 13, date: "04/03/2026", fieldName: "Code Agence", attachment: null, page: 2 },
    { id: 14, date: "04/03/2026", fieldName: "Constat numéro", attachment: null, page: 1 },
    { id: 15, date: "04/03/2026", fieldName: "Lieu de l'accident", attachment: null, page: 1 },
    { id: 16, date: "04/03/2026", fieldName: "Blessé(s)", attachment: null, page: 1 },
    { id: 17, date: "04/03/2026", fieldName: "Dégâts matériels", attachment: null, page: 1 },
    { id: 18, date: "04/03/2026", fieldName: "Témoins", attachment: null, page: 1 },
    { id: 19, date: "04/03/2026", fieldName: "Circonstances", attachment: "Table", page: 1 },
];

const BOUNDING_BOXES: BoundingBox[] = [
    // Page 1 — Roughly matching the "Constat Amiable" form layout
    { id: 14, x: 32, y: 1.5, width: 36, height: 2.5, page: 1, color: "#22c55e" }, // Title
    { id: 1,  x: 7.5, y: 7.8, width: 38, height: 2.5, page: 1, color: "#22c55e" }, // Date d'accident
    { id: 15, x: 7.5, y: 10.5, width: 85, height: 2.8, page: 1, color: "#22c55e" }, // Lieu
    { id: 16, x: 7.5, y: 13.5, width: 42, height: 2.5, page: 1, color: "#f97316" }, // Blessé(s)
    { id: 17, x: 50.5, y: 13.5, width: 42, height: 2.5, page: 1, color: "#f97316" }, // Dégâts
    { id: 18, x: 7.5, y: 16.5, width: 85, height: 2.8, page: 1, color: "#22c55e" }, // Témoins
    
    { id: 2,  x: 5, y: 24, width: 25, height: 52, page: 1, color: "#ef4444" }, // Véhicule A (Large Section)
    { id: 3,  x: 70, y: 24, width: 25, height: 52, page: 1, color: "#3b82f6" }, // Véhicule B (Large Section)
    { id: 19, x: 33, y: 24, width: 34, height: 42, page: 1, color: "#22c55e" }, // Circonstances
    { id: 5,  x: 45, y: 36, width: 14, height: 14, page: 1, color: "#22c55e" }, // Center Stamp area
    
    { id: 4,  x: 8, y: 55, width: 20, height: 3, page: 1, color: "#22c55e" }, // Signature A
    { id: 6,  x: 72, y: 55, width: 20, height: 3, page: 1, color: "#22c55e" }, // Signature B
    
    // Page 2 — Estimated coordinates for second page
    { id: 7,  x: 10, y: 10, width: 80, height: 15, page: 2, color: "#3b82f6" },
    { id: 8,  x: 10, y: 30, width: 35, height: 5, page: 2, color: "#22c55e" },
    { id: 9,  x: 55, y: 30, width: 35, height: 5, page: 2, color: "#22c55e" },
    { id: 10, x: 10, y: 40, width: 35, height: 8, page: 2, color: "#22c55e" },
    { id: 12, x: 55, y: 40, width: 35, height: 8, page: 2, color: "#3b82f6" },
];

export default function DocumentDetailPage() {
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
        if (selectedRows.length === EXTRACTED_FIELDS.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(EXTRACTED_FIELDS.map((f) => f.id));
        }
    };

    // Filter by search
    const filteredFields = searchQuery
        ? EXTRACTED_FIELDS.filter((f) =>
              f.fieldName.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : EXTRACTED_FIELDS;

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
                        selectedRows.length === EXTRACTED_FIELDS.length &&
                        EXTRACTED_FIELDS.length > 0
                    }
                />
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
                        fileUrl="/documents/test1.pdf"
                        boundingBoxes={BOUNDING_BOXES}
                        highlightedId={hoveredFieldId}
                    />
                </div>
            </div>
        </div>
    );
}
