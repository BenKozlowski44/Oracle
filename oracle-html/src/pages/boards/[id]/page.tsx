// Server Component
import { getBoards } from '@/services/storage'
import { BoardDetailClient } from "./_board-detail-client"

interface BoardDetailPageProps {
    params: Promise<{ id: string }>
}


export default function BoardDetailPage({ params }: BoardDetailPageProps) {
    const { id } = await params
    const allBoards = getBoards()
    return (
        <BoardDetailClient
            id={id}
            allBoards={allBoards}
        />
    )
}
