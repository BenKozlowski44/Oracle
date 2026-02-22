import { NextResponse } from 'next/server';
import { saveMetrics } from '@/lib/metrics-service';
import { updateDataFile } from '@/services/data-service';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { oracleData, officers, slates, metrics, updatedCommand } = body;

        if (!oracleData && !officers && !slates && !metrics) {
            return NextResponse.json({ error: 'No data provided' }, { status: 400 });
        }

        // Handle Metrics (JSON file)
        if (metrics) {
            saveMetrics(metrics);
        }

        // Handle Data.ts updates via Service
        if (oracleData || officers || slates) {
            await updateDataFile({ oracleData, officers, slates });
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

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error updating data:', error);
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}
