interface PageHeaderProps {
  label: string       // small gold uppercase label — e.g. "PERS-41 · Talent Management"
  title: string       // main page h1 heading
  description?: string
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="border-b border-[#c9a227]/30 pb-4">
      <p className="text-[#c9a227] text-xs font-semibold tracking-[0.3em] uppercase mb-1">
        {label}
      </p>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
      )}
    </div>
  )
}
