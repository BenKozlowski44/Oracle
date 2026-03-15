// Server Component
import { getBoards } from '@/services/storage'
import { BoardsClient } from "./_boards-client"


export default function BoardsPage() {
    const initialBoards = getBoards()
    return <BoardsClient initialBoards={initialBoards} />
}
