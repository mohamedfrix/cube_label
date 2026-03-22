import Image from "next/image";

type UserCardProps = {
    name: string;
    phone: string;
    picture: string;
}

export default function UserCard({ name, phone, picture }: UserCardProps) {
    return (
        <div className="w-full flex justify-between p-2">
            <div className="flex items-center gap-x-2">
                <Image src={picture} alt={name} width={60} height={60} />
                <div className="flex flex-col gap-y-1">
                    <p className="font-medium font-inter text-sm text-foreground">{name}</p>
                    <p className="font-medium font-inter text-sm text-muted-foreground">{phone}</p>
                </div>
            </div>
            <p className="text-muted font-medium font-inter text-sm">INFO</p>

        </div>
    )
}