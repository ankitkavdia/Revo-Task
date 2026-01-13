// src/components/dashboard/NeedsApproval/NeedsApproval.tsx
import React from "react";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ApprovalItem } from "./ApprovalItem";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export type ApprovalItemModel = {
  id: string;
  brand: string;
  action: string;
  avatarText: string; // e.g. "U"
  time: string; // e.g. "2h ago"
  avatarTone: "orange" | "blue" | "purple" | "green";
};

type NeedsApprovalResponse = {
  items: ApprovalItemModel[];
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Mocked API (React Query requirement)
async function mockFetchNeedsApproval(): Promise<NeedsApprovalResponse> {
  await sleep(650);

  // error state simulation
  if (Math.random() < 0.08) {
    throw new Error("Failed to load approvals. Please retry.");
  }

  return {
    items: [
      {
        id: "a1",
        brand: "UrbanFit Life",
        action: "Approve Content",
        avatarText: "U",
        time: "2h ago",
        avatarTone: "orange",
      },
      {
        id: "a2",
        brand: "TechSavvy Mom",
        action: "Approve Commission",
        avatarText: "T",
        time: "5h ago",
        avatarTone: "blue",
      },
      {
        id: "a3",
        brand: "Daily Gadgets",
        action: "Validate Lead",
        avatarText: "D",
        time: "1d ago",
        avatarTone: "purple",
      },
      {
        id: "a4",
        brand: "Yoga with Jen",
        action: "Approve Invoice",
        avatarText: "Y",
        time: "1d ago",
        avatarTone: "green",
      },
    ],
  };
}

export function NeedsApproval() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["dashboard", "needsApproval"],
    queryFn: mockFetchNeedsApproval,
    staleTime: 30_000,
    retry: 0, // show error state clearly
  });

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#FEF4C6] bg-[#FFFBEA] shadow-[0_14px_40px_rgba(0,0,0,0.06)]">
      {/* left orange accent like screenshot */}
      <div className="absolute left-0 top-0 h-full w-[5px] bg-[#FBBF24]" />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FFE7B8] ring-1 ring-orange-200/70">
              <AlertCircle className="h-4 w-4 text-orange-700" />
            </span>

            <div>
              <h3 className="text-sm font-semibold text-black/90">Needs Approval</h3>

              {isLoading ? (
                <div className="mt-1">
                  <Skeleton className="h-3 w-44" />
                </div>
              ) : (
                <p className="mt-0.5 text-xs font-medium text-black/45">
                  {(data?.items?.length ?? 0)} requests pending your review
                </p>
              )}
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={isLoading || isError}
            className="h-9 rounded-full border-orange-200 bg-white/70 px-4 text-[11px] font-bold tracking-wide text-[#D87708] cursor-pointer hover:bg-white disabled:opacity-60"
          >
            APPROVE ALL
          </Button>
        </div>

        {/* States */}
        <div className="mt-5">
          {/* Loading */}
          {isLoading ? (
            <>
              {/* desktop */}
              <div className="hidden lg:grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-black/5 bg-white px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                  >
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-3 w-12 rounded" />
                    </div>
                    <div className="mt-3 space-y-2">
                      <Skeleton className="h-4 w-28 rounded" />
                      <Skeleton className="h-3 w-24 rounded" />
                    </div>
                    <div className="mt-4">
                      <Skeleton className="h-9 w-full rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>

              {/* mobile/tablet: horizontal scroll */}
              <div className="lg:hidden flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[255px] shrink-0 rounded-2xl border border-black/5 bg-white px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                  >
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-3 w-12 rounded" />
                    </div>
                    <div className="mt-3 space-y-2">
                      <Skeleton className="h-4 w-28 rounded" />
                      <Skeleton className="h-3 w-24 rounded" />
                    </div>
                    <div className="mt-4">
                      <Skeleton className="h-9 w-full rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {/* Error */}
          {!isLoading && isError ? (
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
          ) : null}

          {/* Success */}
          {!isLoading && !isError ? (
            <>
              {/* Desktop: 4-up grid */}
              <div className="hidden lg:grid grid-cols-4 gap-4">
                {(data?.items ?? []).map((item) => (
                  <ApprovalItem key={item.id} {...item} />
                ))}
              </div>

              {/* Mobile + Tablet: scroll row */}
              <div className="lg:hidden flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {(data?.items ?? []).map((item) => (
                  <div key={item.id} className="shrink-0">
                    <ApprovalItem {...item} />
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
