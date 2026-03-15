import pers41Logo from "@/assets/pers41-logo.png"
import commandAtSea from "@/assets/command-at-sea.png"
import commandAshore from "@/assets/command-ashore.png"

export function AppHeader() {
    return (
        <header className="relative bg-[#0a1628] border-b border-[#c9a227]/30 shadow-lg">
            {/* Gold top accent line */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#c9a227] to-transparent" />

            <div className="flex items-center justify-between px-8 py-3 max-w-screen-2xl mx-auto">

                {/* Left — Command at Sea */}
                <div className="flex flex-col items-center gap-1 w-32">
                    <img
                        src={commandAtSea}
                        alt="Command at Sea Insignia"
                        className="h-16 w-16 object-contain drop-shadow-[0_0_6px_rgba(201,162,39,0.4)]"
                    />
                    <span className="text-[#c9a227] text-[10px] font-semibold tracking-widest uppercase text-center leading-tight">
                        Command<br />at Sea
                    </span>
                </div>

                {/* Center — PERS-41 Logo + Title */}
                <div className="flex flex-col items-center gap-2 flex-1">
                    <img
                        src={pers41Logo}
                        alt="PERS-41 Surface Warfare Officer Assignments"
                        className="h-14 object-contain drop-shadow-[0_0_8px_rgba(201,162,39,0.3)]"
                    />
                    <div className="text-center">
                        <p className="text-white/90 text-xs tracking-[0.2em] uppercase font-light">
                            PERS-41 &mdash; Command Succession Management
                        </p>
                    </div>
                </div>

                {/* Right — Command Ashore */}
                <div className="flex flex-col items-center gap-1 w-32">
                    <img
                        src={commandAshore}
                        alt="Command Ashore Insignia"
                        className="h-16 w-16 object-contain drop-shadow-[0_0_6px_rgba(201,162,39,0.4)]"
                    />
                    <span className="text-[#c9a227] text-[10px] font-semibold tracking-widest uppercase text-center leading-tight">
                        Command<br />Ashore
                    </span>
                </div>
            </div>

            {/* Gold bottom accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a227]/60 to-transparent" />
        </header>
    )
}
