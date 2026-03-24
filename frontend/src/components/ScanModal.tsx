'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check, AlertCircle } from 'lucide-react';

export type ModalState = 'IDLE' | 'UPLOADING' | 'READY' | 'PROCESSING' | 'COMPLETE';

interface ScanModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialState?: ModalState; // For temp-modals page
    requireTemplateSelection?: boolean;
    templates?: Array<{
        id: number;
        name: string;
        description: string;
        fieldCount: number;
    }>;
    selectedTemplateId?: number | null;
    onSelectTemplate?: (templateId: number) => void;
    onScanComplete?: (payload: { fileName: string; templateId: number | null }) => void;
}

export default function ScanModal({
    isOpen,
    onClose,
    initialState,
    requireTemplateSelection = false,
    templates = [],
    selectedTemplateId = null,
    onSelectTemplate,
    onScanComplete,
}: ScanModalProps) {
    const router = useRouter();
    const [state, setState] = useState<ModalState>(initialState || 'IDLE');
    const [progress, setProgress] = useState(0);
    const [ocrStep, setOcrStep] = useState(0);
    const [fileName, setFileName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const ocrSteps = [
        "Detecting text regions",
        "Recognizing characters",
        "Detecting tables",
        "Structuring layout"
    ];
    const acceptedMimeTypes = ["application/pdf", "image/jpeg", "image/png"];

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen && !initialState) {
            const resetTimer = window.setTimeout(() => {
                setState('IDLE');
                setFileName('');
                setProgress(0);
                setError(null);
            }, 0);

            return () => window.clearTimeout(resetTimer);
        }
    }, [isOpen, initialState]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (requireTemplateSelection && !selectedTemplateId) {
            setError('Please select an extraction template first.');
            return;
        }

        if (!acceptedMimeTypes.includes(file.type)) {
            setError('Only PDF, JPG, JPEG, and PNG files are allowed.');
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            setError('File size must be less than 20MB.');
            return;
        }

        setError(null);
        setFileName(file.name);
        handleStartUpload();
    };

    const handleStartUpload = () => {
        setState('UPLOADING');
        setProgress(0);
    };

    const handleStartOCR = () => {
        setState('PROCESSING');
        setProgress(0);
        setOcrStep(0);
    };

    useEffect(() => {
        if (initialState) return; // Don't run simulation on temp page

        let interval: NodeJS.Timeout;
        if (state === 'UPLOADING') {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setState('READY');
                        return 100;
                    }
                    return prev + 8; // Faster upload
                });
            }, 80);
        } else if (state === 'PROCESSING') {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setState('COMPLETE');
                        return 100;
                    }
                    const newProgress = prev + 2;
                    if (newProgress < 25) setOcrStep(0);
                    else if (newProgress < 50) setOcrStep(1);
                    else if (newProgress < 75) setOcrStep(2);
                    else setOcrStep(3);
                    return newProgress;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [state, initialState]);

    if (!isOpen) return null;

    const isProcessingLayout = state === 'PROCESSING' || state === 'COMPLETE';
    const modalWidth = isProcessingLayout ? 'w-[min(840px,95vw)]' : 'w-[min(540px,95vw)]';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6">
            <div 
                className={`bg-white rounded-[24px] ${modalWidth} shadow-[0_0_50px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden relative p-10`}
                onClick={(e) => e.stopPropagation()}
            >
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                />

                <div className={isProcessingLayout ? "grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12" : "flex flex-col items-center w-full"}>
                    
                    {/* Left Column / Main Content */}
                    <div className="flex flex-col items-center w-full">
                        
                        {/* Box with dashed border - Explicit height and relative positioning */}
                        <div className={`w-full min-h-[260px] rounded-[20px] border-2 border-dashed flex flex-col items-center justify-center relative transition-all duration-300 ${state === 'IDLE' ? 'border-[#E4E4E7] bg-gray-50/50 hover:bg-gray-100/50' : 'border-[#E4E4E7] bg-blue-50/20'}`}>
                            
                            {/* File Tag (Positioned safely to avoid center icon) */}
                            {fileName && (
                                <div className="absolute top-4 right-4 bg-[#0F172A] text-white py-1.5 px-3 rounded-lg flex items-center gap-2 text-[11px] font-bold shadow-xl animate-in fade-in zoom-in duration-300 z-10">
                                    <div className="w-3.5 h-4.5 bg-blue-600 rounded-sm flex items-center justify-center relative">
                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full border border-[#0F172A] flex items-center justify-center text-[6px] font-black">+</div>
                                    </div>
                                    <span className="truncate max-w-[140px]">{fileName}</span>
                                </div>
                            )}

                            {/* Content based on state */}
                            {state === 'IDLE' && (
                                <div className="w-full max-w-[400px] flex flex-col gap-4 px-2 py-8">
                                    {requireTemplateSelection && (
                                        <div className="rounded-xl border border-[#D4D4D8] bg-white p-3 text-left shadow-sm">
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-[#71717A] mb-2 px-1">
                                                Extraction template
                                            </p>
                                            <div className="grid gap-2 max-h-36 overflow-auto pr-1">
                                                {templates.length === 0 ? (
                                                    <div className="text-xs text-[#71717A] bg-[#FAFAFA] rounded-lg p-3 border border-[#E4E4E7]">
                                                        No templates available. Add one from the Fields Extraction page.
                                                    </div>
                                                ) : (
                                                    templates.map((template) => {
                                                        const active = template.id === selectedTemplateId;
                                                        return (
                                                            <button
                                                                key={template.id}
                                                                type="button"
                                                                onClick={() => {
                                                                    setError(null);
                                                                    onSelectTemplate?.(template.id);
                                                                }}
                                                                className={`w-full text-left rounded-lg border px-3 py-2.5 transition-colors ${
                                                                    active
                                                                        ? 'bg-blue-50 border-[#2563EB]'
                                                                        : 'bg-[#FAFAFA] border-[#E4E4E7] hover:border-[#94A3B8]'
                                                                }`}
                                                            >
                                                                <p className="text-sm font-semibold text-[#09090B] truncate">{template.name}</p>
                                                                <p className="text-xs text-[#71717A] truncate mt-0.5">{template.fieldCount} fields</p>
                                                            </button>
                                                        );
                                                    })
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {requireTemplateSelection && <div className="h-px bg-[#E4E4E7]" />}

                                    <div className="rounded-xl border-2 border-dashed border-[#D4D4D8] bg-white/80 px-6 py-6 text-center">
                                        <div className="w-12 h-16 bg-[#5CC66E] rounded-lg relative overflow-hidden mb-5 shadow-sm mx-auto">
                                            <div className="absolute top-0 right-0 w-4 h-4 bg-white/30 rounded-bl-lg" />
                                        </div>
                                        <p className="text-[#09090B] font-bold text-lg mb-1 leading-tight">
                                            <button
                                                onClick={() => {
                                                    if (requireTemplateSelection && !selectedTemplateId) {
                                                        setError('Please select an extraction template first.');
                                                        return;
                                                    }
                                                    fileInputRef.current?.click();
                                                }}
                                                className="text-[#2563EB] hover:text-blue-700 transition-colors underline underline-offset-4 decoration-2"
                                            >
                                                Click to upload
                                            </button>
                                            <span className="text-[#71717A] ml-2 font-medium">or drag and drop</span>
                                        </p>
                                        <p className="text-[#A1A1AA] text-[11px] font-bold uppercase tracking-wider">Max File Size: 20MB</p>
                                    </div>

                                    {error && (
                                        <div className="flex items-center justify-center gap-1.5 text-red-500 font-bold bg-red-50 py-2 px-4 rounded-lg text-xs animate-in slide-in-from-top-1 duration-300 border border-red-200">
                                            <AlertCircle size={14} />
                                            {error}
                                        </div>
                                    )}
                                </div>
                            )}

                            {(state === 'UPLOADING' || state === 'READY') && (
                                <div className="flex flex-col items-center w-full px-12">
                                    {state === 'UPLOADING' ? (
                                        <div className="w-12 h-16 bg-[#5CC66E] rounded-lg relative overflow-hidden mb-8 shadow-md">
                                            <div className="absolute top-0 right-0 w-4 h-4 bg-white/30 rounded-bl-lg" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 bg-[#F2FFF4] rounded-full flex items-center justify-center mb-8 shadow-inner animate-in zoom-in duration-300">
                                            <div className="w-12 h-12 bg-[#5CC66E] rounded-full flex items-center justify-center text-white shadow-lg">
                                                <Check strokeWidth={4} size={28} />
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="w-full max-w-[320px] bg-gray-100 h-2 rounded-full overflow-hidden mb-6 shadow-inner">
                                        <div 
                                            className="bg-[#5CC66E] h-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(92,198,110,0.4)]"
                                            style={{ width: `${state === 'READY' ? 100 : progress}%` }} 
                                        />
                                    </div>

                                    <p className="text-[#09090B] font-bold text-xl mb-1 tracking-tight">Uploading Document...</p>
                                    <p className="text-[#71717A] text-sm font-semibold opacity-70 italic truncate max-w-[280px]">{fileName}</p>
                                </div>
                            )}

                            {isProcessingLayout && (
                                <div className="flex flex-col items-center w-full px-12">
                                    <div className="w-32 h-20 bg-[#F4F4F5] rounded-xl mb-8 shadow-sm flex items-center justify-center transition-all">
                                        <Loader2 className="animate-spin text-blue-600/30" size={40} strokeWidth={2} />
                                    </div>
                                    
                                    <div className="w-full max-w-[320px] bg-gray-100 h-2 rounded-full overflow-hidden mb-6 shadow-inner">
                                        <div 
                                            className="bg-[#5CC66E] h-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(92,198,110,0.4)]"
                                            style={{ width: `${state === 'COMPLETE' ? 100 : progress}%` }} 
                                        />
                                    </div>

                                    <p className="text-[#09090B] font-bold text-xl mb-1 tracking-tight">Processing OCR...</p>
                                    <p className="text-[#71717A] text-base font-bold opacity-70">
                                        {state === 'COMPLETE' ? 'Done ✅' : ocrSteps[ocrStep]}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer Buttons with balanced sizing */}
                        <div className={`mt-10 flex gap-5 w-full ${isProcessingLayout ? '' : 'justify-center max-w-[420px]'}`}>
                            <button 
                                onClick={onClose}
                                className="flex-1 py-4 px-8 bg-[#F8F9FA] hover:bg-[#E9ECEF] text-[#1E293B] text-base font-bold rounded-xl transition-all active:scale-95 shadow-sm"
                            >
                                {state === 'COMPLETE' ? 'Dashboard' : 'Cancel'}
                            </button>
                            <button 
                                onClick={() => {
                                    if (state === 'COMPLETE') {
                                        onScanComplete?.({ fileName, templateId: selectedTemplateId });
                                        router.push('/documents');
                                        onClose();
                                    } else if (state === 'READY') {
                                        handleStartOCR();
                                    }
                                }}
                                disabled={state === 'UPLOADING' || state === 'IDLE' || state === 'PROCESSING'}
                                className={`flex-1 py-4 px-8 text-base font-bold rounded-xl transition-all shadow-lg active:scale-95 ${
                                    state === 'READY' || state === 'COMPLETE' 
                                        ? 'bg-[#2563EB] text-white hover:bg-blue-700 cursor-pointer shadow-blue-500/20' 
                                        : 'bg-[#CED4DA] text-white cursor-not-allowed'
                                }`}
                            >
                                {state === 'COMPLETE' ? 'View Documents' : state === 'UPLOADING' ? 'Upload file' : 'Start OCR'}
                            </button>
                        </div>
                    </div>

                    {/* Right Column (for Wide Layout) */}
                    {isProcessingLayout && (
                        <div className="flex flex-col justify-center border-l border-dashed border-[#F1F3F5] pl-12 h-full min-h-[320px]">
                            <ul className="space-y-8">
                                {ocrSteps.map((step, idx) => {
                                    const isDone = state === 'COMPLETE' || ocrStep > idx;
                                    const isActive = state === 'PROCESSING' && ocrStep === idx;
                                    
                                    return (
                                        <li key={idx} className="flex items-center gap-5 transition-all duration-500">
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                                                isDone ? 'bg-[#F2FFF4] text-[#5CC66E] shadow-sm' : 
                                                isActive ? 'bg-blue-50 text-[#2563EB] shadow-sm' : 'bg-gray-50 text-gray-200'
                                            }`}>
                                                {isDone ? (
                                                    <Check size={24} strokeWidth={4} />
                                                ) : isActive ? (
                                                    <Loader2 className="animate-spin" size={20} />
                                                ) : (
                                                    <div className="w-4 h-4 border-2 border-gray-100 rounded-sm" />
                                                )}
                                            </div>
                                            <span className={`text-base transition-colors duration-300 ${
                                                isDone || isActive ? 'text-[#09090B] font-bold' : 'text-[#A1A1AA] font-semibold'
                                            }`}>
                                                {step}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
