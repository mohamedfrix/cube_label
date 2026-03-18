"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
}

export default function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)); // Start at March 2026

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);

    const days = [];

    // Previous month days
    for (let i = 0; i < firstDay; i++) {
        days.push({
            day: (prevMonthDays - firstDay + i + 1).toString(),
            date: new Date(year, month - 1, prevMonthDays - firstDay + i + 1),
            isCurrentMonth: false
        });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            day: i.toString(),
            date: new Date(year, month, i),
            isCurrentMonth: true
        });
    }

    // Next month days to fill 5 rows (35 days) total
    const remainingDays = 35 - days.length;
    if (remainingDays > 0) {
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                day: i.toString(),
                date: new Date(year, month + 1, i),
                isCurrentMonth: false
            });
        }
    }

    const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));
    const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));

    const isSameDate = (d1: Date | null, d2: Date) => {
        if (!d1) return false;
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="bg-white border text-sm border-border rounded-xl p-5 shadow-sm w-full font-sans">
            <div className="flex justify-between items-center mb-6 px-2.5">
                <button
                    onClick={prevMonth}
                    className="p-1 border border-border rounded-[4px] hover:bg-gray-50 text-muted-foreground cursor-pointer flex items-center justify-center bg-white shadow-sm"
                >
                    <ChevronLeft size={16} strokeWidth={2} className="text-gray-400" />
                </button>
                <div className="font-bold text-primary text-[15px]">
                    {monthNames[month]} {year}
                </div>
                <button
                    onClick={nextMonth}
                    className="p-1 border border-border rounded-[4px] hover:bg-gray-50 text-muted-foreground cursor-pointer flex items-center justify-center bg-white shadow-sm"
                >
                    <ChevronRight size={16} strokeWidth={2} className="text-gray-400" />
                </button>
            </div>

            <div className="grid grid-cols-7 mb-4">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-center text-[12px] text-[#52525B] font-medium">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-y-3 gap-x-1">
                {days.map((dayObj, i) => {
                    const isSelected = isSameDate(selectedDate, dayObj.date);
                    const isSpecial = dayObj.isCurrentMonth && dayObj.day === '22';
                    const isCurrent = dayObj.isCurrentMonth;

                    let className = "flex items-center justify-center w-8 h-8 rounded-md mx-auto text-[13px] ";

                    if (isSelected) {
                        className += "bg-primary text-white font-medium";
                    } else if (isSpecial) {
                        className += "bg-[#E2E8F0] text-primary font-medium";
                    } else if (isCurrent) {
                        className += "text-primary hover:bg-blue-50 cursor-pointer";
                    } else {
                        className += "text-[#A1A1AA] hover:bg-gray-50 cursor-pointer";
                    }

                    return (
                        <div key={i} className="text-center">
                            <button
                                onClick={() => onSelectDate(dayObj.date)}
                                className={className}
                            >
                                {dayObj.day}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
