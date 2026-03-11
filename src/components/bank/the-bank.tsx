"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { OfficerTable } from "@/components/officers/officer-table"
import { Officer } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { isFirefighter } from "@/lib/officer-utils"

interface BankProps {
    data: Officer[]
}

export function TheBank({ data }: BankProps) {
    const isDeclined = (o: Officer) => o.status === "Declined" || o.status === "No Opportunity" || o.status === "De-screened" || o.listShift === "Declined/Descreened"

    const bankOfficers = data.filter(o => {
        if (isDeclined(o)) return false;
        const shift = o.listShift || ""
        return shift !== "CO-SM" && shift !== "Slated" && shift !== "XO Screened" && o.status !== "PCC" && !isFirefighter(o)
    })
    const slatedOfficers = data.filter(o => o.listShift === "Slated" && !isDeclined(o))
    const xoScreenedOfficers = data.filter(o => o.listShift === "XO Screened" && !isDeclined(o))
    const cosmOfficers = data.filter(o => (o.listShift === "CO-SM") && !isDeclined(o))
    const firefighters = data.filter(o => isFirefighter(o) && !isDeclined(o))
    const declinedOfficers = data.filter(o => isDeclined(o))

    const searchParams = useSearchParams()

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

            // Default to bank if found there or not found at all
            return "bank"
        }

        if (bankOfficers.length > 0) return "bank"
        if (firefighters.length > 0) return "firefighters"
        if (slatedOfficers.length > 0) return "slated"
        if (cosmOfficers.length > 0) return "cosm"
        if (declinedOfficers.length > 0) return "declined"
        return "bank"
    })

    // Listen for URL changes if navigating from within the page
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
                    <TabsList>
                        <TabsTrigger value="bank">Officer Bank ({bankOfficers.length})</TabsTrigger>
                        <TabsTrigger value="firefighters">Firefighters ({firefighters.length})</TabsTrigger>
                        <TabsTrigger value="slated">Slated ({slatedOfficers.length})</TabsTrigger>
                        <TabsTrigger value="xo-screened">XO Screened ({xoScreenedOfficers.length})</TabsTrigger>
                        <TabsTrigger value="cosm">CO-SM ({cosmOfficers.length})</TabsTrigger>
                        <TabsTrigger value="declined">Declined/Descreened ({declinedOfficers.length})</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="bank" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Active inventory of officers available for slating.
                            </p>
                        </div>
                        <OfficerTable data={bankOfficers} />
                    </div>
                </TabsContent>

                <TabsContent value="firefighters" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Officers designated as Ready Firefighters.
                            </p>
                        </div>
                        <OfficerTable data={firefighters} />
                    </div>
                </TabsContent>

                <TabsContent value="slated" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Officers currently assigned to a slate.
                            </p>
                        </div>
                        <OfficerTable data={slatedOfficers} />
                    </div>
                </TabsContent>

                <TabsContent value="xo-screened" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Officers who screened an XO milestone (XO or XO-SM selects from the annual board).
                            </p>
                        </div>
                        <OfficerTable data={xoScreenedOfficers} />
                    </div>
                </TabsContent>

                <TabsContent value="cosm" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Officers screened for CO-SM.
                            </p>
                        </div>
                        <OfficerTable data={cosmOfficers} />
                    </div>
                </TabsContent>

                <TabsContent value="declined" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Historical inventory of officers who are ineligible for command.
                            </p>
                        </div>
                        <OfficerTable data={declinedOfficers} />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
