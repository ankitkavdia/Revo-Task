// src/components/dashboard/DashboardRightRail/DashboardRightRail.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  ExternalLink,
  Sparkles,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  chatOpen: boolean;
  onChatOpenChange: (open: boolean) => void;
};

type InboxPerson = {
  id: string;
  name: string;
  message: string;
  time: string;
  avatarUrl: string;
  unread?: number;
};

type InboxResponse = {
  people: InboxPerson[];
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function mockFetchInbox(): Promise<InboxResponse> {
  await sleep(650);

  if (Math.random() < 0.08) {
    throw new Error("Failed to load inbox. Please retry.");
  }

  return {
    people: [
      {
        id: "p1",
        name: "Sarah Jenkins",
        message:
          "The new assets for the campaign look amazing! Can we schedule a call to discuss the rollout?",
        time: "2m ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces",
        unread: 2,
      },
      {
        id: "p2",
        name: "Mike Ross",
        message:
          "Just sent over the revised agreement. Let me know if you need anything else modified.",
        time: "1h ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
      },
      {
        id: "p3",
        name: "Elena Fisher",
        message:
          "I have some questions about the attribution window for the “Summer Glow” bundle.",
        time: "3h ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=120&h=120&fit=crop&crop=faces",
        unread: 5,
      },
      {
        id: "p4",
        name: "David Kim",
        message:
          "The referral links are working perfectly now. Thanks for the quick fix on the tracking!",
        time: "5h ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=120&h=120&fit=crop&crop=faces",
        unread: 1,
      },
      {
        id: "p5",
        name: "Alex Morgan",
        message: "Can we push the meeting to next Tuesday?",
        time: "6h ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces",
      },
      {
        id: "p6",
        name: "Jessica Lee",
        message: "Invoice #4022 has been paid. Thanks!",
        time: "1d ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&crop=faces",
        unread: 3,
      },
    ],
  };
}

const noScrollbar =
  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

function InboxList({ people }: { people: InboxPerson[] }) {
  return (
    <div className="flex flex-col">
      <div className="px-5 pt-5">
        <div className="p-2">
          <div className="flex flex-col gap-2">
            {people.map((p) => (
              <div
                key={p.id}
                className="flex w-full items-start gap-3 rounded-2xl bg-[#F8F6F3] px-4 py-3 text-left ring-1 ring-white"
              >
                <div className="relative mt-0.5">
                  <img
                    src={p.avatarUrl}
                    alt={p.name}
                    className="h-10 w-10 rounded-2xl object-cover ring-2 ring-white"
                  />
                  {p.unread ? (
                    <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-[#C9FF2E] px-1 text-[11px] font-extrabold text-black ring-2 ring-white">
                      {p.unread}
                    </span>
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="truncate text-xs font-extrabold text-black/80">
                      {p.name}
                    </div>
                    <div className="shrink-0 text-[11px] font-semibold text-black/35">
                      {p.time}
                    </div>
                  </div>

                  <div className="mt-1 line-clamp-2 text-[12px] font-medium text-black/50">
                    {p.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bigger chat box like screenshot */}
      <div className="px-5 pt-4">
        <div className="relative rounded-2xl bg-white/60 ring-1 ring-black/5 shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
          <textarea
            placeholder="Quick reply..."
            rows={3}
            className={cn(
              "w-full resize-none rounded-2xl bg-transparent pl-4 pr-14 pt-3 pb-3 text-sm font-semibold text-black/70 placeholder:text-black/30 outline-none",
              noScrollbar
            )}
          />
          <button
            type="button"
            aria-label="Send"
            className="absolute right-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] hover:bg-black/90 cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="px-5 pt-4 pb-5 space-y-3">
        <Button
          type="button"
          variant="outline"
          className="h-12 w-full justify-center rounded-2xl border-black/10 bg-white/65 text-sm font-semibold text-black/70 hover:bg-white cursor-pointer"
        >
          <MessageSquare className="mr-2 h-4 w-4 text-black/45" />
          View Full Inbox
          <ExternalLink className="ml-2 h-4 w-4 text-black/40" />
        </Button>

        <Button
          type="button"
          className="h-12 w-full justify-center rounded-2xl bg-black text-sm font-semibold text-white hover:bg-black/90 cursor-pointer"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          AI Chat Assistant
        </Button>
      </div>
    </div>
  );
}

function AvatarStrip({ people }: { people: InboxPerson[] }) {
  return (
    <div className={cn("flex flex-col items-center gap-4 px-3 pb-4 pt-16", noScrollbar)}>
      {people.slice(0, 14).map((p) => (
        <div key={p.id} className="relative">
          <img
            src={p.avatarUrl}
            alt={p.name}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
          />
          {p.unread ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-[#C9FF2E] px-1 text-[11px] font-extrabold text-black ring-2 ring-white">
              {p.unread}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function DashboardRightRail({ chatOpen, onChatOpenChange }: Props) {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["dashboard", "rightRailInbox"],
    queryFn: mockFetchInbox,
    staleTime: 30_000,
    retry: 0,
  });

  const people = data?.people ?? [];

  return (
    <aside className={cn("hidden xl:block shrink-0", chatOpen ? "w-[430px]" : "w-[90px]")}>
      <div
        className={cn(
          "relative overflow-hidden rounded-[34px] bg-gradient-to-b from-[#F2ECE6] to-[#EFE7E0] shadow-[0_22px_80px_rgba(0,0,0,0.10)] ring-1 ring-black/5 transition-[width] duration-300",
          chatOpen ? "w-[430px]" : "w-[90px]"
        )}
        style={{ height: "auto" }}
      >
        <button
          type="button"
          aria-label={chatOpen ? "Collapse inbox" : "Expand inbox"}
          onClick={() => onChatOpenChange(!chatOpen)}
          className="absolute left-1/2 top-4 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)] ring-1 ring-black/5 hover:bg-black/[0.02] cursor-pointer"
        >
          {chatOpen ? (
            <ChevronRight className="h-5 w-5 text-black/60" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-black/60" />
          )}
        </button>

        {chatOpen ? (
          <div className="pt-2">
            {isLoading ? (
              <div className="p-5 pt-16">
                <div className="rounded-[22px] bg-[#F1EDE7] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.10)] ring-1 ring-black/5">
                  <div className="space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-black/5"
                      >
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <Skeleton className="h-3 w-28" />
                            <Skeleton className="h-3 w-12" />
                          </div>
                          <div className="mt-2 space-y-1">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-4/5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <Skeleton className="h-20 w-full rounded-2xl" />
                </div>

                <div className="mt-4 space-y-3">
                  <Skeleton className="h-12 w-full rounded-2xl" />
                  <Skeleton className="h-12 w-full rounded-2xl" />
                </div>
              </div>
            ) : null}

            {!isLoading && isError ? (
              <div className="p-5 pt-16">
                <Alert className="border-black/10 bg-white/60">
                  <AlertDescription className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-black/70">
                      <AlertCircle className="h-4 w-4 text-black/40" />
                      <span>{(error as Error)?.message ?? "Something went wrong."}</span>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="h-8 rounded-full border-black/10 bg-[#FAFAF9] px-3 text-xs font-semibold text-black/70 hover:bg-black/5 cursor-pointer"
                      onClick={() => refetch()}
                      disabled={isFetching}
                    >
                      Retry
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            ) : null}

            {!isLoading && !isError ? (
              <div className="pt-10">
                <InboxList people={people} />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="pt-2">
            {isLoading ? (
              <div className="px-3 pb-4 pt-16 space-y-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-10 rounded-full" />
                ))}
              </div>
            ) : isError ? (
              <div className="px-3 pb-4 pt-16">
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.10)] cursor-pointer"
                  aria-label="Retry"
                >
                  <AlertCircle className="h-5 w-5 text-black/50" />
                </button>
              </div>
            ) : (
              <AvatarStrip people={people} />
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
