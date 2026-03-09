// Server Component
import { getBoards, getOfficers } from "@/lib/data"
import { BoardDetailClient } from "./_board-detail-client"

interface BoardDetailPageProps {
    params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
    const { id } = await params
    const allBoards = getBoards()
    const allOfficers = getOfficers()
    return (
        <BoardDetailClient
            id={id}
            allBoards={allBoards}
            allOfficers={allOfficers}
        />
    )
}
