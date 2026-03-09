// Server Component
import { getBoards } from "@/lib/data"
import { BoardsClient } from "./_boards-client"

export const dynamic = 'force-dynamic'

export default async function BoardsPage() {
    const initialBoards = getBoards()
    return <BoardsClient initialBoards={initialBoards} />
}
