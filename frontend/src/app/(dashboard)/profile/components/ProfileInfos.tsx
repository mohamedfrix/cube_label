'use client';

import { Input } from "@/components/ui/input";
import ProfilePicture from "./ProfilePicture";
import { useState } from "react";

interface ProfileData {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phoneNumber: string;
}

const profileData: ProfileData = {
    firstName: "Mounir",
    lastName: "Ouazzi",
    gender: "Homme",
    email: "mounirouazzi8@gmail.com",
    phoneNumber: "0540337150"
}

export default function ProfileInfos() {

    const [profile, setProfile] = useState<ProfileData>(profileData);

    return (
        <>
            <div className="w-[550px] border border-border rounded-xl mt-8 p-6 flex flex-col">
                <ProfilePicture src="/images/profile_picture.jpg" alt="profile picture" size={140} />
                <ProfileForm profile={profile} setProfile={setProfile} />
            </div>
        </>
    );
}

function ProfileForm({ profile, setProfile }: { profile: ProfileData, setProfile: React.Dispatch<React.SetStateAction<ProfileData>> }) {
    return (
        <>
            <label className="font-inter font-medium text-foreground text-sm mt-4">Nom</label>
            <Input value={profile.lastName} className="text-muted mt-2" onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />

            <label className="font-inter font-medium text-foreground text-sm mt-4">Prenom</label>
            <Input value={profile.firstName} className="text-muted mt-2" onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />

            <label className="font-inter font-medium text-foreground text-sm mt-4">Genre</label>
            <Input value={profile.gender} className="text-muted mt-2" onChange={(e) => setProfile({ ...profile, gender: e.target.value })} />

            <label className="font-inter font-medium text-foreground text-sm mt-4">Email</label>
            <Input value={profile.email} className="text-muted mt-2" onChange={(e) => setProfile({ ...profile, email: e.target.value })} />

            <label className="font-inter font-medium text-foreground text-sm mt-4">Phone Number</label>
            <Input value={profile.phoneNumber} className="text-muted mt-2" onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })} />
        </>
    );
}