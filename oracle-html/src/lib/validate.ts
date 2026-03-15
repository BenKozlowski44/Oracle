import { z, ZodSchema } from 'zod'

/**
 * Parse and validate a request body against a Zod schema.
 *
 * Usage in a route:
 *   const parsed = parseBody(MySchema, await request.json())
 *   if (!parsed.ok) return parsed.response
 *   const { field } = parsed.data
 */
export function parseBody<T>(
    schema: ZodSchema<T>,
    data: unknown
): { ok: true; data: T } | { ok: false; response: Response } {
    const result = schema.safeParse(data)
    if (!result.success) {
        return {
            ok: false,
            response: Response.json(
                {
                    error: 'Invalid request body',
                    issues: result.error.issues.map(i => ({
                        path: i.path.join('.'),
                        message: i.message,
                    })),
                },
                { status: 400 }
            ),
        }
    }
    return { ok: true, data: result.data }
}
