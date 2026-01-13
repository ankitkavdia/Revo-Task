// src/components/layout/Header.tsx
import { ChevronRight, Menu, Search, Printer } from "lucide-react";

export function Header() {
  const title = "Welcome back, Combina";
  const meta = { name: "Velto", id: "6732", status: "In progress" };

  return (
    <header className="bg-[#f9f7f5]">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6">
        {/* Breadcrumb row (matches image) */}
        <div className="pt-4 sm:pt-5 flex items-center gap-3 text-xs font-semibold text-[#B4AEAB]">
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 transition hover:bg-black/5"
          >
            <Menu size={16} />
          </button>

          <span className="select-none text-black/25 font-semibold">|</span>
          <span className="whitespace-nowrap">Dashboard</span>
          <ChevronRight size={14} className="text-black/30" />
          <span className="whitespace-nowrap text-black">Overview</span>
        </div>

        {/* Main row */}
        <div className="pt-2 pb-4">
          {/* Desktop / large screens */}
          <div className="hidden lg:grid grid-cols-[auto_1fr_auto] items-center gap-8">
            {/* Left title */}
            <h1 className="text-[28px] xl:text-[30px] font-semibold tracking-tight text-black/90 leading-tight">
              {title}
            </h1>

            {/* Center search (exact placement like image) */}
            <div className="min-w-0 flex justify-center">
              <div className="w-full max-w-[520px]">
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-black/30"
                  />
                  <input
                    className="w-full bg-transparent pl-6 pr-2 py-2 text-sm text-black/70 font-semibold placeholder:text-black/35 outline-none border-b border-black/10 focus:border-black/20 transition"
                    placeholder="Search across campaigns, partners, or assets..."
                  />
                </div>
              </div>
            </div>

            {/* Right meta pills (match image spacing + typography) */}
            <div className="flex items-center gap-2 text-[11px] text-black/60 whitespace-nowrap">
              <button
                type="button"
                aria-label="Print"
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#f5f5f4] border border-black/5 p-1.5 transition hover:bg-black/[0.03]"
              >
                <Printer size={14} className="text-black/45" />
              </button>

              <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f5f4] border border-black/5 px-3 py-1 font-semibold">
                <span className="text-[#c7c4c1]">NAME:</span>
                <span className="text-black font-bold">{meta.name}</span>
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f5f4] border border-black/5 px-3 py-1 font-semibold">
                <span className="text-[#c7c4c1]">ID:</span>
                <span className="text-black font-bold">{meta.id}</span>
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 border border-green-200 px-3 py-1 font-semibold text-green-700">
                <span className="uppercase tracking-wide text-[#c7c4c1]">
                  Status:
                </span>
                <span className="capitalize font-bold">{meta.status}</span>
              </span>
            </div>
          </div>

          {/* Mobile / tablet */}
          <div className="lg:hidden space-y-3">
            {/* Row 1: title + print */}
            <div className="flex items-center justify-between gap-3">
              <h1 className="min-w-0 text-[22px] sm:text-[26px] font-semibold tracking-tight text-black/90 leading-tight truncate">
                {title}
              </h1>

              <button
                type="button"
                aria-label="Print"
                className="shrink-0 inline-flex cursor-pointer items-center justify-center rounded-full bg-[#f5f5f4] border border-black/5 p-2 transition hover:bg-black/[0.03]"
              >
                <Printer size={14} className="text-black/45" />
              </button>
            </div>

            {/* Row 2: search full width */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-black/30"
              />
              <input
                className="w-full bg-transparent pl-6 pr-2 py-2 text-sm text-black/70 font-semibold placeholder:text-black/35 outline-none border-b border-black/10 focus:border-black/20 transition"
                placeholder="Search across campaigns, partners, or assets..."
              />
            </div>

            {/* Row 3: pills wrap */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-black/60">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f5f4] border border-black/5 px-3 py-1 font-semibold">
                <span className="text-[#c7c4c1]">NAME:</span>
                <span className="text-black font-bold">{meta.name}</span>
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f5f4] border border-black/5 px-3 py-1 font-semibold">
                <span className="text-[#c7c4c1]">ID:</span>
                <span className="text-black font-bold">{meta.id}</span>
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 border border-green-200 px-3 py-1 font-semibold text-green-700">
                <span className="uppercase tracking-wide text-[#c7c4c1]">
                  Status:
                </span>
                <span className="capitalize font-bold">{meta.status}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
