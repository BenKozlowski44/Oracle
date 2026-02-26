import fs from 'fs'
import path from 'path'
import { slates } from "@/lib/data"
import { Officer } from "@/lib/types"
import { ReportsClient } from "@/components/reports/reports-client"

export const dynamic = 'force-dynamic'

function getOfficers(): Officer[] {
    try {
        const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts')
        const fileContent = fs.readFileSync(dataFilePath, 'utf8')
        const startMarker = 'export const officers: Officer[] ='
        const searchStartIndex = fileContent.indexOf(startMarker)

        if (searchStartIndex === -1) return []

        const openBracketIndex = fileContent.indexOf('[', searchStartIndex + startMarker.length)
        if (openBracketIndex === -1) return []

        let depth = 0
        let inString = false
        let quoteChar = ''
        let closeBracketIndex = -1

        for (let i = openBracketIndex; i < fileContent.length; i++) {
            const char = fileContent[i]
            if (inString) {
                if (char === quoteChar && fileContent[i - 1] !== '\\') inString = false
            } else {
                if (char === '"' || char === "'" || char === '`') {
                    inString = true
                    quoteChar = char
                } else if (char === '[') depth++
                else if (char === ']') {
                    depth--
                    if (depth === 0) {
                        closeBracketIndex = i
                        break
                    }
                }
            }
        }

        if (closeBracketIndex === -1) return []
        const jsonString = fileContent.substring(openBracketIndex, closeBracketIndex + 1)

        const parseFn = new Function(`return ${jsonString}`)
        return parseFn() as Officer[]
    } catch (e) {
        return []
    }
}

export default async function ReportsPage() {
    const currentOfficers = getOfficers()
    return <ReportsClient officers={currentOfficers} slates={slates} />
}
