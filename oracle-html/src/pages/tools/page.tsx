import { Metadata } from "next"
import { O6TimingTool } from "@/components/tools/o6-timing-tool"
import { PageHeader } from '@/components/PageHeader'

export const metadata: Metadata = {
    title: "Tools | Command Center",
    description: "Utility tools and advanced features for the Oracle dataset.",
}

export default function ToolsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <PageHeader
                label="PERS-41 · Oracle"
                title="Tools"
                description="Utility tools and advanced features."
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                <O6TimingTool />
            </div>
        </div>
    )
}
