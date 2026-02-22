import fs from 'fs';
import path from 'path';
import { Metrics } from './types';

const metricsPath = path.join(process.cwd(), 'src', 'data', 'metrics.json');

export function getMetrics(): Metrics {
    try {
        const fileContent = fs.readFileSync(metricsPath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading metrics:", error);
        return { resolvedConflicts: 0 };
    }
}

export function saveMetrics(metrics: Metrics): void {
    try {
        fs.writeFileSync(metricsPath, JSON.stringify(metrics, null, 4));
    } catch (error) {
        console.error("Error writing metrics:", error);
    }
}
