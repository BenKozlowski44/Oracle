"use client"

import { oracleData, slates } from "@/lib/data"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatToMMMyy } from "@/lib/utils"

export function CommandsReport({ slateId }: { slateId: string }) {
    const slate = slates.find(s => s.id === slateId)

    if (!slate) {
        return (
            <div className="p-8 text-center text-muted-foreground border border-dashed rounded-md">
                Slate not found.
            </div>
        )
    }

    const requirements = slate.requirements || [];

    // Map requirements to full command details from the Oracle
    const commandsOnSlate = requirements.map(req => {
        const cmd = oracleData.find(c => c.id === req.commandId);
        return {
            id: req.id,
            role: req.role,
            uic: cmd?.uic || "N/A",
            commandName: cmd?.name || "Unknown Command",
            billetTitle: req.role,
            location: cmd?.location || "Unknown Location",
            platform: cmd?.platform || "Unknown",
            tags: cmd?.tags || ([] as string[]),
            reportDate: req.incumbentPrd || "To Be Determined"
        };
    });

    const todayDate = new Date().toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });



    const standardCmds = commandsOnSlate.filter(c => !c.tags.includes("CO-SM"));
    const cosmCmds = commandsOnSlate.filter(c => c.tags.includes("CO-SM"));

    const renderTable = (cmds: typeof commandsOnSlate, title: string) => (
        <div className="space-y-4 print:space-y-2 print:mb-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold print:text-base">{title}</h3>
            </div>
            <div className="border rounded-md overflow-x-auto print:border-none print:m-0 print:p-0">
                <Table className="print:table-fixed print:w-full print:text-xs">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] print:w-[60px] print:p-2 print:text-xs">UIC</TableHead>
                            <TableHead className="w-[250px] print:w-auto print:p-2 print:text-xs">Command Name</TableHead>
                            <TableHead className="w-[200px] print:w-auto print:p-2 print:text-xs">Billet Title</TableHead>
                            <TableHead className="w-[150px] print:w-[100px] print:p-2 print:text-xs">Role</TableHead>
                            <TableHead className="w-[120px] print:w-[80px] print:p-2 print:text-xs">Report Date</TableHead>
                            <TableHead className="w-[150px] print:w-[120px] print:p-2 print:text-xs">Platform</TableHead>
                            <TableHead className="w-[150px] print:w-[120px] print:p-2 print:text-xs">Location</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cmds.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No {title.toLowerCase()} commands assigned to this slate.
                                </TableCell>
                            </TableRow>
                        ) : (
                            cmds.map(cmd => (
                                <TableRow key={cmd.id} className="print:break-inside-avoid">
                                    <TableCell className="font-medium print:p-2 print:align-top">{cmd.uic}</TableCell>
                                    <TableCell className="print:p-2 print:align-top">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{cmd.commandName}</span>
                                            {cmd.tags.includes("CO-SM") && (
                                                <span className="text-[10px] text-muted-foreground">CO-SM</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="print:p-2 print:align-top">{cmd.billetTitle}</TableCell>
                                    <TableCell className="print:p-2 print:align-top">
                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground print:border-gray-300 print:bg-transparent">
                                            {cmd.role}
                                        </span>
                                    </TableCell>
                                    <TableCell className="print:p-2 print:align-top whitespace-nowrap">
                                        {cmd.reportDate !== "To Be Determined" ? formatToMMMyy(cmd.reportDate) : cmd.reportDate}
                                    </TableCell>
                                    <TableCell className="print:p-2 print:align-top">{cmd.platform}</TableCell>
                                    <TableCell className="print:p-2 print:align-top">{cmd.location}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between print:mb-4">
                <div>
                    <h2 className="text-xl font-semibold">Commands on Slate: {slate.name}</h2>
                    <div className="text-sm text-muted-foreground flex gap-4 mt-1">
                        <span>{commandsOnSlate.length} Total Requirements</span>
                        <span className="print:hidden">•</span>
                        <span>Generated: {todayDate}</span>
                    </div>
                </div>
            </div>

            {renderTable(standardCmds, "CDR CMD")}
            {renderTable(cosmCmds, "CO-SM")}
        </div>
    );
}
