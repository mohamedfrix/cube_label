import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
}

export default function StatCard({ title, value }: StatCardProps) {
    return (
        <div className="bg-white border border-border rounded-xl p-[22px] shadow-sm flex flex-col justify-center h-[110px]">
            <h3 className="text-[14px] font-medium text-foreground mb-1.5">{title}</h3>
            <p className="text-[32px] font-bold text-primary">{value}</p>
        </div>
    );
}
