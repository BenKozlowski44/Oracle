// Server Component
import { getBoards } from "@/lib/data"
import { BoardDetailClient } from "./_board-detail-client"

interface BoardDetailPageProps {
    params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
    const { id } = await params
    const allBoards = getBoards()
    return (
        <BoardDetailClient
            id={id}
            allBoards={allBoards}
        />
    )
}
