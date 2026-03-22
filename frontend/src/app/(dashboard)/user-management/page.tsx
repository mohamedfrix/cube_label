"use client";

import StatCard from "../documents/components/StatCard";
import Calendar from '../documents/components/Calendar';
import HistoryTimeline, { TimelineEvent } from '../documents/components/HistoryTimeline';
import { useState } from "react";
import UserCard from "./UserCard";

const EVENTS_DB: Record<string, TimelineEvent[]> = {
    "2026-03-24": [
        {
            time: "9:00",
            event: {
                title: "Online",
                status: "Finished",
                duration: "9:00AM > 10:00AM",
                user: "frix",
            }
        },
        {
            time: "10:00",
            event: {
                title: "Online",
                status: "On Hold",
                duration: "10:00AM > 11:00AM",
                user: "frix",
            }
        },
        {
            time: "11:00",
            event: null
        },
        {
            time: "12:00",
            event: null
        }
    ],
    "2026-03-25": [
        {
            time: "12:00",
            event: {
                title: "Online",
                status: "Finished",
                duration: "12:00PM > 1:00PM",
                user: "alex",
            }
        },
        {
            time: "1:00",
            event: null
        }
    ]
};

const USER_DB : { name: string; phone: string; picture: string }[] = [
    {
        name: "Warda",
        phone: "+1 234 567 890",
        picture: "/images/user-avatar.png"
    },
    {
        name: "Warda",
        phone: "+1 234 567 890",
        picture: "/images/user-avatar.png"
    },
    {
        name: "Warda",
        phone: "+1 234 567 890",
        picture: "/images/user-avatar.png"
    },
    {
        name: "Warda",
        phone: "+1 234 567 890",
        picture: "/images/user-avatar.png"
    },
    {
        name: "Warda",
        phone: "+1 234 567 890",
        picture: "/images/user-avatar.png"
    },
    {
        name: "Warda",
        phone: "+1 234 567 890",
        picture: "/images/user-avatar.png"
    },
    {
        name: "Warda",
        phone: "+1 234 567 890",
        picture: "/images/user-avatar.png"
    },
    {
        name: "Warda",
        phone: "+1 234 567 890",
        picture: "/images/user-avatar.png"
    },
    {
        name: "Warda",
        phone: "+1 234 567 890",
        picture: "/images/user-avatar.png"
    },
    {
        name: "Warda",
        phone: "+1 234 567 890",
        picture: "/images/user-avatar.png"
    },
]


const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};


export default function UserPage() {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 2, 24)); // March 24, 2026
    const dateKey = formatDateKey(selectedDate);
    const dateEvents = EVENTS_DB[dateKey] || [];

    return (
        <>
            <div className="flex flex-col md:flex-row md:justify-between gap-6 p-8 w-full h-full">
                {/* Left Column: Stat Cards */}
                <div className="w-full">
                    <div className="flex-1 flex gap-5 md:flex-row flex-col">
                        <StatCard title="Documents left" value="835" />
                        <StatCard title="In process" value="194" />
                        <StatCard title="Finalized documents" value="1190079" />
                    </div>
                    <div className="w-full mt-8 border-border border rounded-xl p-6">
                        <p className="text-md font-semibold font-inter text-grey-3">User Management</p>
                        <div className="mt-4">
                            {
                                USER_DB.map((user, index) => (
                                    <div key={index} className="mt-1">
                                        <UserCard name={user.name} phone={user.phone} picture={user.picture} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                
    
                {/* Right Column: Calendar & Timeline */}
                <div className="w-full md:w-[360px] flex flex-col gap-6 shrink-0">
                    <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                    <HistoryTimeline events={dateEvents} />
                </div>
            </div>
        </>
    );
}