import { toast } from "sonner"

/**
 * Shows a persistent error toast that stays on screen until
 * the user explicitly dismisses it (clicks ×).
 * Use this for all save/API failures so nothing is missed.
 */
export function saveError(message: string) {
    toast.error(`⚠ Save Failed: ${message}`, {
        duration: Infinity,
    })
}

/**
 * Standard success notification — auto-dismisses after 3 seconds.
 */
export function notifySuccess(message: string) {
    toast.success(message, { duration: 3000 })
}
