"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Users,
    Building2,
    ClipboardList,
    BarChart3,
    Settings,
    GraduationCap,
    CalendarRange,
    Archive,
    FileWarning,
} from "lucide-react"

const navItems = [
    {
        title: "Command Center",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        title: "The Oracle",
        href: "/oracle",
        icon: Building2,
    },
    {
        title: "The Bank",
        href: "/bank",
        icon: Users,
    },
    {
        title: "PCC",
        href: "/pcc",
        icon: GraduationCap,
    },
    {
        title: "Slate Generator",
        href: "/slate-generator",
        icon: CalendarRange,
    },
    {
        title: "Active Slates",
        href: "/slates",
        icon: ClipboardList,
    },
    {
        title: "Archived Slates",
        href: "/slates/archived",
        icon: Archive,
    },
    {
        title: "Reports",
        href: "/reports",
        icon: BarChart3,
    },
    {
        title: "Missing Inputs",
        href: "/reports/missing-inputs",
        icon: FileWarning,
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-card print:hidden">
            <div className="flex h-24 items-center justify-center px-4 border-b bg-[#001f3f]">
                <div className="relative h-20 w-full">
                    <Image
                        src="/PERS-41 Logo.jpg"
                        alt="PERS-41 Logo"
                        fill
                        sizes="(max-width: 768px) 100vw, 256px"
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid gap-1 px-2">
                    {navItems.map((item, index) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="border-t p-4">
                <Link
                    href="/settings/data"
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                    )}
                >
                    <Settings className="h-4 w-4" />
                    Data Management
                </Link>
            </div>
        </div>
    )
}
