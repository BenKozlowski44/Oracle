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
        // Filter out officers who are no longer actively seeking choices
        const activeOfficers = officers.filter(
            o => !["Slated", "PCC", "Declined", "No Opportunity"].includes(o.status)
        )

        // Group Officers
        const cosmOfficers = activeOfficers.filter(o => o.screened?.includes("CO-SM") || o.listShift === "CO-SM")
        const standardOfficers = activeOfficers.filter(o => !(o.screened?.includes("CO-SM") || o.listShift === "CO-SM"))

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

        const totalStandardWithPriority = locPriority + platPriority + doesntMatter
        const priorityData = [
            { name: "Location", value: locPriority, color: "#3b82f6", pct: totalStandardWithPriority ? Math.round((locPriority / totalStandardWithPriority) * 100) : 0 },
            { name: "Platform", value: platPriority, color: "#ef4444", pct: totalStandardWithPriority ? Math.round((platPriority / totalStandardWithPriority) * 100) : 0 },
            { name: "Doesn't Matter", value: doesntMatter, color: "#6b7280", pct: totalStandardWithPriority ? Math.round((doesntMatter / totalStandardWithPriority) * 100) : 0 }
        ].filter(d => d.value > 0)

        const totalLocationVotes = Object.values(locationCounts).reduce((sum, count) => sum + count, 0)
        const topLocations = Object.entries(locationCounts)
            .map(([name, count]) => ({ name, count, pct: totalLocationVotes ? Math.round((count / totalLocationVotes) * 100) : 0 }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)

        const totalPlatformVotes = Object.values(platformCounts).reduce((sum, count) => sum + count, 0)
        const topPlatforms = Object.entries(platformCounts)
            .map(([name, count]) => ({ name, count, pct: totalPlatformVotes ? Math.round((count / totalPlatformVotes) * 100) : 0 }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)


        // --- CO-SM METRICS ---

        const top3ChoiceCounts: Record<string, { total: number, rank1: number, rank2: number, rank3: number }> = {}
        const allChoiceCounts: Record<string, number> = {}

        cosmOfficers.forEach(o => {
            if (o.cosmPreferences && o.cosmPreferences.length > 0) {
                // Top 3 Ranks
                const p1 = o.cosmPreferences[0]?.trim()
                const p2 = o.cosmPreferences[1]?.trim()
                const p3 = o.cosmPreferences[2]?.trim()

                if (p1) {
                    if (!top3ChoiceCounts[p1]) top3ChoiceCounts[p1] = { total: 0, rank1: 0, rank2: 0, rank3: 0 }
                    top3ChoiceCounts[p1].rank1++
                    top3ChoiceCounts[p1].total++
                }
                if (p2) {
                    if (!top3ChoiceCounts[p2]) top3ChoiceCounts[p2] = { total: 0, rank1: 0, rank2: 0, rank3: 0 }
                    top3ChoiceCounts[p2].rank2++
                    top3ChoiceCounts[p2].total++
                }
                if (p3) {
                    if (!top3ChoiceCounts[p3]) top3ChoiceCounts[p3] = { total: 0, rank1: 0, rank2: 0, rank3: 0 }
                    top3ChoiceCounts[p3].rank3++
                    top3ChoiceCounts[p3].total++
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

        // Count how many CO-SM actually submitted a preferences list so the % is accurate
        const votingCosmCount = cosmOfficers.filter(o => o.cosmPreferences && o.cosmPreferences.length > 0).length

        const top3Choices = Object.entries(top3ChoiceCounts)
            .map(([name, counts]) => ({ name, ...counts, pct: votingCosmCount ? Math.round((counts.total / votingCosmCount) * 100) : 0 }))
            .sort((a, b) => b.total - a.total)
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
            top3Choices,
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
                                    label={({ value, payload }) => `${value} (${payload.pct}%)`}
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
                                    <LabelList
                                        content={(props: any) => {
                                            const { x, y, width, height, value, index } = props
                                            const item = data.topLocations[index]
                                            return (
                                                <text
                                                    x={x + width + 5}
                                                    y={y + height / 2}
                                                    dy={4}
                                                    fill="#6b7280"
                                                    fontSize={11}
                                                    textAnchor="start"
                                                >
                                                    {`${value} (${item?.pct || 0}%)`}
                                                </text>
                                            )
                                        }}
                                    />
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
                                    <LabelList
                                        content={(props: any) => {
                                            const { x, y, width, value, index } = props
                                            const item = data.topPlatforms[index]
                                            return (
                                                <text
                                                    x={x + width / 2}
                                                    y={y - 5}
                                                    fill="#6b7280"
                                                    fontSize={11}
                                                    textAnchor="middle"
                                                >
                                                    {`${value} (${item?.pct || 0}%)`}
                                                </text>
                                            )
                                        }}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* CO-SM Row */}
            <div className="grid gap-6">
                <div className="col-span-full border-b pb-2 pt-6">
                    <h2 className="text-2xl font-bold tracking-tight">CO-SM Priorities</h2>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="font-semibold mb-4 text-center">Top 3 Command Preferences</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.top3Choices} layout="vertical" margin={{ left: 80, right: 30, top: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" allowDecimals={false} />
                                <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11 }} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Legend />
                                <Bar dataKey="rank1" name="#1 Choice" stackId="a" fill="#22c55e" />
                                <Bar dataKey="rank2" name="#2 Choice" stackId="a" fill="#eab308" />
                                <Bar dataKey="rank3" name="#3 Choice" stackId="a" fill="#f97316" radius={[0, 4, 4, 0]}>
                                    <LabelList
                                        content={(props: any) => {
                                            const { x, y, width, height, value, index } = props
                                            const item = data.top3Choices[index]
                                            return (
                                                <text
                                                    x={x + width + 5}
                                                    y={y + height / 2}
                                                    dy={4}
                                                    fill="#6b7280"
                                                    fontSize={11}
                                                    textAnchor="start"
                                                >
                                                    {`${value} (${item?.pct || 0}%)`}
                                                </text>
                                            )
                                        }}
                                    />
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
