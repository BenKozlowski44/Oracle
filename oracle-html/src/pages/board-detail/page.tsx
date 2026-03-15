// Server Component
import { getBoards } from '@/services/storage'
import { BoardDetailClient } from "./_board-detail-client"

interface BoardDetailPageProps {
    params: Promise<{ id: string }>
}


export default function BoardDetailPage({ params }: BoardDetailPageProps) {
    const { id } = useParams<{ id: string }>()
    if (!id) return null
    const allBoards = getBoards()
    return (
        <BoardDetailClient
            id={id}
            allBoards={allBoards}
        />
    )
}
