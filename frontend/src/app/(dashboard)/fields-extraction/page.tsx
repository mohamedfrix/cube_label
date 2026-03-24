"use client";

import { useMemo, useState } from "react";
import { Plus, Scan, X, Eye, FileText } from "lucide-react";
import ScanModal from "@/components/ScanModal";
import {
    ExtractionTemplate,
    extractionTemplates,
    documentsStore,
    StoredDocument,
} from "@/db/inMemoryDb";

interface TemplateFieldDraft {
    id: number;
    group: string;
    name: string;
    description: string;
}

const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB");
};

export default function FieldsExtractionPage() {
    const [templates, setTemplates] = useState<ExtractionTemplate[]>(() => extractionTemplates);
    const [isScanModalOpen, setIsScanModalOpen] = useState(false);
    const [scanTemplateId, setScanTemplateId] = useState<number | null>(null);

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<ExtractionTemplate | null>(null);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [templateDescription, setTemplateDescription] = useState("");
    const [draftFields, setDraftFields] = useState<TemplateFieldDraft[]>([
        { id: 1, group: "INFORMATIONS GENERALES", name: "", description: "" },
    ]);
    const [formError, setFormError] = useState<string | null>(null);

    const templateOptions = useMemo(
        () =>
            templates.map((template) => ({
                id: template.id,
                name: template.name,
                description: template.description,
                fieldCount: template.fields.length,
            })),
        [templates]
    );

    const resetCreateForm = () => {
        setTemplateName("");
        setTemplateDescription("");
        setDraftFields([{ id: 1, group: "INFORMATIONS GENERALES", name: "", description: "" }]);
        setFormError(null);
    };

    const openTemplateDetails = (template: ExtractionTemplate) => {
        setSelectedTemplate(template);
        setIsDetailsOpen(true);
    };

    const addDraftField = () => {
        setDraftFields((prev) => [
            ...prev,
            {
                id: Date.now(),
                group: "INFORMATIONS GENERALES",
                name: "",
                description: "",
            },
        ]);
    };

    const removeDraftField = (id: number) => {
        setDraftFields((prev) => prev.filter((field) => field.id !== id));
    };

    const updateDraftField = (
        id: number,
        key: "group" | "name" | "description",
        value: string
    ) => {
        setDraftFields((prev) =>
            prev.map((field) => (field.id === id ? { ...field, [key]: value } : field))
        );
    };

    const handleCreateTemplate = () => {
        const hasName = templateName.trim().length > 0;
        const hasDescription = templateDescription.trim().length > 0;
        const validFields = draftFields.filter(
            (field) =>
                field.group.trim().length > 0 &&
                field.name.trim().length > 0 &&
                field.description.trim().length > 0
        );

        if (!hasName || !hasDescription) {
            setFormError("Template name and description are required.");
            return;
        }

        if (validFields.length === 0) {
            setFormError("Add at least one field with a description.");
            return;
        }

        const newTemplateId = (extractionTemplates.reduce((max, template) => Math.max(max, template.id), 0) || 0) + 1;
        const createdTemplate: ExtractionTemplate = {
            id: newTemplateId,
            name: templateName.trim(),
            description: templateDescription.trim(),
            createdAt: new Date().toISOString(),
            fields: validFields.map((field, idx) => ({
                id: idx + 1,
                group: field.group.trim(),
                name: field.name.trim(),
                description: field.description.trim(),
            })),
        };

        extractionTemplates.unshift(createdTemplate);
        setTemplates([...extractionTemplates]);
        resetCreateForm();
        setIsCreateOpen(false);
    };

    return (
        <div className="px-8 py-8 bg-white min-h-screen font-inter">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h2 className="text-4xl font-bold text-[#09090B]">Fields Extraction</h2>
                    <p className="text-sm text-[#71717A] mt-2">
                        Configure extraction templates and scan documents against the selected schema.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            setIsCreateOpen(true);
                            setFormError(null);
                        }}
                        className="flex items-center gap-2 bg-white border border-[#E4E4E7] hover:bg-[#F8FAFC] text-[#09090B] px-4 py-2.5 rounded-lg font-semibold transition-all"
                    >
                        <Plus size={18} />
                        Add Template
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsScanModalOpen(true)}
                        className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md transition-all active:scale-95"
                    >
                        <Scan size={18} />
                        Scan
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        type="button"
                        onClick={() => openTemplateDetails(template)}
                        className="text-left bg-white rounded-xl border border-[#E4E4E7] p-6 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-lg font-bold text-[#09090B]">{template.name}</p>
                                <p className="text-sm text-[#71717A] mt-1 line-clamp-2">{template.description}</p>
                            </div>
                            <Eye className="text-[#94A3B8] shrink-0" size={18} />
                        </div>

                        <div className="mt-5 flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-[#334155] font-semibold">
                                <FileText size={16} />
                                {template.fields.length} fields
                            </div>
                            <span className="text-[#71717A]">{formatDate(template.createdAt)}</span>
                        </div>
                    </button>
                ))}
            </div>

            <ScanModal
                isOpen={isScanModalOpen}
                onClose={() => setIsScanModalOpen(false)}
                requireTemplateSelection
                templates={templateOptions}
                selectedTemplateId={scanTemplateId}
                onSelectTemplate={setScanTemplateId}
                onScanComplete={({ templateId }) => {
                    if (!templateId) {
                        return;
                    }

                    const selectedTemplate = templates.find((template) => template.id === templateId);
                    if (!selectedTemplate) {
                        return;
                    }

                    const newDocumentId = (documentsStore.reduce((max, document) => Math.max(max, document.id), 0) || 0) + 1;
                    const today = new Date();
                    const day = String(today.getDate()).padStart(2, "0");
                    const month = String(today.getMonth() + 1).padStart(2, "0");
                    const year = today.getFullYear();
                    const dateKey = `${year}-${month}-${day}`;
                    const displayDate = `${day}/${month}/${year}`;

                    const extractedFields = selectedTemplate.fields.map((field, idx) => {
                        const attachment = idx % 5 === 0 ? "Table" as const : idx % 3 === 0 ? "Image" as const : null;

                        return {
                            id: idx + 1,
                            date: displayDate,
                            group: field.group,
                            fieldName: field.name,
                            value:
                                attachment === "Image"
                                    ? "/documents/test1.pdf#image-preview"
                                    : attachment === "Table"
                                    ? "/documents/test1.pdf#table-preview"
                                    : `Extracted text for ${field.name}`,
                            attachment,
                            page: 1,
                        };
                    });

                    const boundingBoxes = extractedFields.map((field, idx) => {
                        const row = Math.floor(idx / 2);
                        const col = idx % 2;
                        return {
                            id: field.id,
                            x: col === 0 ? 8 : 52,
                            y: 10 + row * 7,
                            width: 38,
                            height: 4.5,
                            page: 1,
                            color: col === 0 ? "#22c55e" : "#3b82f6",
                        };
                    });

                    const newDocument: StoredDocument = {
                        id: newDocumentId,
                        familyName: "SCANNED",
                        firstName: "Document",
                        phone: "N/A",
                        date: dateKey,
                        tags: ["Scanned", selectedTemplate.name],
                        doc: selectedTemplate.name,
                        filePath: "/documents/test1.pdf",
                        extractedFields,
                        boundingBoxes,
                    };

                    documentsStore.unshift(newDocument);
                    setScanTemplateId(templateId);
                }}
            />

            {isDetailsOpen && selectedTemplate && (
                <div className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="w-[min(780px,95vw)] max-h-[88vh] overflow-auto bg-white rounded-2xl p-7 shadow-xl">
                        <div className="flex items-start justify-between gap-4 mb-5">
                            <div>
                                <h3 className="text-2xl font-bold text-[#09090B]">{selectedTemplate.name}</h3>
                                <p className="text-sm text-[#71717A] mt-1">{selectedTemplate.description}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsDetailsOpen(false)}
                                className="w-9 h-9 rounded-lg border border-[#E4E4E7] text-[#71717A] hover:bg-[#F8FAFC] flex items-center justify-center"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {Object.entries(
                                selectedTemplate.fields.reduce<Record<string, typeof selectedTemplate.fields>>((acc, field) => {
                                    if (!acc[field.group]) {
                                        acc[field.group] = [];
                                    }
                                    acc[field.group].push(field);
                                    return acc;
                                }, {})
                            ).map(([groupName, groupFields]) => (
                                <div key={groupName} className="border border-[#E4E4E7] rounded-lg p-4 bg-[#FAFAFA]">
                                    <p className="text-xs font-extrabold tracking-wide text-[#64748B] uppercase mb-2">{groupName}</p>
                                    <div className="space-y-2">
                                        {groupFields.map((field, index) => (
                                            <div key={field.id}>
                                                <p className="text-sm font-bold text-[#09090B]">{index + 1}. {field.name}</p>
                                                <p className="text-sm text-[#52525B] mt-1">{field.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {isCreateOpen && (
                <div className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="w-[min(920px,95vw)] max-h-[90vh] overflow-auto bg-white rounded-2xl p-7 shadow-xl">
                        <div className="flex items-start justify-between gap-4 mb-5">
                            <div>
                                <h3 className="text-2xl font-bold text-[#09090B]">Create Extraction Template</h3>
                                <p className="text-sm text-[#71717A] mt-1">
                                    Define template metadata and the fields to extract from scanned documents.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCreateOpen(false);
                                    resetCreateForm();
                                }}
                                className="w-9 h-9 rounded-lg border border-[#E4E4E7] text-[#71717A] hover:bg-[#F8FAFC] flex items-center justify-center"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <div>
                                <label className="block text-sm font-semibold text-[#09090B] mb-2">Template Name</label>
                                <input
                                    type="text"
                                    value={templateName}
                                    onChange={(e) => setTemplateName(e.target.value)}
                                    placeholder="Insurance Form v1"
                                    className="w-full border border-[#E4E4E7] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2563EB]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#09090B] mb-2">Description</label>
                                <input
                                    type="text"
                                    value={templateDescription}
                                    onChange={(e) => setTemplateDescription(e.target.value)}
                                    placeholder="Extract key claim identifiers"
                                    className="w-full border border-[#E4E4E7] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2563EB]"
                                />
                            </div>
                        </div>

                        <div className="border border-[#E4E4E7] rounded-xl p-4 bg-[#FCFCFD]">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-bold text-[#09090B]">Fields</p>
                                <button
                                    type="button"
                                    onClick={addDraftField}
                                    className="text-sm font-semibold text-[#2563EB] hover:text-blue-700"
                                >
                                    + Add Field
                                </button>
                            </div>

                            <div className="space-y-3">
                                {draftFields.map((field, index) => (
                                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-3 border border-[#E4E4E7] bg-white rounded-lg p-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#71717A] mb-1">Group</label>
                                            <input
                                                type="text"
                                                value={field.group}
                                                onChange={(e) => updateDraftField(field.id, "group", e.target.value)}
                                                placeholder="INFORMATIONS GENERALES"
                                                className="w-full border border-[#E4E4E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2563EB] mb-3"
                                            />
                                            <label className="block text-xs font-semibold text-[#71717A] mb-1">
                                                Field #{index + 1}
                                            </label>
                                            <input
                                                type="text"
                                                value={field.name}
                                                onChange={(e) => updateDraftField(field.id, "name", e.target.value)}
                                                placeholder="Policy Number"
                                                className="w-full border border-[#E4E4E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2563EB]"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <label className="block text-xs font-semibold text-[#71717A]">Description</label>
                                                {draftFields.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDraftField(field.id)}
                                                        className="text-xs text-[#DC2626] hover:text-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                value={field.description}
                                                onChange={(e) => updateDraftField(field.id, "description", e.target.value)}
                                                placeholder="Unique policy identifier"
                                                className="w-full border border-[#E4E4E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2563EB]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {formError && (
                            <p className="text-sm text-[#DC2626] mt-4">{formError}</p>
                        )}

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCreateOpen(false);
                                    resetCreateForm();
                                }}
                                className="px-4 py-2.5 rounded-lg border border-[#E4E4E7] text-[#09090B] font-semibold hover:bg-[#F8FAFC]"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateTemplate}
                                className="px-4 py-2.5 rounded-lg bg-[#2563EB] text-white font-semibold hover:bg-blue-700"
                            >
                                Save Template
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
