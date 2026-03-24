'use client';

import React from 'react';
import ScanModal from '@/components/ScanModal';

export default function TempModalsPage() {
    return (
        <div className="p-10 space-y-20 bg-gray-100 min-h-screen pb-40">
            <h1 className="text-3xl font-bold mb-10">Scan Modal States Validation</h1>
            
            <div className="space-y-40">
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-500">1. IDLE State</h2>
                    <div className="relative h-[400px] border rounded-xl bg-white/50 overflow-hidden flex items-center justify-center">
                        <ScanModal isOpen={true} onClose={() => {}} initialState="IDLE" />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-500">2. UPLOADING State</h2>
                    <div className="relative h-[400px] border rounded-xl bg-white/50 overflow-hidden flex items-center justify-center">
                        <ScanModal isOpen={true} onClose={() => {}} initialState="UPLOADING" />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-500">3. READY State</h2>
                    <div className="relative h-[400px] border rounded-xl bg-white/50 overflow-hidden flex items-center justify-center">
                        <ScanModal isOpen={true} onClose={() => {}} initialState="READY" />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-500">4. PROCESSING State (Wide)</h2>
                    <div className="relative h-[500px] border rounded-xl bg-white/50 overflow-hidden flex items-center justify-center">
                        <ScanModal isOpen={true} onClose={() => {}} initialState="PROCESSING" />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-500">5. COMPLETE State (Wide)</h2>
                    <div className="relative h-[500px] border rounded-xl bg-white/50 overflow-hidden flex items-center justify-center">
                        <ScanModal isOpen={true} onClose={() => {}} initialState="COMPLETE" />
                    </div>
                </section>
            </div>
        </div>
    );
}
