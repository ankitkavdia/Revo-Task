type Tab = { label: string; active?: boolean }

export function SecondaryTabs({ tabs }: { tabs: Tab[] }) {
  return (
    <div className="mt-2 flex items-center gap-6 text-xs text-black/55">
      {tabs.map((t) => (
        <button
          key={t.label}
          className={[
            "py-2",
            t.active ? "text-black font-semibold" : "hover:text-black",
          ].join(" ")}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
