import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Scan } from "lucide-react"
import ProfileInfos from "./components/ProfileInfos"

export default function Profile() {

    return (
        <div className="px-8 mt-6 w-full">
            <p className="text-foreground font-semibold font-inter text-[32px]">Profile & Settings</p>
            <Tabs defaultValue="profile" className="w-[300px]">
                <TabsList className="w-full rounded-xl grid grid-cols-2 items-center p-1 mt-2 h-auto">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="w-full flex items-center justify-between max-w-[550px] mt-10">
                <div className="flex item-center gap-x-2">
                    <User className="text-foreground mb-1" size={24}/>
                    <p className="text-foreground font-semibold font-inter text-xl" >Informations Personnelles</p>
                </div>
                <div className="flex items-center gap-x-2 cursor-pointer bg-primary p-3 rounded-[10px]">
                    <Scan className="text-white" size={18}/>
                    <p className="text-white font-medium font-inter text-sm" >Save</p>
                </div>
            </div>

            <ProfileInfos />
        </div>
    )
}