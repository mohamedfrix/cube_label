import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExamplesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="mx-auto max-w-4xl space-y-12">
                <div>
                    <h1 className="text-3xl font-bold mb-4">Design System Implementation</h1>
                    <p className="text-muted text-base">Examples showcasing the extracted Figma tokens.</p>
                </div>

                <section className="space-y-6">
                    <h2 className="text-xl font-semibold border-b border-border pb-2">Segmented Control (Tabs)</h2>
                    <div className="p-8 bg-surface rounded-xl border border-border shadow-sm">
                        <Tabs defaultValue="agent" className="w-[400px]">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="agent">Agent</TabsTrigger>
                                <TabsTrigger value="supervisor">Supervisor</TabsTrigger>
                            </TabsList>
                            <TabsContent value="agent" className="p-4 mt-4 bg-background rounded-lg border border-border text-sm">
                                Agent settings and configuration go here.
                            </TabsContent>
                            <TabsContent value="supervisor" className="p-4 mt-4 bg-background rounded-lg border border-border text-sm">
                                Supervisor controls and logs go here.
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-xl font-semibold border-b border-border pb-2">Buttons</h2>
                    <div className="flex flex-wrap gap-4 items-center p-8 bg-surface rounded-xl border border-border shadow-sm">
                        <Button variant="default">Default Button</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="link">Link Button</Button>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-xl font-semibold border-b border-border pb-2">Input Fields</h2>
                    <div className="p-8 bg-surface-alt rounded-xl border border-border space-y-6 shadow-sm">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <Input type="email" placeholder="john.doe@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input type="password" placeholder="••••••••" />
                        </div>
                        <Button className="w-full">Sign In</Button>
                    </div>
                </section>
            </div>
        </div>
    )
}