// src/components/dashboard/LatestUpdates/LatestUpdates.tsx
import React from "react";
import { Bell, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { UpdateChip } from "./UpdateChip";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export type LatestUpdateItem = {
  initials: string;
  name: string;
  subtitle: string;
  avatarBg: string;
  active?: boolean;
};

type LatestUpdatesResponse = {
  items: LatestUpdateItem[];
};

function mockFetchLatestUpdates(): Promise<LatestUpdatesResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 10% error simulation for "error state" requirement
      if (Math.random() < 0.1) {
        reject(new Error("Failed to load latest updates. Please try again."));
        return;
      }

      resolve({
        items: [
          {
            initials: "JV",
            name: "Jane V.",
            subtitle: "Sent 3 contracts",
            avatarBg: "#C9FF2E",
            active: true,
          },
          {
            initials: "MK",
            name: "Mia K.",
            subtitle: "1 rebate approved",
            avatarBg: "#D9D6FF",
            active: true,
          },
          {
            initials: "AR",
            name: "Alex R.",
            subtitle: "Uploaded assets",
            avatarBg: "#FFD8B4",
            active: true,
          },
          {
            initials: "ST",
            name: "Sam T.",
            subtitle: "Needs review",
            avatarBg: "#CFE8FF",
            active: true,
          },
          {
            initials: "KB",
            name: "Kara B.",
            subtitle: "Updated database",
            avatarBg: "#FFE3F1",
            active: true,
          },
        ],
      });
    }, 650);
  });
}

export function LatestUpdates() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["dashboard", "latestUpdates"],
    queryFn: mockFetchLatestUpdates,
    staleTime: 30_000,
    retry: 1,
  });

  return (
    <section>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6">
        <div className="mt-3">
          {/* Loading */}
          {isLoading ? (
            <div className="flex items-center rounded-full bg-[#FAFAF9] border border-black/5 px-3 py-2">
              <div className="flex items-center gap-2 pr-3">
                <Skeleton className="h-7 w-7 rounded-full" />
                <div className="leading-tight">
                  <Skeleton className="h-3 w-14 rounded" />
                  <div className="mt-1">
                    <Skeleton className="h-2.5 w-12 rounded" />
                  </div>
                </div>
              </div>

              <div className="mx-4 h-10 w-px bg-black/10" />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 overflow-hidden pr-12">
                  <Skeleton className="h-8 w-44 rounded-full" />
                  <Skeleton className="h-8 w-48 rounded-full" />
                  <Skeleton className="h-8 w-40 rounded-full" />
                </div>
              </div>

              <div className="ml-3">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          ) : null}

          {/* Error */}
          {!isLoading && isError ? (
            <Alert className="bg-[#FAFAF9] border-black/10">
              <AlertDescription className="flex items-center justify-between gap-3">
                <span className="text-black/70 text-sm">
                  {(error as Error)?.message || "Something went wrong."}
                </span>
                <Button
                  variant="outline"
                  className="h-8 rounded-full px-3 text-xs font-semibold"
                  onClick={() => refetch()}
                >
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          ) : null}

          {/* Success */}
          {!isLoading && !isError ? (
            <div className="relative flex items-center rounded-full bg-[#FAFAF9] border border-black/5 px-3 py-1">
              {/* Left badge */}
              <div className="shrink-0 flex items-center gap-2 pr-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-black border border-black/5 text-white">
                  <Bell size={14} />
                </span>

                <div className="leading-tight">
                  <div className="text-[11px] font-bold text-black/80">
                    LATEST
                  </div>
                  <div className="text-[10px] font-semibold text-black/35">
                    Updates
                  </div>
                </div>
              </div>

              <span className="h-10 w-px mx-4 bg-black/10" />

              {/* Scrollable chips */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pr-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {(data?.items ?? []).map((it, idx) => (
                    <UpdateChip
                      key={`${it.name}-${idx}`}
                      initials={it.initials}
                      name={it.name}
                      subtitle={it.subtitle}
                      avatarBg={it.avatarBg}
                      active={it.active ?? true}
                    />
                  ))}
                </div>
              </div>

              {/* Right chevron button */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button
                  variant="outline"
                  className="h-8 w-8 rounded-full p-0 bg-white"
                  aria-label="Expand updates"
                  onClick={() => {
                    // placeholder; keep UI only
                    // eslint-disable-next-line no-console
                    console.log("expand updates");
                  }}
                >
                  <ChevronDown size={16} className="text-black/60" />
                </Button>

                {/* optional subtle refresh interaction without adding extra UI */}
                <button
                  type="button"
                  aria-label="Refresh updates"
                  className="sr-only"
                  onClick={() => refetch()}
                  disabled={isFetching}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
