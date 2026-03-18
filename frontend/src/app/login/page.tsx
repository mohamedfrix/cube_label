import Image from "next/image"
import sideImage from "../../../public/images/login_side.png"
import { Logo } from "@/components/ui/logo"
import LoginForm from "@/app/login/components/loginForm"

export default function LoginPage() {

    return (
        // 1. Use h-screen to force the layout to exactly viewport height.
        // 2. overflow-hidden prevents any accidental scrolling.
        <div className="w-screen h-screen flex bg-background text-foreground overflow-hidden">

            {/* CRITICAL STEP: The parent div MUST have relative positioning (`relative`). 
              Without `relative`, the `fill` image will escape this div and fill the whole screen!
            */}
            <div className="relative hidden w-1/2 h-full md:block">
                <Image
                    src={sideImage}
                    alt="Side Image"
                    fill // Replaces width/height. Tells image to fill the parent.
                    className="object-cover" // Crops the image perfectly to fit the 1/2 screen div
                    priority // Add this because it's above the fold (visible immediately)
                    sizes="50vw" // Best practice for 'fill' to tell the browser how much space it takes
                />
            </div>

            {/* Right side for your login form */}
            <div className="w-full h-full md:w-1/2 flex flex-col gap-y-8 items-center justify-center p-8">
                <Logo className="w-[200px] sm:w-[250px] md:w-[200px] xl:w-[250px] h-auto" />
                <LoginForm />
            </div>

        </div>
    )
}