// src/components/dashboard/ProgramGrowth/ProgramGrowth.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

// Shadcn UI
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

type GrowthTabKey = "application" | "product" | "campaign";

type GrowthItem = {
  name: string;
  partners: number;
  pct: number; // 0..100 for bar width
};

type ProgramGrowthResponse = {
  title: string;
  subtitle: string;
  headlineValue: number;
  headlineLabel: string;
  tabs: { key: GrowthTabKey; label: string }[];
  defaultTab: GrowthTabKey;
  itemsByTab: Record<GrowthTabKey, GrowthItem[]>;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Mocked API (React Query requirement)
async function mockFetchProgramGrowth(): Promise<ProgramGrowthResponse> {
  await sleep(700);

  if (Math.random() < 0.08) {
    throw new Error("Failed to load program growth. Please retry.");
  }

  return {
    title: "Program Growth",
    subtitle: "New partner acquisition breakdown",
    headlineValue: 124,
    headlineLabel: "This Month",
    tabs: [
      { key: "application", label: "Application" },
      { key: "product", label: "Product" },
      { key: "campaign", label: "Campaign" },
    ],
    defaultTab: "application",
    itemsByTab: {
      application: [
        { name: "Levanta", partners: 45, pct: 92 },
        { name: "Impact", partners: 32, pct: 72 },
        { name: "Social Snowball", partners: 28, pct: 58 },
        { name: "Shopify Collabs", partners: 19, pct: 42 },
      ],
      product: [
        { name: "Affiliate Toolkit", partners: 52, pct: 90 },
        { name: "Starter Pack", partners: 33, pct: 64 },
        { name: "UGC Bundle", partners: 26, pct: 50 },
        { name: "Pro Kit", partners: 18, pct: 36 },
      ],
      campaign: [
        { name: "Holiday Push", partners: 48, pct: 88 },
        { name: "New Season Launch", partners: 34, pct: 62 },
        { name: "Brand Collab Week", partners: 24, pct: 44 },
        { name: "Winback Sprint", partners: 16, pct: 30 },
      ],
    },
  };
}

function clampPct(pct: number) {
  return Math.max(0, Math.min(100, pct));
}

function barFillClassByIndex(i: number) {
  // Match screenshot: first black, then progressively lighter greys
  if (i === 0) return "bg-black";
  if (i === 1) return "bg-black/45";
  if (i === 2) return "bg-black/25";
  return "bg-black/15";
}

function ProgressRow({ item, index }: { item: GrowthItem; index: number }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-[11px] font-semibold">
        <span className="text-black/70">{item.name}</span>
        <span className="text-black/35">{item.partners} Partners</span>
      </div>

      {/* Track + fill (colors like image) */}
      <div className="mt-2 h-2.5 rounded-full bg-black/10">
        <div
          className={cn("h-2.5 rounded-full", barFillClassByIndex(index))}
          style={{ width: `${clampPct(item.pct)}%` }}
        />
      </div>
    </div>
  );
}

export function ProgramGrowth() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["dashboard", "programGrowth"],
    queryFn: mockFetchProgramGrowth,
    staleTime: 30_000,
    retry: 0,
  });

  const [active, setActive] = React.useState<GrowthTabKey>("application");

  React.useEffect(() => {
    if (data?.defaultTab) setActive(data.defaultTab);
  }, [data?.defaultTab]);

  // ---------- Loading ----------
  if (isLoading) {
    return (
      <Card className="rounded-[28px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
        <CardHeader className="p-6 sm:p-7 pb-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <Skeleton className="h-5 w-40" />
              <div className="mt-2">
                <Skeleton className="h-3 w-56" />
              </div>
            </div>

            <div className="flex w-full justify-start sm:w-auto sm:justify-end">
              <Skeleton className="h-10 w-[260px] rounded-full" />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Skeleton className="h-12 w-28" />
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-7 pt-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="mt-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="mt-2">
                <Skeleton className="h-2.5 w-full rounded-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // ---------- Error ----------
  if (isError) {
    return (
      <Card className="rounded-[28px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
        <CardContent className="p-6 sm:p-7">
          <Alert className="border-black/10 bg-[#FAFAF9]">
            <AlertDescription className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-black/70">
                {(error as Error)?.message ?? "Something went wrong."}
              </span>
              <Button
                type="button"
                variant="outline"
                className="h-8 cursor-pointer rounded-full border-black/10 bg-white px-3 text-xs font-semibold"
                onClick={() => refetch()}
                disabled={isFetching}
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const d = data!;
  const tabs = d.tabs;
  const items = d.itemsByTab[active] ?? [];

  return (
    <Card className="rounded-[28px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
      <CardHeader className="p-6 sm:p-7 pb-0">
        {/* Top row: title + segmented tabs (same “single background” as image) */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-black/90">{d.title}</h3>
            <p className="mt-1 text-xs font-medium text-black/40">{d.subtitle}</p>
          </div>

          {/* Segmented control container */}
          <div className="flex w-full justify-start sm:w-auto sm:justify-end">
            <div className="inline-flex w-full max-w-full items-center rounded-full bg-black/5 p-1 ring-1 ring-black/5 sm:w-auto">
              {tabs.map((t) => {
                const isActive = t.key === active;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActive(t.key)}
                    className={cn(
                      "cursor-pointer select-none rounded-full px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] transition",
                      "flex-1 sm:flex-none",
                      isActive
                        ? "bg-white text-black/75 shadow-[0_10px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
                        : "text-black/35 hover:text-black/55"
                    )}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Headline row: +124 and green badge like image */}
        <div className="mt-6 flex items-end gap-3">
          <div className="text-[44px] leading-none tracking-tight font-semibold text-black/90 sm:text-[52px]">
            +{d.headlineValue}
          </div>

          <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-700 ring-1 ring-emerald-100">
            <TrendingUp className="h-3.5 w-3.5" />
            {d.headlineLabel}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-7 pt-5">
        {items.map((it, idx) => (
          <ProgressRow key={it.name} item={it} index={idx} />
        ))}
      </CardContent>
    </Card>
  );
}
