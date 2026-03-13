"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Officer } from "@/lib/types"

interface Props {
    value: string
    onChange: (name: string) => void
    officers: Officer[]
    placeholder?: string
    id?: string
}

export function OfficerNameInput({ value, onChange, officers, placeholder, id }: Props) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const matches = useMemo(() => {
        const q = value.trim().toLowerCase()
        if (!q || q.length < 2) return []
        return officers
            .filter(o => o.name.toLowerCase().includes(q))
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 8)
    }, [value, officers])

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    return (
        <div ref={containerRef} className="relative w-full">
            <input
                id={id}
                autoComplete="off"
                value={value}
                placeholder={placeholder}
                onChange={e => {
                    onChange(e.target.value)
                    setOpen(true)
                }}
                onFocus={() => value.trim().length >= 2 && setOpen(true)}
                onKeyDown={e => { if (e.key === "Escape") setOpen(false) }}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {open && matches.length > 0 && (
                <ul className="absolute z-50 top-full left-0 right-0 mt-1 rounded-md border bg-popover shadow-lg overflow-hidden">
                    {matches.map(o => (
                        <li
                            key={o.id}
                            className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                            onMouseDown={e => {
                                e.preventDefault()
                                onChange(o.name)
                                setOpen(false)
                            }}
                        >
                            <span className="font-medium">{o.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">{o.rank} · {o.currentCommand}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
