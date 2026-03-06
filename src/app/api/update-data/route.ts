import { NextResponse } from 'next/server';
import { saveMetrics } from '@/lib/metrics-service';
import { updateDataFile } from '@/services/data-service';
import fs from 'fs';
import path from 'path';
import { Officer } from '@/lib/types';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { oracleData, officers, slates, metrics, boards, updatedCommand, mergeBank, mergeCosm, deletedCommand } = body;

        if (!oracleData && !officers && !slates && !metrics && !boards && !mergeBank && !mergeCosm && !deletedCommand) {
            return NextResponse.json({ error: 'No data provided' }, { status: 400 });
        }

        let finalOfficers = officers;

        // Perform intelligent merge if partial upload requested
        if (mergeBank || mergeCosm) {
            const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
            const fileContent = fs.readFileSync(dataFilePath, 'utf8');
            const startMarker = 'export const officers: Officer[] =';
            const searchStartIndex = fileContent.indexOf(startMarker);

            if (searchStartIndex !== -1) {
                const openBracketIndex = fileContent.indexOf('[', searchStartIndex + startMarker.length);
                if (openBracketIndex !== -1) {
                    let depth = 0;
                    let inString = false;
                    let quoteChar = '';
                    let closeBracketIndex = -1;

                    for (let i = openBracketIndex; i < fileContent.length; i++) {
                        const char = fileContent[i];
                        if (inString) {
                            if (char === quoteChar && fileContent[i - 1] !== '\\') inString = false;
                        } else {
                            if (char === '"' || char === "'" || char === '`') {
                                inString = true;
                                quoteChar = char;
                            } else if (char === '[') depth++;
                            else if (char === ']') {
                                depth--;
                                if (depth === 0) {
                                    closeBracketIndex = i;
                                    break;
                                }
                            }
                        }
                    }

                    if (closeBracketIndex !== -1) {
                        const jsonString = fileContent.substring(openBracketIndex, closeBracketIndex + 1);
                        try {
                            const parseFn = new Function(`return ${jsonString}`);
                            const currentOfficers = parseFn() as Officer[];

                            if (mergeBank) {
                                // Keep CO-SM officers, replace standard bank
                                const cosmOfficers = currentOfficers.filter(o => o.listShift === 'CO-SM' || o.screened?.includes('CO-SM'));
                                finalOfficers = [...cosmOfficers, ...mergeBank];
                            } else if (mergeCosm) {
                                // Keep standard bank
                                const standardOfficers = currentOfficers.filter(o => !(o.listShift === 'CO-SM' || o.screened?.includes('CO-SM')));

                                // Also keep existing CO-SM officers that ARE NOT natively in the new mergeCosm upload
                                const newCosmIds = new Set(mergeCosm.map((o: any) => o.id));
                                const existingCosmToKeep = currentOfficers.filter(o =>
                                    (o.listShift === 'CO-SM' || o.screened?.includes('CO-SM')) &&
                                    !newCosmIds.has(o.id)
                                );

                                finalOfficers = [...standardOfficers, ...existingCosmToKeep, ...mergeCosm];
                            }
                        } catch (e) {
                            console.error("Failed to parse existing officers for merge", e);
                            return NextResponse.json({ error: 'Failed to read current bank data' }, { status: 500 });
                        }
                    }
                }
            }
        }

        // Handle Metrics (JSON file)
        if (metrics) {
            saveMetrics(metrics);
        }

        // Handle Data.ts updates via Service
        if (oracleData || finalOfficers || slates || boards) {
            await updateDataFile({ oracleData, officers: finalOfficers, slates, boards });
        }

        // Trigger Excel Write-Back for the specific updated command (Fire and Forget)
        if (updatedCommand) {
            import('@/lib/excel-writer').then(({ updateCommandInExcel }) => {
                updateCommandInExcel(updatedCommand).then(res => {
                    if (!res.success) {
                        console.warn(`[API] Oracle Excel update failed: ${res.message}`);
                    } else {
                        console.log(`[API] Successfully synced ${updatedCommand.name} to oracle_data.xlsx`);
                    }
                }).catch(err => {
                    console.error("Failed to sync Oracle command to Excel:", err);
                });
            });
        }

        // Trigger Excel Deletion for the deleted command (Fire and Forget)
        if (deletedCommand) {
            import('@/lib/excel-writer').then(({ deleteCommandFromExcel }) => {
                deleteCommandFromExcel(deletedCommand).then(res => {
                    if (!res.success) {
                        console.warn(`[API] Oracle Excel deletion failed: ${res.message}`);
                    } else {
                        console.log(`[API] Successfully deleted ${deletedCommand.name} from oracle_data.xlsx`);
                    }
                }).catch(err => {
                    console.error("Failed to delete Oracle command from Excel:", err);
                });
            });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error updating data:', error);
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}
