"use client"

import { useMemo } from "react"
import { Officer } from "@/lib/types"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    LabelList
} from "recharts"

interface PreferenceSummaryReportProps {
    officers: Officer[]
}

export function PreferenceSummaryReport({ officers }: PreferenceSummaryReportProps) {
    const data = useMemo(() => {
        // Group Officers
        const cosmOfficers = officers.filter(o => o.screened?.includes("CO-SM") || o.listShift === "CO-SM")
        const standardOfficers = officers.filter(o => !(o.screened?.includes("CO-SM") || o.listShift === "CO-SM"))

        // --- STANDARD METRICS ---

        // Priority Split
        let locPriority = 0
        let platPriority = 0
        let doesntMatter = 0

        // Locations & Platforms
        const locationCounts: Record<string, number> = {}
        const platformCounts: Record<string, number> = {}

        standardOfficers.forEach(o => {
            if (o.preferencePriority) {
                const lp = o.preferencePriority.toLowerCase()
                if (lp.includes("location") || lp.includes("homeport")) locPriority++
                else if (lp.includes("platform")) platPriority++
                else doesntMatter++
            }

            const firstLoc = o.preferredLocations?.[0]?.trim()
            if (firstLoc) locationCounts[firstLoc] = (locationCounts[firstLoc] || 0) + 1

            const firstPlat = o.preferredPlatforms?.[0]?.trim()
            if (firstPlat) platformCounts[firstPlat] = (platformCounts[firstPlat] || 0) + 1
        })

        const priorityData = [
            { name: "Location", value: locPriority, color: "#3b82f6" },
            { name: "Platform", value: platPriority, color: "#ef4444" },
            { name: "Doesn't Matter", value: doesntMatter, color: "#6b7280" }
        ].filter(d => d.value > 0)

        const topLocations = Object.entries(locationCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)

        const topPlatforms = Object.entries(platformCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)


        // --- CO-SM METRICS ---

        const firstChoiceCounts: Record<string, number> = {}
        const allChoiceCounts: Record<string, number> = {}

        cosmOfficers.forEach(o => {
            if (o.cosmPreferences && o.cosmPreferences.length > 0) {
                // Rank 1
                const firstChoice = o.cosmPreferences[0]?.trim()
                if (firstChoice) {
                    firstChoiceCounts[firstChoice] = (firstChoiceCounts[firstChoice] || 0) + 1
                }

                // All 15 Ranks
                o.cosmPreferences.forEach(pref => {
                    const cleanPref = pref?.trim()
                    if (cleanPref) {
                        allChoiceCounts[cleanPref] = (allChoiceCounts[cleanPref] || 0) + 1
                    }
                })
            }
        })

        const topFirstChoices = Object.entries(firstChoiceCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)

        const topAllChoices = Object.entries(allChoiceCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)

        return {
            totalOfficers: officers.length,
            standardOfficersCount: standardOfficers.length,
            priorityData,
            topLocations,
            topPlatforms,
            topFirstChoices,
            topAllChoices
        }
    }, [officers])

    return (
        <div className="space-y-8">
            <div className="print:hidden">
                <h1 className="text-3xl font-bold tracking-tight">Preferences Summary</h1>
                <p className="text-muted-foreground">
                    Aggregated analysis of locations, platforms, and CO-SM command rankings.
                </p>
            </div>

            {/* Standard Bank Top Row */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-full border-b pb-2">
                    <h2 className="text-2xl font-bold tracking-tight">Standard Bank & Firefighters</h2>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="font-semibold mb-4 text-center">Priority Breakdown</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.priorityData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ value }) => value}
                                >
                                    {data.priorityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow p-6 lg:col-span-2">
                    <h3 className="font-semibold mb-4 text-center">Top 10 #1 Location Choices</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.topLocations} layout="vertical" margin={{ left: 50, right: 30, top: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" allowDecimals={false} />
                                <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                                    <LabelList dataKey="count" position="right" fontSize={11} fill="#6b7280" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow p-6 col-span-full">
                    <h3 className="font-semibold mb-4 text-center">Top 10 #1 Platform Choices</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.topPlatforms}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={60}>
                                    <LabelList dataKey="count" position="top" fontSize={11} fill="#6b7280" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* CO-SM Row */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="col-span-full border-b pb-2 pt-6">
                    <h2 className="text-2xl font-bold tracking-tight">CO-SM Priorities</h2>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="font-semibold mb-4 text-center">#1 Ranked Command (Top 10)</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.topFirstChoices} layout="vertical" margin={{ left: 80, right: 30, top: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" allowDecimals={false} />
                                <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11 }} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]}>
                                    <LabelList dataKey="count" position="right" fontSize={11} fill="#6b7280" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="font-semibold mb-4 text-center">Most Frequently Ranked in Top 15</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.topAllChoices} layout="vertical" margin={{ left: 80, right: 30, top: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" allowDecimals={false} />
                                <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11 }} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]}>
                                    <LabelList dataKey="count" position="right" fontSize={11} fill="#6b7280" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Blank Print Spacer */}
            <div className="h-10 print:hidden" />
        </div>
    )
}
