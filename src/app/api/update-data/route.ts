import { NextResponse } from 'next/server';
import { saveMetrics } from '@/lib/metrics-service';
import { updateDataFile } from '@/services/data-service';
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
            const { readJson } = await import('@/services/data-service');
            const currentOfficers = readJson<Officer[]>('officers.json');

            if (mergeBank) {
                // Keep CO-SM officers, replace standard bank
                const cosmOfficers = currentOfficers.filter((o: Officer) => o.listShift === 'CO-SM' || o.screened?.includes('CO-SM'));
                finalOfficers = [...cosmOfficers, ...mergeBank];
            } else if (mergeCosm) {
                // Keep standard bank officers
                const standardOfficers = currentOfficers.filter((o: Officer) => !(o.listShift === 'CO-SM' || o.screened?.includes('CO-SM')));
                // Keep existing CO-SM officers not in the new upload
                const newCosmIds = new Set(mergeCosm.map((o: Officer) => o.id));
                const existingCosmToKeep = currentOfficers.filter((o: Officer) =>
                    (o.listShift === 'CO-SM' || o.screened?.includes('CO-SM')) && !newCosmIds.has(o.id)
                );
                finalOfficers = [...standardOfficers, ...existingCosmToKeep, ...mergeCosm];
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
