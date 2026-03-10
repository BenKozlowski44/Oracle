import { NextResponse } from 'next/server';
import { Officer } from '@/lib/types';
import { readJson, writeJson, withWriteLock } from '@/services/data-service';
import { parseBody } from '@/lib/validate';
import { CreateOfficerBodySchema } from '@/lib/schemas';

export async function POST(request: Request) {
    try {
        const parsed = parseBody(CreateOfficerBodySchema, await request.json())
        if (!parsed.ok) return parsed.response
        const data = parsed.data as Partial<Officer>

        // Generate ID if missing
        if (!data.id) {
            data.id = data.name!.toLowerCase().replace(/[^a-z0-9]/g, '') + '_' + Date.now();
        }

        // Ensure defaults
        if (!data.preferences) data.preferences = [];
        if (!data.preferredLocations) data.preferredLocations = [];
        if (!data.preferredPlatforms) data.preferredPlatforms = [];

        const newOfficer = data as Officer

        const officers = readJson<Officer[]>('officers.json');
        await withWriteLock(() => {
            officers.unshift(newOfficer);
            writeJson('officers.json', officers);
        });

        return NextResponse.json({ success: true, officer: newOfficer });

    } catch (error) {
        console.error('Error creating officer:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
