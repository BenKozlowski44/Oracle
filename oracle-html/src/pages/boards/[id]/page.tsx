import { useParams } from 'react-router-dom'
import { getBoards } from '@/services/storage'
import { BoardDetailClient } from './_board-detail-client'

export default function BoardDetailPage() {
    const { id } = useParams<{ id: string }>()
    const allBoards = getBoards()

    if (!id) return <div className="p-4 text-muted-foreground">Board not found.</div>

    return (
        <BoardDetailClient
            id={id}
            allBoards={allBoards}
        />
    )
}
