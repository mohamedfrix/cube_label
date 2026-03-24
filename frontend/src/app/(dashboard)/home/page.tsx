'use client';

import React, { useState, useMemo } from 'react';
import { Users, CreditCard, Calendar } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
    PieChart, Pie, Cell,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
} from 'recharts';

/* ── Configuration & Mock Data ──────────────────────────── */
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface StatItem {
    label: string;
    value: string;
    change: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
}

interface RequestTypeItem {
    name: string;
    value: number;
    color: string;
}

interface UsageTrendItem {
    name: string;
    visits: number;
    gain: number;
}

interface DashboardMonthData {
    stats: StatItem[];
    requestTypes: RequestTypeItem[];
    usageTrend: UsageTrendItem[];
}

const dashboardDataByMonth: Record<string, DashboardMonthData> = {
    'Jan': {
        stats: [
            { label: 'Documents left', value: '235', change: '+12% from last month', icon: Users },
            { label: 'In process', value: '19', change: '+5% from last month', icon: CreditCard },
            { label: 'Finalized documents', value: '77356', change: '+19% from last month', icon: Users },
        ],
        requestTypes: [
            { name: 'Basic', value: 50, color: '#2563EB' },
            { name: 'Detailed', value: 30, color: '#F59E0B' },
            { name: 'Premium', value: 20, color: '#F87171' },
        ],
        usageTrend: [
            { name: 'W1', visits: 10, gain: 15000 },
            { name: 'W2', visits: 15, gain: 20000 },
            { name: 'W3', visits: 12, gain: 18000 },
            { name: 'W4', visits: 20, gain: 30000 },
        ]
    },
    'Mar': {
        stats: [
            { label: 'Documents left', value: '310', change: '+20% from last month', icon: Users },
            { label: 'In process', value: '25', change: '+10% from last month', icon: CreditCard },
            { label: 'Finalized documents', value: '82000', change: '+25% from last month', icon: Users },
        ],
        requestTypes: [
            { name: 'Basic', value: 40, color: '#2563EB' },
            { name: 'Detailed', value: 40, color: '#F59E0B' },
            { name: 'Premium', value: 20, color: '#F87171' },
        ],
        usageTrend: [
            { name: 'W1', visits: 20, gain: 25000 },
            { name: 'W2', visits: 25, gain: 32000 },
            { name: 'W3', visits: 30, gain: 40000 },
            { name: 'W4', visits: 45, gain: 55000 },
        ]
    },
    // Default fallback
    'default': {
        stats: [
            { label: 'Documents left', value: '250', change: '+15.1% from last month', icon: Users },
            { label: 'In process', value: '22', change: '+8.3% from last month', icon: CreditCard },
            { label: 'Finalized documents', value: '80123', change: '+14% from last month', icon: Users },
        ],
        requestTypes: [
            { name: 'Basic', value: 45, color: '#2563EB' },
            { name: 'Detailed', value: 35, color: '#F59E0B' },
            { name: 'Premium', value: 20, color: '#F87171' },
        ],
        usageTrend: [
            { name: 'W1', visits: 15, gain: 20000 },
            { name: 'W2', visits: 18, gain: 24000 },
            { name: 'W3', visits: 22, gain: 28000 },
            { name: 'W4', visits: 25, gain: 35000 },
        ]
    }
};

/* ── Stat Card Component ────────────────────────────────── */
function StatCard({ label, value, change, icon: Icon }: {
    label: string;
    value: string;
    change: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
}) {
    return (
        <div className="bg-white rounded-xl border border-[#E4E4E7] p-5 flex flex-col justify-between min-h-[140px] shadow-sm">
            <div className="flex items-start justify-between">
                <p className="text-sm text-[#09090B] font-semibold">{label}</p>
                <Icon className="text-[#A1A1AA]" size={20} />
            </div>
            <div className="mt-2 text-left">
                <p className="text-3xl font-bold text-[#2563EB]">{value}</p>
                <p className="text-xs text-[#71717A] mt-1 font-medium">{change}</p>
            </div>
        </div>
    );
}

/* ── Pie Legend Component ───────────────────────────────── */
function PieLegend({ data }: { data: RequestTypeItem[] }) {
    return (
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-8 max-w-[300px] mx-auto text-left">
            {data.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                    <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[#71717A] text-xs font-medium w-16">{item.name}</span>
                    <span className="font-bold text-[#09090B] text-xs leading-none">{item.value}%</span>
                </div>
            ))}
        </div>
    );
}

/* ── Dashboard Page ─────────────────────────────────────── */
export default function HomePage() {
    const [selectedMonth, setSelectedMonth] = useState('Mar');

    const data = useMemo(() => {
        return dashboardDataByMonth[selectedMonth] || dashboardDataByMonth['default'];
    }, [selectedMonth]);

    return (
        <div className="px-8 py-8 space-y-8 bg-white min-h-screen font-inter">
            {/* Header with Month Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-4xl font-bold text-[#09090B]">Statistics</h2>
                </div>
                
                <div className="flex items-center gap-2 bg-[#F4F4F5] px-3 py-2 rounded-lg border border-[#E4E4E7] min-w-[180px]">
                    <Calendar size={18} className="text-[#71717A]" />
                    <select 
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="bg-transparent border-none text-sm font-semibold text-[#09090B] focus:ring-0 cursor-pointer w-full"
                    >
                        {months.map(m => (
                            <option key={m} value={m}>{m} 2026</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.stats.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            {/* ── Charts Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Request Types Ratio (Pie) */}
                <div className="lg:col-span-5 bg-white rounded-xl border border-[#E4E4E7] p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <button className="text-[#71717A] hover:text-[#09090B]">
                            <ChevronLeft size={20} strokeWidth={1.5} />
                        </button>
                        <h3 className="text-lg font-bold text-[#09090B]">Request Types</h3>
                        <button className="text-[#71717A] hover:text-[#09090B]">
                            <ChevronRight size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                    <div className="flex justify-center relative">
                        <PieChart width={220} height={220}>
                            <Pie
                                data={data.requestTypes}
                                cx={110}
                                cy={110}
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={0}
                                dataKey="value"
                                stroke="none"
                                startAngle={90}
                                endAngle={450}
                            >
                                {data.requestTypes.map((entry, index: number) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                    <PieLegend data={data.requestTypes} />
                </div>

                {/* Monthly Usage Trend (Line) */}
                <div className="lg:col-span-7 bg-white rounded-xl border border-[#E4E4E7] p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold text-[#09090B]">Monthly Usage</h3>
                        <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                                <span className="text-[#09090B] font-bold text-xs uppercase tracking-wider">Requests</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#09090B]" />
                                <span className="text-[#09090B] font-bold text-xs uppercase tracking-wider">Costs</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={data.usageTrend} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="0" stroke="#F1F1F1" vertical={false} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#71717A', fontSize: 13, fontWeight: 500 }}
                                dy={15}
                            />
                            <YAxis
                                yAxisId="left"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#71717A', fontSize: 13, fontWeight: 500 }}
                                domain={[0, 'auto']}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#71717A', fontSize: 13, fontWeight: 500 }}
                                domain={[0, 'auto']}
                                tickFormatter={(v) => v === 0 ? '0' : `${Math.floor(v / 1000)}K`}
                            />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: '1px solid #E4E4E7', fontSize: '12px' }}
                            />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="visits"
                                name="Requests"
                                stroke="#2563EB"
                                strokeWidth={2.5}
                                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                                animationDuration={1000}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="gain"
                                name="Costs"
                                stroke="#09090B"
                                strokeWidth={2.5}
                                dot={{ fill: '#09090B', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                                animationDuration={1000}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}
