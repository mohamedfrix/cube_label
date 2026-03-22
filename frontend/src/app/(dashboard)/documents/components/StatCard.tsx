import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
}

export default function StatCard({ title, value }: StatCardProps) {
    return (
        <div className="bg-white border border-border rounded-xl p-[22px] shadow-sm flex flex-col justify-center h-[120px] w-full">
            <h3 className="text-md font-inter font-semibold text-foreground mb-1.5">{title}</h3>
            <p className="text-[36px] font-inter font-bold text-primary">{value}</p>
        </div>
    );
}
