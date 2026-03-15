import { NextResponse } from 'next/server'

// GET /api/health — lightweight liveness check used by the in-app status banner
export async function GET() {
    return NextResponse.json({ ok: true })
}
