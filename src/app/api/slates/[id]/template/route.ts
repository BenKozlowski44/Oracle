
import { NextResponse } from 'next/server';
import { getSlates } from '@/lib/data';
import { generateCandidateTemplate } from '@/lib/excel-service';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const slate = getSlates().find(s => s.id === id);

    if (!slate) {
        return NextResponse.json({ error: 'Slate not found' }, { status: 404 });
    }

    try {
        const buffer = await generateCandidateTemplate(slate);

        // Return file download
        return new NextResponse(buffer as any, { // Cast to any to avoid strict BodyInit type issues with Buffer
            headers: {
                'Content-Disposition': `attachment; filename="${slate.name.replace(/\s+/g, '_')}_candidate_input.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });
    } catch (error: any) {
        console.error("Error generating template:", error);
        console.error("Stack:", error.stack);
        return NextResponse.json({
            error: 'Failed to generate template',
            details: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
