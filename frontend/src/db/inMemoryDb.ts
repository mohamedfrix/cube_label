export interface TemplateField {
    id: number;
    group: string;
    name: string;
    description: string;
}

export interface ExtractionTemplate {
    id: number;
    name: string;
    description: string;
    fields: TemplateField[];
    createdAt: string;
}

export interface ExtractedDocumentField {
    id: number;
    date: string;
    group: string;
    fieldName: string;
    value: string;
    attachment: "Image" | "Table" | null;
    page: number;
}

export interface FieldBoundingBox {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    page: number;
    color: string;
}

export interface StoredDocument {
    id: number;
    familyName: string;
    firstName: string;
    phone: string;
    date: string;
    tags: string[];
    doc: string;
    filePath: string;
    extractedFields: ExtractedDocumentField[];
    boundingBoxes: FieldBoundingBox[];
}

// Simple in-memory variables for frontend-only usage.
// These reset on full refresh/restart.
export const extractionTemplates: ExtractionTemplate[] = [
    {
        id: 1,
        name: "Insurance Accident Report",
        description: "Extract key policyholder and incident details from accident report PDFs.",
        createdAt: "2026-03-24T08:00:00.000Z",
        fields: [
            { id: 1, group: "INFORMATIONS GENERALES", name: "Date de l'accident", description: "Date of accident." },
            { id: 2, group: "INFORMATIONS GENERALES", name: "Heure", description: "Time of accident." },
            { id: 3, group: "INFORMATIONS GENERALES", name: "Lieu", description: "Accident location." },
            { id: 4, group: "INFORMATIONS GENERALES", name: "Temoins (noms et coordonnees)", description: "Witness names and contacts." },
            { id: 5, group: "VEHICULE A", name: "Nom du conducteur", description: "Driver full name for vehicle A." },
            { id: 6, group: "VEHICULE A", name: "Adresse", description: "Driver address for vehicle A." },
            { id: 7, group: "VEHICULE A", name: "Immatriculation", description: "Plate number for vehicle A." },
            { id: 8, group: "VEHICULE A", name: "Assurance", description: "Insurance details for vehicle A." },
            { id: 9, group: "VEHICULE A", name: "Circonstances cochees", description: "Checked circumstances for vehicle A." },
            { id: 10, group: "VEHICULE A", name: "Degats apparents", description: "Visible damages for vehicle A." },
            { id: 11, group: "VEHICULE B", name: "Nom du conducteur", description: "Driver full name for vehicle B." },
            { id: 12, group: "VEHICULE B", name: "Adresse", description: "Driver address for vehicle B." },
            { id: 13, group: "VEHICULE B", name: "Immatriculation", description: "Plate number for vehicle B." },
            { id: 14, group: "VEHICULE B", name: "Assurance", description: "Insurance details for vehicle B." },
            { id: 15, group: "VEHICULE B", name: "Circonstances cochees", description: "Checked circumstances for vehicle B." },
            { id: 16, group: "VEHICULE B", name: "Degats apparents", description: "Visible damages for vehicle B." },
        ],
    },
];

export const documentsStore: StoredDocument[] = [
    {
        id: 1,
        familyName: "OUAZZI",
        firstName: "Mounir",
        phone: "+212 6 12 34 56 78",
        date: "2026-03-24",
        tags: ["Scanned", "Insurance"],
        doc: "Insurance Accident Report",
        filePath: "/documents/constat.pdf",
        extractedFields: [
            { id: 1, date: "24/03/2026", group: "INFORMATIONS GENERALES", fieldName: "Date de l'accident", value: "31.02.2003 (date impossible)", attachment: null, page: 1 },
            { id: 2, date: "24/03/2026", group: "INFORMATIONS GENERALES", fieldName: "Heure", value: "14:05", attachment: null, page: 1 },
            { id: 3, date: "24/03/2026", group: "INFORMATIONS GENERALES", fieldName: "Lieu", value: "Rte de Boujean 147", attachment: null, page: 1 },
            { id: 4, date: "24/03/2026", group: "INFORMATIONS GENERALES", fieldName: "Temoins (noms et coordonnees)", value: "Madame G. Touru, Grünweg 13, 2500 Bienne", attachment: null, page: 1 },
            
            { id: 5, date: "24/03/2026", group: "VEHICULE A", fieldName: "Nom du conducteur", value: "Gérard Padbol", attachment: null, page: 1 },
            { id: 6, date: "24/03/2026", group: "VEHICULE A", fieldName: "Adresse", value: "Chemin Vert 13, 2500 Bienne", attachment: null, page: 1 },
            { id: 7, date: "24/03/2026", group: "VEHICULE A", fieldName: "Immatriculation", value: "", attachment: null, page: 1 },
            { id: 8, date: "24/03/2026", group: "VEHICULE A", fieldName: "Assurance", value: "Mobiliar (Agence Bienne), police 471125-Z", attachment: null, page: 1 },
            { id: 9, date: "24/03/2026", group: "VEHICULE A", fieldName: "Circonstances cochees", value: "", attachment: null, page: 1 },
            { id: 10, date: "24/03/2026", group: "VEHICULE A", fieldName: "Degats apparents", value: "Vitre cassée", attachment: null, page: 1 },
            { id: 11, date: "24/03/2026", group: "VEHICULE A", fieldName: "Observations", value: "Le siège passager est endommagé ?", attachment: null, page: 1 },

            { id: 12, date: "24/03/2026", group: "VEHICULE B", fieldName: "Nom du conducteur", value: "Jean Hemar", attachment: null, page: 1 },
            { id: 13, date: "24/03/2026", group: "VEHICULE B", fieldName: "Adresse", value: "Rue Haute 23, 2000 Neuchâtel", attachment: null, page: 1 },
            { id: 14, date: "24/03/2026", group: "VEHICULE B", fieldName: "Immatriculation", value: "443211 (BMC, vélo de course)", attachment: null, page: 1 },
            { id: 15, date: "24/03/2026", group: "VEHICULE B", fieldName: "Assurance", value: "Helvetia (Agence Cortaillod), police 784311", attachment: null, page: 1 },
            { id: 16, date: "24/03/2026", group: "VEHICULE B", fieldName: "Circonstances cochees", value: "Case 16 cochée: venait de droite (dans un carrefour)", attachment: null, page: 1 },
            { id: 17, date: "24/03/2026", group: "VEHICULE B", fieldName: "Degats apparents", value: "Roue pliée, pneu éclaté", attachment: null, page: 1 },
            { id: 18, date: "24/03/2026", group: "VEHICULE B", fieldName: "Observations", value: "Je n'ai pas pu freiner !", attachment: null, page: 1 },

        ],
        boundingBoxes: [
            { id: 1, x: 6, y: 13, width: 14, height: 2.7, page: 1, color: "#22c55e" },
            { id: 2, x: 21, y: 13, width: 5, height: 2.7, page: 1, color: "#22c55e" },
            { id: 3, x: 27, y: 13, width: 30, height: 3, page: 1, color: "#22c55e" },
            { id: 4, x: 27, y: 16.3, width: 58, height: 3.2, page: 1, color: "#22c55e" },

            { id: 5, x: 8.5, y: 51.2, width: 12, height: 3.5, page: 1, color: "#f6473b" },
            { id: 6, x: 6, y: 54, width: 22, height: 3.5, page: 1, color: "#f6473b" },
            { id: 8, x: 7, y: 40, width: 17, height: 5.8, page: 1, color: "#f6473b" },
            { id: 10, x: 5, y: 73, width: 18, height: 3, page: 1, color: "#f6473b" },
            { id: 11, x: 5, y: 81, width: 26, height: 5, page: 1, color: "#f6473b" },

            { id: 12, x: 67, y: 52, width: 12, height: 3, page: 1, color: "#513bf6" },
            { id: 13, x: 64, y: 55.1, width: 22, height: 3, page: 1, color: "#513bf6" },
            { id: 14, x: 72, y: 35.1, width: 22, height: 6, page: 1, color: "#513bf6" },
            { id: 15, x: 64.5, y: 41, width: 16, height: 5, page: 1, color: "#513bf6" },
            { id: 16, x: 57, y: 56.5, width: 5, height: 3, page: 1, color: "#513bf6" },
            { id: 17, x: 69, y: 73, width: 20, height: 5, page: 1, color: "#513bf6" },
            { id: 18, x: 62, y: 81, width: 26, height: 5, page: 1, color: "#513bf6" },

            // { id: 3, x: 8, y: 17, width: 38, height: 4.5, page: 1, color: "#22c55e" },
            // { id: 4, x: 52, y: 17, width: 38, height: 4.5, page: 1, color: "#3b82f6" },
            // { id: 5, x: 8, y: 24, width: 38, height: 4.5, page: 1, color: "#22c55e" },
            // { id: 6, x: 52, y: 24, width: 38, height: 4.5, page: 1, color: "#3b82f6" },
            // { id: 7, x: 8, y: 31, width: 38, height: 4.5, page: 1, color: "#22c55e" },
            // { id: 8, x: 52, y: 31, width: 38, height: 4.5, page: 1, color: "#3b82f6" },
            // { id: 9, x: 8, y: 38, width: 38, height: 4.5, page: 1, color: "#22c55e" },
            // { id: 10, x: 52, y: 38, width: 38, height: 4.5, page: 1, color: "#3b82f6" },
            // { id: 11, x: 8, y: 45, width: 38, height: 4.5, page: 1, color: "#22c55e" },
            // { id: 12, x: 52, y: 45, width: 38, height: 4.5, page: 1, color: "#3b82f6" },
            // { id: 13, x: 8, y: 52, width: 38, height: 4.5, page: 1, color: "#22c55e" },
            // { id: 14, x: 52, y: 52, width: 38, height: 4.5, page: 1, color: "#3b82f6" },
            // { id: 15, x: 8, y: 59, width: 38, height: 4.5, page: 1, color: "#22c55e" },
            // { id: 16, x: 52, y: 59, width: 38, height: 4.5, page: 1, color: "#3b82f6" },
        ],
    },
    
];
