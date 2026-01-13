// src/components/dashboard/PartnerFunnel/PartnerFunnel.tsx
import React from "react";
import { Zap  } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { FunnelBlock } from "./FunnelBlock";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

type TabKey = "last_quarter" | "influenced" | "forecast";

type FunnelDatum = {
  value: string;
  label: string;
  fillTone: "olive" | "mid" | "light" | "dark";
};

type PartnerFunnelResponse = {
  headline: string; // "+37%"
  subtitle: string; // "6,653 growth in closed sales"
  tabs: { key: TabKey; label: string }[];
  activeDefault: TabKey;
  blocks: FunnelDatum[];
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function mockFetchPartnerFunnel(): Promise<PartnerFunnelResponse> {
  await sleep(700);

  // error state requirement
  if (Math.random() < 0.08) {
    throw new Error("Failed to load partner funnel. Please retry.");
  }

  return {
    headline: "+37%",
    subtitle: "6,653 growth in closed sales",
    tabs: [
      { key: "last_quarter", label: "Last quarter" },
      { key: "influenced", label: "What has influenced" },
      { key: "forecast", label: "Forecast" },
    ],
    activeDefault: "last_quarter",
    blocks: [
      { value: "142,382", label: "Total Market", fillTone: "olive" },
      { value: "87,027", label: "Prospects", fillTone: "mid" },
      { value: "48,027", label: "Leads", fillTone: "light" },
      { value: "32,027", label: "Sales", fillTone: "dark" },
    ],
  };
}

export function PartnerFunnel() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["dashboard", "partnerFunnel"],
    queryFn: mockFetchPartnerFunnel,
    staleTime: 30_000,
    retry: 0,
  });

  const [active, setActive] = React.useState<TabKey>("last_quarter");

  React.useEffect(() => {
    if (data?.activeDefault) setActive(data.activeDefault);
  }, [data?.activeDefault]);

  // Loading
  if (isLoading) {
    return (
      <section className="rounded-[28px] bg-[#C9FF2E] p-6 sm:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/10">
              <Zap className="h-4 w-4 text-black/80" />
            </span>
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-28 rounded-full" />
            <Skeleton className="h-8 w-40 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Skeleton className="h-16 w-44" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-[68px] w-full rounded-2xl" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error
  if (isError) {
    return (
      <section className="rounded-[28px] bg-[#C9FF2E] p-6 sm:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
        <Alert className="border-black/10 bg-white/60">
          <AlertDescription className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-black/70">
              {(error as Error)?.message ?? "Something went wrong."}
            </span>
            <Button
              type="button"
              variant="outline"
              className="h-8 rounded-full border-black/10 bg-[#FAFAF9] px-3 text-xs font-semibold text-black/70 hover:bg-black/5"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  const d = data!;

  return (
    <section className="rounded-[28px] bg-[#D1FF4B] p-6 sm:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      {/* Top row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full">
            <Zap className="h-4 w-4 text-black" />
          </span>
          <h3 className="text-base font-semibold text-black/90">Partner Funnel</h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {d.tabs.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={[
                  "h-6 rounded-full px-4 text-[11px] font-bold transition cursor-pointer",
                  isActive
                    ? "bg-black text-white"
                    : "bg-[#BCDE44] text-black/70 hover:bg-white/45",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Big metric */}
      <div className="mt-6">
        <div className="flex items-end gap-3">
          <div className="text-[56px] leading-none tracking-tight font-semibold text-black/90 sm:text-[64px]">
            {d.headline}
          </div>
          <div className="pb-2 text-xs font-semibold text-black/70">
            {d.subtitle}
          </div>
        </div>
      </div>

      {/* Blocks */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {d.blocks.map((b) => (
          <FunnelBlock
            key={b.label}
            value={b.value}
            label={b.label}
            fillTone={b.fillTone}
          />
        ))}
      </div>
    </section>
  );
}
