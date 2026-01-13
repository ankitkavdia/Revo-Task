import { ChevronDown } from "lucide-react"

export function Toolbar() {
  return (
    <div className="mt-3 flex items-center justify-between gap-4 text-xs text-black/55">
      <div className="flex items-center gap-2">
        <button className="rounded-full bg-white px-3 py-2 border border-black/5 shadow-sm flex items-center gap-2">
          Partners <ChevronDown size={14} />
        </button>
        <button className="rounded-full bg-white px-3 py-2 border border-black/5 shadow-sm flex items-center gap-2">
          Overview <ChevronDown size={14} />
        </button>
        <span className="text-black/35">|</span>
        <span>Last synced:</span>
        <span className="text-black/75 font-medium">Just now</span>
      </div>

      <div className="flex-1 max-w-[520px] hidden md:block">
        <input
          className="w-full rounded-full bg-white px-5 py-2 border border-black/5 shadow-sm outline-none"
          placeholder="Search Partners..."
        />
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-full bg-white px-3 py-2 border border-black/5 shadow-sm">
          Oct 1 - Oct 31
        </button>
        <button className="rounded-full bg-white px-3 py-2 border border-black/5 shadow-sm">
          Filter
        </button>
        <button className="rounded-full bg-white px-3 py-2 border border-black/5 shadow-sm">
          Export
        </button>
        <button className="rounded-full bg-white px-3 py-2 border border-black/5 shadow-sm">
          …
        </button>
      </div>
    </div>
  )
}
