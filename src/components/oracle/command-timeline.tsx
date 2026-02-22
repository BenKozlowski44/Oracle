"use client"

import { OracleCommand } from "@/lib/types"
import { format, parseISO, isValid } from "date-fns"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

interface CommandTimelineProps {
    command: OracleCommand
    editable?: boolean
    onDateChange?: (role: 'currentCO' | 'currentXO' | 'inboundXO' | 'slatedXO', field: 'i' | 'k' | 'm' | 'q', value: string) => void
}

export function CommandTimeline({ command, editable = false, onDateChange }: CommandTimelineProps) {
    if (!command) return null

    const formatDate = (dateStr?: string | null) => {
        if (!dateStr) return '-'
        const date = parseISO(dateStr)
        // Format as MMMYY (e.g. MAR27)
        return isValid(date) ? format(date, 'MMMyy').toUpperCase() : dateStr
    }

    const renderCell = (role: 'currentCO' | 'currentXO' | 'inboundXO' | 'slatedXO', field: 'i' | 'k' | 'm' | 'q', value?: string | null) => {
        // Prepare display value: try to format as MMMYY, otherwise show raw
        const displayValue = formatDate(value);

        if (editable && onDateChange) {
            return (
                <div className="flex justify-center">
                    <Input
                        type="text"
                        className="h-8 w-32 text-xs text-center font-mono uppercase"
                        placeholder="MMMYY"
                        value={displayValue || ''}
                        onChange={(e) => onDateChange(role, field, e.target.value)}
                    />
                </div>
            )
        }
        return displayValue
    }

    return (
        <div className="w-full mt-4 space-y-4 border rounded-md p-4 bg-white/50">
            <h4 className="text-sm font-medium text-slate-700">Timeline Data {editable && "(Editable)"}</h4>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Role</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">XO REPORT</TableHead>
                        <TableHead className="text-center">XO TURNOVER</TableHead>
                        <TableHead className="text-center">COC</TableHead>
                        <TableHead className="text-center">CO TURNOVER</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* Current CO */}
                    <TableRow>
                        <TableCell className="font-medium text-slate-500">CO</TableCell>
                        <TableCell className="font-medium">{command.currentCO.name}</TableCell>
                        <TableCell className="text-center font-mono text-xs">{renderCell('currentCO', 'i', command.currentCO.timelineData?.i)}</TableCell>
                        <TableCell className="text-center font-mono text-xs">{renderCell('currentCO', 'k', command.currentCO.timelineData?.k)}</TableCell>
                        <TableCell className="text-center font-mono text-xs">{renderCell('currentCO', 'm', command.currentCO.timelineData?.m)}</TableCell>
                        <TableCell className="text-center font-mono text-xs">{renderCell('currentCO', 'q', command.currentCO.timelineData?.q)}</TableCell>
                    </TableRow>

                    {/* Current XO */}
                    <TableRow>
                        <TableCell className="font-medium text-slate-500">XO</TableCell>
                        <TableCell className="font-medium">{command.currentXO.name}</TableCell>
                        <TableCell className="text-center font-mono text-xs">{renderCell('currentXO', 'i', command.currentXO.timelineData?.i)}</TableCell>
                        <TableCell className="text-center font-mono text-xs">{renderCell('currentXO', 'k', command.currentXO.timelineData?.k)}</TableCell>
                        <TableCell className="text-center font-mono text-xs">{renderCell('currentXO', 'm', command.currentXO.timelineData?.m)}</TableCell>
                        <TableCell className="text-center font-mono text-xs">{renderCell('currentXO', 'q', command.currentXO.timelineData?.q)}</TableCell>
                    </TableRow>

                    {/* Inbound XO */}
                    {command.inboundXO && (
                        <TableRow className="bg-slate-50/50">
                            <TableCell className="font-medium text-slate-500">P-XO</TableCell>
                            <TableCell className="font-medium">{command.inboundXO.name}</TableCell>
                            <TableCell className="text-center font-mono text-xs">{renderCell('inboundXO', 'i', command.inboundXO.timelineData?.i)}</TableCell>
                            <TableCell className="text-center font-mono text-xs">{renderCell('inboundXO', 'k', command.inboundXO.timelineData?.k)}</TableCell>
                            <TableCell className="text-center font-mono text-xs">{renderCell('inboundXO', 'm', command.inboundXO.timelineData?.m)}</TableCell>
                            <TableCell className="text-center font-mono text-xs">{renderCell('inboundXO', 'q', command.inboundXO.timelineData?.q)}</TableCell>
                        </TableRow>
                    )}

                    {/* Slated XO */}
                    {command.slatedXO && (
                        <TableRow className="bg-blue-50/50">
                            <TableCell className="font-medium text-slate-500">Slated XO</TableCell>
                            <TableCell className="font-medium">{command.slatedXO.name}</TableCell>
                            <TableCell className="text-center font-mono text-xs">{renderCell('slatedXO', 'i', command.slatedXO.timelineData?.i)}</TableCell>
                            <TableCell className="text-center font-mono text-xs">{renderCell('slatedXO', 'k', command.slatedXO.timelineData?.k)}</TableCell>
                            <TableCell className="text-center font-mono text-xs">{renderCell('slatedXO', 'm', command.slatedXO.timelineData?.m)}</TableCell>
                            <TableCell className="text-center font-mono text-xs">{renderCell('slatedXO', 'q', command.slatedXO.timelineData?.q)}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="text-[10px] text-gray-400 italic pt-2">
                * {editable ? "Edit dates directly (e.g. MAR27)." : "Displaying raw date columns from Oracle source (I, K, M, Q)."}
            </div>
        </div>
    )
}
