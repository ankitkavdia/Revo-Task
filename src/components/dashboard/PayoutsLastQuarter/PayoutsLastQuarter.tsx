// src/components/dashboard/PayoutsLastQuarter/PayoutsLastQuarter.tsx
import { useQuery } from "@tanstack/react-query";
import { Zap } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PayoutBar = {
  key: string;
  height: number; // 0..100
  tone: "muted" | "dark" | "accent";
};

type PayoutsResponse = {
  title: string;
  percentage: string; // "+350%"
  amount: string; // "$2.5 m"
  avatarEmoji?: string;
  bars: PayoutBar[];
  xLabels: string[];
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function mockFetchPayouts(): Promise<PayoutsResponse> {
  await sleep(650);

  if (Math.random() < 0.08) {
    throw new Error("Failed to load payouts. Please retry.");
  }

  return {
    title: "Payouts last quarter",
    percentage: "+350%",
    amount: "$2.5 m",
    avatarEmoji: "🧑🏽‍💼",
    bars: [
      { key: "b1", height: 28, tone: "muted" },
      { key: "b2", height: 34, tone: "muted" },
      { key: "b3", height: 32, tone: "muted" },
      { key: "b4", height: 62, tone: "dark" },
      { key: "b5", height: 78, tone: "dark" },
      { key: "b6", height: 52, tone: "dark" },
      { key: "b7", height: 22, tone: "dark" },
      { key: "b8", height: 88, tone: "dark" },
      { key: "b9", height: 70, tone: "accent" },
    ],
    xLabels: ["01.23", "02.23", "03.23", "", "", "", "", "", "09.23"],
  };
}

function Bar({ height, tone }: { height: number; tone: PayoutBar["tone"] }) {
  const bg =
    tone === "accent"
      ? "bg-[#C9FF2E]"
      : tone === "dark"
        ? "bg-[#1B1917]"
        : "bg-black/10";

  return (
    <div className="flex h-[150px] items-end justify-center">
      <div
        className={cn("w-full rounded-[22px]", bg)}
        style={{ height: `${height}%` }}
      />
    </div>
  );
}

export function PayoutsLastQuarter() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["dashboard", "payoutsLastQuarter"],
    queryFn: mockFetchPayouts,
    staleTime: 30_000,
    retry: 0,
  });

  // ---------- Loading ----------
  if (isLoading) {
    return (
      <section className="w-full overflow-hidden rounded-[28px] bg-white p-5 sm:p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-8 w-40 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>

        <div className="mt-6 flex items-end justify-between gap-3">
          <Skeleton className="h-14 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="mt-6 grid grid-cols-9 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-[150px] w-full rounded-[22px]" />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-black/30">
          <Skeleton className="h-3 w-10 rounded" />
          <Skeleton className="h-3 w-10 rounded" />
          <Skeleton className="h-3 w-10 rounded" />
          <Skeleton className="h-3 w-10 rounded" />
        </div>
      </section>
    );
  }

  // ---------- Error ----------
  if (isError) {
    return (
      <section className="w-full overflow-hidden rounded-[28px] bg-white p-5 sm:p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
        <Alert className="border-black/10 bg-[#FAFAF9]">
          <AlertDescription className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-black/70">
              {(error as Error)?.message ?? "Something went wrong."}
            </span>
            <Button
              type="button"
              variant="outline"
              className="h-8 rounded-full border-black/10 bg-white px-3 text-xs font-semibold"
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
    <section className="w-full overflow-hidden rounded-[28px] bg-white p-5 sm:p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      {/* Top row */}
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex min-w-0 items-center gap-2 rounded-full bg-[#FAFAF9] px-3 py-1.5 text-[11px] font-bold text-black/70 ring-1 ring-black/5">
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-black/5">
            <Zap className="h-3.5 w-3.5 text-black/70" />
          </span>
          <span className="truncate">{d.title}</span>
        </div>

        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/5 ring-1 ring-black/5 text-sm">
          {d.avatarEmoji ?? "🙂"}
        </div>
      </div>

      {/* Headline row */}
      <div className="mt-6 flex items-end justify-between gap-3">
        <div className="text-[44px] sm:text-[56px] leading-none tracking-tight font-semibold text-black/90">
          {d.percentage}
        </div>
        <div className="pb-1.5 text-xs font-semibold text-black/70">{d.amount}</div>
      </div>

      {/* Bars (NO overflow: grid-based, bars auto-fit) */}
      <div className="mt-6">
        <div className="grid grid-cols-9 gap-2">
          {d.bars.map((b) => (
            <Bar key={b.key} height={b.height} tone={b.tone} />
          ))}
        </div>

        {/* X labels */}
        <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-black/30">
          <span>{d.xLabels[0]}</span>
          <span>{d.xLabels[1]}</span>
          <span>{d.xLabels[2]}</span>
          <span>{d.xLabels[d.xLabels.length - 1]}</span>
        </div>
      </div>
    </section>
  );
}
