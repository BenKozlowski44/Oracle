import { NextResponse } from 'next/server';
import { readJson, writeJson, withWriteLock } from '@/services/data-service';
import { Officer } from '@/lib/types';

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id || typeof id !== 'string') {
            return NextResponse.json({ error: 'Missing or invalid officer id' }, { status: 400 });
        }

        const result = await withWriteLock(() => {
            const officers = readJson<Officer[]>('officers.json');
            const index = officers.findIndex(o => o.id === id);
            if (index === -1) return false;
            officers.splice(index, 1);
            writeJson('officers.json', officers);
            return true;
        });

        if (!result) {
            return NextResponse.json({ error: 'Officer not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error deleting officer:', error);
        return NextResponse.json({ error: 'Failed to delete officer' }, { status: 500 });
    }
}
