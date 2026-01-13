import type { ActivityChip } from "@/features/dashboard/dashboard.types"

const tone = {
  neutral: "bg-black text-white",
  blue: "bg-sky-100 text-sky-700",
  red: "bg-red-100 text-red-700",
  green: "bg-green-100 text-green-700",
  yellow: "bg-amber-100 text-amber-700",
} as const

export function ActivityStrip({ items }: { items: ActivityChip[] }) {
  return (
    <div className="rounded-full bg-white px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex items-center gap-3 overflow-x-auto">
      {items.map((c) => (
        <div
          key={c.id}
          className="flex items-center gap-2 min-w-[220px] rounded-full px-3 py-2 hover:bg-black/5"
        >
          <div className={`h-8 w-8 rounded-full grid place-items-center text-[11px] font-semibold ${tone[c.avatarTone]}`}>
            {c.avatarText}
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-semibold">{c.title}</div>
            <div className="text-[11px] text-black/45 truncate max-w-[150px]">{c.subtitle}</div>
          </div>
        </div>
      ))}
      <div className="ml-auto h-8 w-8 rounded-full bg-black/5 grid place-items-center shrink-0">⌄</div>
    </div>
  )
}
