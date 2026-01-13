// src/components/dashboard/TopTabs/TopTabs.tsx
import React from "react";
import {
  Calendar,
  ChevronDown,
  Download,
  MoreHorizontal,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Shadcn UI (use wherever possible)
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type MainKey =
  | "performance"
  | "social"
  | "partners"
  | "campaigns"
  | "content"
  | "inbox"
  | "operations"
  | "expenses";

type SubKey = "Overview" | "Database" | "Rebate Journey" | "Contracts" | "Retailers";

type MainTab = { key: MainKey; label: string; metric: string };

type TopTabsData = {
  mainTabs: readonly MainTab[];
  subTabs: readonly SubKey[];
  lastSynced: string;
  defaultDateRange: { from: string; to: string };
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Mocked API (React Query requirement)
async function fetchTopTabsMock(): Promise<TopTabsData> {
  await sleep(650);

  // Simulated occasional failure (error state requirement)
  if (Math.random() < 0.08) {
    throw new Error("Failed to load dashboard tabs. Please retry.");
  }

  return {
    mainTabs: [
      { key: "performance", label: "Performance", metric: "$334.4k" },
      { key: "social", label: "Social", metric: "24M Views" },
      { key: "partners", label: "Partners", metric: "400 rebates" },
      { key: "campaigns", label: "Campaigns", metric: "1500 review" },
      { key: "content", label: "Content", metric: "30k assets" },
      { key: "inbox", label: "Inbox", metric: "40 unread" },
      { key: "operations", label: "Operations", metric: "12 Active" },
      { key: "expenses", label: "Expenses", metric: "20 requests" },
    ] as const,
    subTabs: ["Overview", "Database", "Rebate Journey", "Contracts", "Retailers"] as const,
    lastSynced: "Just now",
    defaultDateRange: { from: "2026-10-01", to: "2026-10-31" },
  };
}

export function TopTabs() {
  const qc = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["topTabs"],
    queryFn: fetchTopTabsMock,
    staleTime: 0,
    retry: 0, // show error state instead of auto retries
  });

  const [activeMain, setActiveMain] = React.useState<MainKey>("partners");
  const [activeSub, setActiveSub] = React.useState<SubKey>("Overview");

  const [from, setFrom] = React.useState<string>("2026-10-01");
  const [to, setTo] = React.useState<string>("2026-10-31");

  // Keep UI stable: initialize date range from query once available
  React.useEffect(() => {
    if (!data) return;
    setFrom(data.defaultDateRange.from);
    setTo(data.defaultDateRange.to);
  }, [data]);

  const dateLabel = React.useMemo(() => {
    const fmt = (iso: string) => {
      const d = new Date(iso + "T00:00:00");
      const m = d.toLocaleString("en-US", { month: "short" });
      return `${m} ${d.getDate()}`;
    };
    return `${fmt(from)} – ${fmt(to)}`;
  }, [from, to]);

  const handleRefresh = () => {
    // “Workable” refresh: refetch via React Query
    qc.invalidateQueries({ queryKey: ["topTabs"] });
  };

  // ---- Loading UI (Skeleton) ----
  if (isLoading) {
    return (
      <section>
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6">
          <div className="mt-2 bg-[#F8F8F6]">
            <div className="px-2 pt-2">
              <div className="flex items-stretch gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="shrink-0 rounded-t-2xl bg-transparent pr-20 pl-6 py-2"
                  >
                    <Skeleton className="h-4 w-24" />
                    <div className="mt-2">
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-black/5" />

            <div className="bg-[#F3F2F1] px-2 py-2">
              <div className="flex items-center gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-7 w-20" />
                ))}
              </div>
            </div>

            <div className="h-px bg-black/5" />

            <div className="bg-[#FBFBF9] px-4 py-3">
              <div className="hidden lg:flex items-center gap-4">
                <Skeleton className="h-7 w-44 rounded-full" />
                <Skeleton className="h-4 w-40" />
                <div className="flex-1 flex justify-center">
                  <Skeleton className="h-6 w-[560px] rounded-full" />
                </div>
                <Skeleton className="h-7 w-40 rounded-full" />
              </div>

              <div className="lg:hidden space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <Skeleton className="h-7 w-44 rounded-full" />
                  <Skeleton className="h-8 w-36 rounded-full" />
                </div>
                <Skeleton className="h-8 w-full rounded-full" />
                <div className="flex items-center justify-between gap-3">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-8 w-44 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---- Error UI (Alert + Retry) ----
  if (isError) {
    return (
      <section>
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6">
          <div className="mt-2 bg-[#F8F8F6] p-3">
            <Alert className="border-black/10 bg-[#FBFBF9]">
              <AlertDescription className="flex items-center justify-between gap-3 text-sm text-black/70">
                <span>{(error as Error)?.message ?? "Something went wrong."}</span>
                <Button
                  type="button"
                  variant="outline"
                  className="h-8 rounded-full border-black/10 bg-[#FAFAF9] px-3 text-xs font-semibold text-black/70"
                  onClick={() => refetch()}
                >
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>
    );
  }

  // Safe to render
  const mainTabs = data!.mainTabs;
  const subTabs = data!.subTabs;
  const lastSynced = data!.lastSynced;

  return (
    <section>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6">
        {/* Full strap container */}
        <div className="mt-2 bg-[#F8F8F6]">
          {/* Main tabs row */}
          <div className="px-2 pt-2">
            <div className="flex items-stretch gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {mainTabs.map((t) => {
                const active = t.key === activeMain;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveMain(t.key)}
                    className={[
                      "shrink-0 rounded-t-2xl pr-20 pl-6 py-2 text-left transition",
                      active
                        ? "bg-[#C9FF2E] text-black"
                        : "bg-transparent hover:bg-black/5 text-[#B5AEAB]",
                    ].join(" ")}
                  >
                    <div
                      className={
                        active
                          ? "text-sm font-semibold leading-none"
                          : "text-sm font-medium leading-none"
                      }
                    >
                      {t.label}
                    </div>
                    <div className="mt-1 text-[11px] font-normal text-[#B5AEAB]">
                      {t.metric}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-black/5" />

          {/* Sub tabs row (differ from parent, like image) */}
          <div className="bg-[#F3F2F1]">
            <div className="px-0">
              <div className="flex items-center overflow-x-auto text-xs font-semibold [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {subTabs.map((t, idx) => {
                  const active = t === activeSub;
                  const showRightDivider = idx !== subTabs.length - 1;

                  return (
                    <div key={t} className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setActiveSub(t)}
                        className={[
                          "shrink-0 px-4 py-2 transition font-bold",
                          active
                            ? "text-black/85 bg-[#FBFBF9] border-b-2 border-black/20"
                            : "text-black/35 hover:text-black/55",
                        ].join(" ")}
                      >
                        {t}
                      </button>

                      {/* thin right-side border like image */}
                      {showRightDivider && (
                        <span
                          className="mx-0.5 h-4 w-px bg-black/10"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-black/5" />

          {/* Toolbar row (different strip) */}
          <div className="bg-[#FBFBF9]">
            <div className="px-4 py-2.5">
              {/* Desktop */}
              <div className="hidden lg:flex items-center gap-4">
                {/* Left (Shadcn DropdownMenu) */}
                <div className="flex items-center gap-3 shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-auto rounded-full border-black/5 bg-[#FAFAF9] px-3 py-1 text-xs font-semibold text-black/80 hover:bg-black/5"
                      >
                        Partners
                        <span className="mx-2 text-black/20 text-sm font-semibold">/</span>
                        {activeSub}
                        <ChevronDown size={14} className="ml-2 text-black/40" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="start"
                      className="w-[220px] rounded-xl border-black/10"
                    >
                      <DropdownMenuItem
                        className="text-xs font-semibold"
                        onClick={() => {
                          setActiveMain("partners");
                          setActiveSub("Overview");
                        }}
                      >
                        Partners / Overview
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-xs font-semibold"
                        onClick={() => {
                          setActiveMain("partners");
                          setActiveSub("Database");
                        }}
                      >
                        Partners / Database
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-xs font-semibold"
                        onClick={() => {
                          setActiveMain("performance");
                          setActiveSub("Overview");
                        }}
                      >
                        Performance / Overview
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="flex items-center gap-2 text-[11px] font-semibold text-black/35">
                    <span className="text-black/20">|</span>
                    <span>Last synced:</span>
                    <span className="text-black/55">{lastSynced}</span>

                    <button
                      type="button"
                      onClick={handleRefresh}
                      aria-label="Refresh"
                      className="inline-flex items-center justify-center rounded-full p-1 hover:bg-black/5 transition"
                    >
                      <RefreshCw
                        size={14}
                        className={["text-black/25", isFetching ? "animate-spin" : ""].join(" ")}
                      />
                    </button>
                  </div>
                </div>

                {/* Center search (underline style; centered placeholder) */}
                <div className="flex-1 min-w-0 flex justify-center">
                  <div className="w-full max-w-[560px]">
                    <div className="border-b-2 border-black/10 px-4 py-0">
                      <div className="relative">
                        <Search
                          size={14}
                          className="absolute left-2 top-1/2 -translate-y-1/2 text-black/30"
                        />
                        <input
                          className="w-full bg-transparent pl-7 pr-2 py-1 text-xs font-bold text-black/60 placeholder:text-black/35 outline-none text-center"
                          placeholder="Search Partners..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right (Shadcn Popover for date) */}
                <div className="shrink-0 flex items-center gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-auto rounded-full border-black/5 bg-[#FAFAF9] px-3 py-1 text-xs font-semibold text-black/70 hover:bg-black/5"
                      >
                        <Calendar size={14} className="mr-2 text-black/40" />
                        {dateLabel}
                        <ChevronDown size={14} className="ml-2 text-black/40" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      align="end"
                      className="w-[280px] rounded-2xl border-black/10 p-3"
                    >
                      <div className="text-xs font-semibold text-black/70">
                        Date range
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <label className="text-[11px] font-semibold text-black/50">
                          From
                          <input
                            type="date"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-black/10 bg-[#FAFAF9] px-2 py-1 text-xs font-semibold text-black/80 outline-none"
                          />
                        </label>

                        <label className="text-[11px] font-semibold text-black/50">
                          To
                          <input
                            type="date"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-black/10 bg-[#FAFAF9] px-2 py-1 text-xs font-semibold text-black/80 outline-none"
                          />
                        </label>
                      </div>

                      <div className="mt-3 flex items-center justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-8 rounded-lg px-3 text-xs font-semibold text-black/60 hover:bg-black/5"
                        >
                          Close
                        </Button>
                        <Button
                          type="button"
                          className="h-8 rounded-lg bg-black px-3 text-xs font-semibold text-white hover:bg-black/90"
                        >
                          Apply
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <span className="text-black/20 font-semibold select-none">|</span>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-black/55 hover:text-black/70 transition"
                  >
                    Filter
                  </button>

                  <span className="text-black/20 font-semibold select-none">|</span>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-black/55 hover:text-black/70 transition"
                  >
                    Export
                  </button>

                  <button
                    type="button"
                    aria-label="More"
                    className="inline-flex items-center justify-center p-2 text-black/60 hover:bg-black/5 transition"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              {/* Mobile + Tablet */}
              <div className="lg:hidden space-y-3">
                {/* Row 1: dropdown + date */}
                <div className="flex items-center justify-between gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-auto rounded-full border-black/5 bg-[#FAFAF9] px-3 py-1 text-xs font-semibold text-black/80 hover:bg-black/5"
                      >
                        Partners
                        <ChevronDown size={14} className="ml-2 text-black/40" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="start"
                      className="w-[220px] rounded-xl border-black/10"
                    >
                      <DropdownMenuItem
                        className="text-xs font-semibold"
                        onClick={() => setActiveMain("partners")}
                      >
                        Partners
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-xs font-semibold"
                        onClick={() => setActiveMain("performance")}
                      >
                        Performance
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-xs font-semibold"
                        onClick={() => setActiveMain("social")}
                      >
                        Social
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-auto rounded-full border-black/5 bg-[#FAFAF9] px-3 py-1.5 text-xs font-semibold text-black/70 hover:bg-black/5"
                      >
                        <Calendar size={14} className="mr-2 text-black/40" />
                        {dateLabel}
                        <ChevronDown size={14} className="ml-2 text-black/40" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      align="end"
                      className="w-[280px] rounded-2xl border-black/10 p-3"
                    >
                      <div className="text-xs font-semibold text-black/70">
                        Date range
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <label className="text-[11px] font-semibold text-black/50">
                          From
                          <input
                            type="date"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-black/10 bg-[#FAFAF9] px-2 py-1 text-xs font-semibold text-black/80 outline-none"
                          />
                        </label>

                        <label className="text-[11px] font-semibold text-black/50">
                          To
                          <input
                            type="date"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-black/10 bg-[#FAFAF9] px-2 py-1 text-xs font-semibold text-black/80 outline-none"
                          />
                        </label>
                      </div>

                      <div className="mt-3 flex items-center justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-8 rounded-lg px-3 text-xs font-semibold text-black/60 hover:bg-black/5"
                        >
                          Close
                        </Button>
                        <Button
                          type="button"
                          className="h-8 rounded-lg bg-black px-3 text-xs font-semibold text-white hover:bg-black/90"
                        >
                          Apply
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Row 2: search */}
                <div className="border-b-2 border-black/10 px-4 py-0">
                  <div className="relative text-center">
                    <Search
                      size={14}
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-black/30"
                    />
                    <input
                      className="w-full bg-transparent pl-7 pr-2 py-1 text-xs font-bold text-black/60 placeholder:text-black/35 outline-none text-center"
                      placeholder="Search Partners..."
                    />
                  </div>
                </div>

                {/* Row 3: last synced + actions */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-black/35">
                    <span>Last synced:</span>
                    <span className="text-black/55">{lastSynced}</span>
                    <button
                      type="button"
                      onClick={handleRefresh}
                      aria-label="Refresh"
                      className="inline-flex items-center justify-center rounded-full p-1 hover:bg-black/5 transition"
                    >
                      <RefreshCw
                        size={14}
                        className={["text-black/25", isFetching ? "animate-spin" : ""].join(" ")}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-black/55 hover:text-black/70 transition"
                    >
                      <SlidersHorizontal size={14} className="text-black/40" />
                      Filter
                    </button>

                    <span className="text-black/20 font-semibold select-none">|</span>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-black/55 hover:text-black/70 transition"
                    >
                      <Download size={14} className="text-black/40" />
                      Export
                    </button>

                    <button
                      type="button"
                      aria-label="More"
                      className="inline-flex items-center justify-center rounded-full border border-black/5 bg-[#FAFAF9] p-2 text-black/60 hover:bg-black/5 transition"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
              {/* end mobile */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
