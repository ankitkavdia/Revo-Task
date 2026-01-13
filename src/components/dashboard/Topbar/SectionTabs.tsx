type Item = { title: string; subtitle: string; active?: boolean }

export function SectionTabs({ items }: { items: Item[] }) {
  return (
    <div className="mt-4 grid grid-cols-8 gap-2 text-xs">
      {items.map((t) => (
        <div
          key={t.title}
          className={[
            "rounded-2xl px-4 py-3 border border-black/5 bg-white/60",
            t.active ? "bg-[#d8ff4f] border-[#c9f74a]" : "hover:bg-white",
          ].join(" ")}
        >
          <div className="text-black/55">{t.title}</div>
          <div className="mt-0.5 font-medium text-black/80">{t.subtitle}</div>
        </div>
      ))}
    </div>
  )
}
