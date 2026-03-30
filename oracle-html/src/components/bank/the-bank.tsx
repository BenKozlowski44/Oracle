import { useState, useEffect } from "react"
import { useSearchParams } from 'react-router-dom'
import { OfficerTable } from "@/components/officers/officer-table"
import { Officer } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BankProps {
    data: Officer[]
}

export function TheBank({ data }: BankProps) {
    // Maintain mutable local state so tab filters re-run after any edit
    const [localOfficers, setLocalOfficers] = useState<Officer[]>(data)

    // Keep in sync if parent refreshes the data prop (e.g., page reload)
    useEffect(() => { setLocalOfficers(data) }, [data])

    // When any officer is saved via the edit dialog, update the local list
    const onOfficerSave = (updated: Officer) => {
        setLocalOfficers(prev => prev.map(o => o.id === updated.id ? updated : o))
    }

    const isFirefighter = (o: Officer) => {
        if (o.status === "Slated" || o.listShift === "Slated") return false;
        if (o.listShift === "CO-SM" || o.screened?.includes("CO-SM")) return false;

        const slate = o.assignedSlate?.toLowerCase() || ""
        const shift = o.listShift || ""
        return shift === "Firefighters" ||
            slate.includes("3rd look") ||
            slate.includes("no command")
    }

    const isDeclined = (o: Officer) => o.status === "Declined" || o.status === "De-screened" || o.listShift === "Declined/Descreened"

    // All filters now run from localOfficers
    const bankOfficers = localOfficers.filter(o => {
        if (isDeclined(o)) return false;
        const shift = o.listShift || ""
        return shift !== "CO-SM" && shift !== "Slated" && shift !== "XO Screened" && o.status !== "PCC" && !isFirefighter(o)
    })
    const slatedOfficers = localOfficers.filter(o => o.listShift === "Slated" && !isDeclined(o))
    const xoScreenedOfficers = localOfficers.filter(o => o.listShift === "XO Screened" && !isDeclined(o))
    const cosmOfficers = localOfficers.filter(o => (o.listShift === "CO-SM") && !isDeclined(o))
    const firefighters = localOfficers.filter(o => isFirefighter(o) && !isDeclined(o))
    const declinedOfficers = localOfficers.filter(o => isDeclined(o))

    const [searchParams] = useSearchParams()

    const [activeTab, setActiveTab] = useState(() => {
        const query = searchParams.get("search")?.toLowerCase()
        if (query) {
            const inFirefighters = firefighters.some(o => o.name.toLowerCase().includes(query))
            if (inFirefighters) return "firefighters"

            const inSlated = slatedOfficers.some(o => o.name.toLowerCase().includes(query))
            if (inSlated) return "slated"

            const inXoScreened = xoScreenedOfficers.some(o => o.name.toLowerCase().includes(query))
            if (inXoScreened) return "xo-screened"

            const inCosm = cosmOfficers.some(o => o.name.toLowerCase().includes(query))
            if (inCosm) return "cosm"

            const inDeclined = declinedOfficers.some(o => o.name.toLowerCase().includes(query))
            if (inDeclined) return "declined"

            return "bank"
        }

        if (bankOfficers.length > 0) return "bank"
        if (firefighters.length > 0) return "firefighters"
        if (slatedOfficers.length > 0) return "slated"
        if (cosmOfficers.length > 0) return "cosm"
        if (declinedOfficers.length > 0) return "declined"
        return "bank"
    })

    useEffect(() => {
        const query = searchParams.get("search")?.toLowerCase()
        if (query) {
            if (firefighters.some(o => o.name.toLowerCase().includes(query))) setActiveTab("firefighters")
            else if (slatedOfficers.some(o => o.name.toLowerCase().includes(query))) setActiveTab("slated")
            else if (xoScreenedOfficers.some(o => o.name.toLowerCase().includes(query))) setActiveTab("xo-screened")
            else if (cosmOfficers.some(o => o.name.toLowerCase().includes(query))) setActiveTab("cosm")
            else if (declinedOfficers.some(o => o.name.toLowerCase().includes(query))) setActiveTab("declined")
            else setActiveTab("bank")
        }
    }, [searchParams, firefighters, slatedOfficers, xoScreenedOfficers, cosmOfficers, declinedOfficers])

    return (
        <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between">
                    <TabsList className="bg-[#07111f] border-b border-[#c9a227]/30 rounded-none w-full justify-start h-auto p-0 gap-0 flex-wrap">
                        <TabsTrigger value="bank" className="text-xs font-semibold tracking-widest uppercase text-[#8a9bb0] hover:text-[#c9a227] data-[state=active]:text-[#c9a227] data-[state=active]:border-b-2 data-[state=active]:border-[#c9a227] data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-4 border-b-2 border-transparent transition-colors duration-150">Officer Bank ({bankOfficers.length})</TabsTrigger>
                        <TabsTrigger value="firefighters" className="text-xs font-semibold tracking-widest uppercase text-[#8a9bb0] hover:text-[#c9a227] data-[state=active]:text-[#c9a227] data-[state=active]:border-b-2 data-[state=active]:border-[#c9a227] data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-4 border-b-2 border-transparent transition-colors duration-150">Firefighters ({firefighters.length})</TabsTrigger>
                        <TabsTrigger value="slated" className="text-xs font-semibold tracking-widest uppercase text-[#8a9bb0] hover:text-[#c9a227] data-[state=active]:text-[#c9a227] data-[state=active]:border-b-2 data-[state=active]:border-[#c9a227] data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-4 border-b-2 border-transparent transition-colors duration-150">Slated ({slatedOfficers.length})</TabsTrigger>
                        <TabsTrigger value="xo-screened" className="text-xs font-semibold tracking-widest uppercase text-[#8a9bb0] hover:text-[#c9a227] data-[state=active]:text-[#c9a227] data-[state=active]:border-b-2 data-[state=active]:border-[#c9a227] data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-4 border-b-2 border-transparent transition-colors duration-150">XO Screened ({xoScreenedOfficers.length})</TabsTrigger>
                        <TabsTrigger value="cosm" className="text-xs font-semibold tracking-widest uppercase text-[#8a9bb0] hover:text-[#c9a227] data-[state=active]:text-[#c9a227] data-[state=active]:border-b-2 data-[state=active]:border-[#c9a227] data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-4 border-b-2 border-transparent transition-colors duration-150">CO-SM ({cosmOfficers.length})</TabsTrigger>
                        <TabsTrigger value="declined" className="text-xs font-semibold tracking-widest uppercase text-[#8a9bb0] hover:text-[#c9a227] data-[state=active]:text-[#c9a227] data-[state=active]:border-b-2 data-[state=active]:border-[#c9a227] data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-4 border-b-2 border-transparent transition-colors duration-150">Declined/Descreened ({declinedOfficers.length})</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="bank" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Active inventory of officers available for slating.
                            </p>
                        </div>
                        <OfficerTable data={bankOfficers} onSave={onOfficerSave} />
                    </div>
                </TabsContent>

                <TabsContent value="firefighters" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Officers designated as Ready Firefighters.
                            </p>
                        </div>
                        <OfficerTable data={firefighters} onSave={onOfficerSave} />
                    </div>
                </TabsContent>

                <TabsContent value="slated" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Officers currently assigned to a slate.
                            </p>
                        </div>
                        <OfficerTable data={slatedOfficers} onSave={onOfficerSave} />
                    </div>
                </TabsContent>

                <TabsContent value="xo-screened" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Officers who screened an XO milestone (XO or XO-SM selects from the annual board).
                            </p>
                        </div>
                        <OfficerTable data={xoScreenedOfficers} onSave={onOfficerSave} />
                    </div>
                </TabsContent>

                <TabsContent value="cosm" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Officers screened for CO-SM.
                            </p>
                        </div>
                        <OfficerTable data={cosmOfficers} onSave={onOfficerSave} />
                    </div>
                </TabsContent>

                <TabsContent value="declined" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Historical inventory of officers who are ineligible for command.
                            </p>
                        </div>
                        <OfficerTable data={declinedOfficers} onSave={onOfficerSave} />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
