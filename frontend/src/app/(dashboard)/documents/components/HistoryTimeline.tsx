import React from 'react';
import Image from 'next/image';

export interface TimelineEvent {
    time: string;
    event: {
        title: string;
        status: string;
        duration: string;
        user: string;
    } | null;
}

interface HistoryTimelineProps {
    events: TimelineEvent[];
}

export default function HistoryTimeline({ events }: HistoryTimelineProps) {
    return (
        <div className="bg-white border text-sm border-border rounded-xl px-6 py-7 shadow-sm flex flex-col w-full min-h-[400px]">
            {events.length === 0 ? (
                <div className="text-muted text-center py-10 flex-1 flex items-center justify-center">No history for this day</div>
            ) : (
                events.map((slot, idx) => (
                    <div key={idx} className="flex relative">
                        {/* Timeline Line/Dot */}
                        <div className="flex flex-col items-center w-4 shrink-0 mr-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary z-10 shrink-0 mt-0.5"></div>
                            {idx !== events.length - 1 && (
                                <div className="w-[1px] bg-[#E4E4E7] flex-1 my-1 min-h-[80px]"></div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6 -mt-0.5">
                            <div className="text-[14px] text-[#A1A1AA] font-normal leading-none mb-3.5">
                                {slot.time}
                            </div>
                            {slot.event && (
                                <div className="border border-border rounded-xl p-[18px] bg-white shadow-sm flex flex-col gap-1.5 ml-2 relative">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <span className="font-bold text-[#3F3F46] text-[15px]">{slot.event.title}</span>
                                        <div className={`text-[12px] px-2 py-0.5 rounded-[4px] border font-medium ${slot.event.status === 'Finished'
                                                ? 'border-[#22C55E] text-[#3F3F46]'
                                                : 'border-[#EF4444] text-[#3F3F46]'
                                            }`}>
                                            {slot.event.status}
                                        </div>
                                    </div>
                                    <div className="text-[13px] text-[#A1A1AA] font-medium mb-3">{slot.event.duration}</div>
                                    <div className="flex items-center gap-2.5 mt-1">
                                        <div className="w-[26px] h-[26px] rounded-full overflow-hidden relative shrink-0">
                                            <Image
                                                src="/images/profile_picture_2.png"
                                                alt={slot.event.user}
                                                width={26}
                                                height={26}
                                                className="object-cover w-full h-full"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23fff' font-family='sans-serif' font-size='12'%3EF%3C/text%3E%3C/svg%3E";
                                                }}
                                            />
                                        </div>
                                        <span className="text-[14px] font-semibold text-[#18181B]">{slot.event.user}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
