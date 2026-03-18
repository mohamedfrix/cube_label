"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface ProfilePictureProps {
    src?: string;
    alt?: string;
    size?: number;
}

export default function ProfilePicture({ src, alt = "Profile picture", size = 100 }: ProfilePictureProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // TODO: handle file upload
            console.log("Selected file:", file.name);
        }
    };

    return (
        <div className="relative" style={{ width: size, height: size }}>
            {/* Avatar circle */}
            <div
                className="relative rounded-full overflow-hidden border-2 border-border w-full h-full bg-card"
            >
                {src ? (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="w-full h-full bg-card flex items-center justify-center text-grey-3 text-2xl font-semibold">
                        ?
                    </div>
                )}
            </div>

            {/* Edit button overlay */}
            <button
                onClick={handleEditClick}
                className="absolute -bottom-1 right-2 bg-white border border-border rounded-full p-1.5 shadow-md cursor-pointer hover:bg-card transition-colors"
            >
                <Pencil className="text-grey-3" size={18} />
            </button>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}