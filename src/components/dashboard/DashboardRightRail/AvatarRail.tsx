// src/components/dashboard/DashboardRightRail/AvatarRail.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RailUser = {
  id: string;
  name: string;
  initials: string;
  badge?: number;
  active?: boolean;
};

type Props = {
  onOpenChat: () => void;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function mockFetchRailUsers(): Promise<RailUser[]> {
  await sleep(550);
  if (Math.random() < 0.08) throw new Error("Failed to load users.");

  return [
    { id: "u1", name: "Sarah", initials: "SJ", badge: 2 },
    { id: "u2", name: "Mike", initials: "MR" },
    { id: "u3", name: "Elena", initials: "EF", badge: 5 },
    { id: "u4", name: "David", initials: "DK" },
    { id: "u5", name: "Alex", initials: "AM", badge: 1 },
    { id: "u6", name: "Jessica", initials: "JL" },
    { id: "u7", name: "Priya", initials: "PR", badge: 2 },
    { id: "u8", name: "Nina", initials: "NA" },
    { id: "u9", name: "Omar", initials: "OA" },
    { id: "u10", name: "Chen", initials: "CH", badge: 4 },
    { id: "u11", name: "Luca", initials: "LU" },
    { id: "u12", name: "Ava", initials: "AV" },
  ];
}

export function AvatarRail({ onOpenChat }: Props) {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["dashboard", "avatarRail"],
    queryFn: mockFetchRailUsers,
    staleTime: 30_000,
    retry: 0,
  });

  return (
    <aside className="h-full">
      <div
        className={cn(
          "relative h-full w-[76px] rounded-[28px] bg-[#EFEAE3]",
          "px-1 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.06)] ring-1 ring-black/5"
        )}
      >
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onOpenChat}
            className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)] ring-1 ring-black/10 hover:bg-black/5"
            aria-label="Open chat"
          >
            <ChevronRight className="h-4 w-4 text-black/70" />
          </button>
        </div>

        <div className="mt-4">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-full" />
              ))}
            </div>
          ) : isError ? (
            <div className="px-1">
              <Alert className="border-black/10 bg-white/60">
                <AlertDescription className="space-y-2">
                  <div className="text-xs font-semibold text-black/70">
                    {(error as Error)?.message ?? "Something went wrong."}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-8 w-full rounded-full border-black/10 bg-white px-3 text-xs font-semibold"
                    onClick={() => refetch()}
                    disabled={isFetching}
                  >
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="max-h-[640px] overflow-y-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex flex-col items-center gap-3">
                {(data ?? []).map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={onOpenChat}
                    className="relative"
                    title={u.name}
                    aria-label={u.name}
                  >
                    <div
                      className={cn(
                        "grid h-10 w-10 place-items-center rounded-full bg-white",
                        "text-[11px] font-bold text-black/70 ring-1 ring-black/10",
                        "shadow-[0_10px_26px_rgba(0,0,0,0.10)]",
                        "hover:scale-[1.02] transition"
                      )}
                    >
                      {u.initials}
                    </div>

                    {typeof u.badge === "number" ? (
                      <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-[#34C759] px-1 text-[10px] font-extrabold text-white ring-2 ring-[#EFEAE3]">
                        {u.badge}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
