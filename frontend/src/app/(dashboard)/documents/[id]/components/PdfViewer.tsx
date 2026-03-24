import React, { useState, useCallback, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export interface BoundingBox {
    id: number;
    /** All values are percentages (0–100) relative to the PDF page */
    x: number;
    y: number;
    width: number;
    height: number;
    page: number;
    color: string;
}

interface PdfViewerProps {
    fileUrl: string;
    boundingBoxes: BoundingBox[];
    highlightedId: number | null;
}

export default function PdfViewer({
    fileUrl,
    boundingBoxes,
    highlightedId,
}: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageWidth, setPageWidth] = useState<number>(800);
    const containerRef = useRef<HTMLDivElement>(null);
    const boxRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const onDocumentLoadSuccess = useCallback(
        ({ numPages }: { numPages: number }) => {
            setNumPages(numPages);
        },
        []
    );

    useEffect(() => {
        if (highlightedId && boxRefs.current[highlightedId]) {
            boxRefs.current[highlightedId]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [highlightedId]);

    return (
        <div 
            ref={containerRef}
            className="flex flex-col items-center h-full w-full overflow-y-auto scroll-smooth py-4"
        >
            <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="w-full h-[480px] flex items-center justify-center text-muted">
                        Loading PDF…
                    </div>
                }
                className="flex flex-col gap-6"
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <div
                        key={`page_${index + 1}`}
                        className="relative bg-white rounded-lg shadow-sm border border-border overflow-hidden"
                    >
                        <Page
                            pageNumber={index + 1}
                            width={pageWidth}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                        
                        {/* Bounding box overlays for THIS page */}
                        {boundingBoxes
                            .filter((b) => b.page === index + 1)
                            .map((box) => {
                                const isHighlighted = highlightedId === box.id;
                                return (
                                    <div
                                        key={box.id}
                                        ref={(el) => {
                                            boxRefs.current[box.id] = el;
                                        }}
                                        className="absolute pointer-events-none transition-all duration-200"
                                        style={{
                                            left: `${box.x}%`,
                                            top: `${box.y}%`,
                                            width: `${box.width}%`,
                                            height: `${box.height}%`,
                                            border: isHighlighted 
                                                ? `3.5px solid ${box.color}` 
                                                : `2.5px solid ${box.color}99`,
                                            backgroundColor: isHighlighted
                                                ? `${box.color}15`
                                                : "transparent",
                                            boxShadow: isHighlighted
                                                ? `0 0 12px ${box.color}88`
                                                : "none",
                                            zIndex: isHighlighted ? 10 : 1,
                                            borderRadius: "2px",
                                        }}
                                    />
                                );
                            })}
                        
                        <div className="absolute top-2 right-2 bg-black/40 text-white px-2 py-0.5 rounded text-[10px] font-mono">
                            Page {index + 1}
                        </div>
                    </div>
                ))}
            </Document>
        </div>
    );
}
