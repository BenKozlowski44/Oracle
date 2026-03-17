/**
 * Names that represent placeholder slots rather than real named officers.
 * Used across oracle-table, edit-command-dialog, and slate prediction logic
 * to distinguish between a real officer in a billet and a forecast/vacant marker.
 */
export const PLACEHOLDER_SLOT_NAMES = new Set<string>([
  "Forecast",
  "VACANT",
  "Vacant",
  "TBD",
  "",
])

/**
 * Returns true when `name` does NOT represent a real named officer.
 * Covers:
 *  - Explicit placeholder labels  ("Forecast", "VACANT", "TBD", "")
 *  - Slate board cycle labels      ("26-3", "27-1", etc.)
 *
 * Use the negation `!isPlaceholderName(name)` to test for a real person.
 */
export const isPlaceholderName = (name?: string | null): boolean => {
  if (!name) return true
  if (PLACEHOLDER_SLOT_NAMES.has(name)) return true
  if (/^\d{2}-\d/.test(name)) return true   // slate labels e.g. "26-3"
  return false
}
