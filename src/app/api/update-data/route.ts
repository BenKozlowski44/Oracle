import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { saveMetrics } from '@/lib/metrics-service';

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

        // Handle Data.ts updates (Legacy/Complex)
        // Only run this block if oracleData/officers/slates are present
        if (oracleData || officers || slates) {
            const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
            let fileContent = fs.readFileSync(dataFilePath, 'utf8');
            let updateCount = 0;

            // Helper to replace export block
            const replaceExport = (content: string, varName: string, data: any, isArray: boolean = true) => {
                const startMarker = `export const ${varName}:`;
                const startIndex = content.indexOf(startMarker);
                if (startIndex === -1) return content;

                const nextExportIndex = content.indexOf('export const', startIndex + startMarker.length);
                const endIndex = nextExportIndex === -1 ? content.length : nextExportIndex;

                let typeAnnotation = 'any';
                if (varName === 'oracleData') typeAnnotation = 'OracleCommand[]';
                if (varName === 'officers') typeAnnotation = 'Officer[]';
                if (varName === 'slates') typeAnnotation = 'Slate[]';

                // NOTE: We no longer update 'metrics' in data.ts, but we shouldn't break if it's passed?
                // Actually, let's just ignore metrics here since we handled it above.

                const dataString = JSON.stringify(data, null, 4);
                const newBlock = `export const ${varName}: ${typeAnnotation} = ${dataString}${endIndex === content.length ? '' : '\n\n'}`;

                return content.substring(0, startIndex) + newBlock + content.substring(endIndex);
            };

            if (oracleData && Array.isArray(oracleData)) {
                fileContent = replaceExport(fileContent, 'oracleData', oracleData);
                updateCount += oracleData.length;
            }

            if (officers && Array.isArray(officers)) {
                fileContent = replaceExport(fileContent, 'officers', officers);
                updateCount += officers.length;
            }

            if (slates && Array.isArray(slates)) {
                fileContent = replaceExport(fileContent, 'slates', slates);
                updateCount += slates.length;
            }

            fs.writeFileSync(dataFilePath, fileContent);
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
