import { Officer } from "@/lib/types"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface RankChartProps {
    officers: Officer[]
}

export function RankChart({ officers }: RankChartProps) {
    const data = [
        {
            name: "LCDR",
            total: officers.filter(o => o.rank === "LCDR").length,
        },
        {
            name: "CDR",
            total: officers.filter(o => o.rank === "CDR").length,
        },
        {
            name: "CAPT",
            total: officers.filter(o => o.rank === "CAPT").length,
        },
    ]

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
