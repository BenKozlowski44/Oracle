import { Printer, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BriefButtons({ id }: { id: string }) {
    return (
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.href = `/api/slates/${id}/generate-excel`}>
                <FileDown className="h-4 w-4 mr-2" /> Download Briefing Slate
            </Button>
            <Button onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-2" /> Print / Save PDF
            </Button>
        </div>
    )
}
