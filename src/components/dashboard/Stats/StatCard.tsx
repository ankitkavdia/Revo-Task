// src/components/dashboard/Stats/StatCard.tsx
import React from "react";
import { cn } from "@/lib/utils";

// Shadcn UI
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// Icons
import { Target, Check, Clock3 } from "lucide-react";

type StatIcon = "target" | "check" | "watch";

type Props = {
  title: string;
  value: string;
  note?: string;
  subtitle?: string;
  density?: "compact" | "wide";
  icon?: StatIcon; // NEW: replaces tone
};

const iconWrap: Record<StatIcon, string> = {
  target: "bg-[#CFE8FF] ring-[#BFDFFF]",
  check: "bg-[#D8FFE1] ring-[#C7F6D3]",
  watch: "bg-[#FFE7B8] ring-[#FFDFA6]",
};

function defaultSubtitleFromTitle(title: string) {
  if (title === "Outreached") return "Partners Contacted";
  if (title === "Onboarded") return "Active in Program";
  if (title === "Awaiting Deliverables") return "Pending Content";
  return "—";
}

function IconNode({ icon }: { icon: StatIcon }) {
  const cls = "h-4 w-4 text-black/55";
  if (icon === "target") return <Target className={cls} />;
  if (icon === "check") return <Check className={cls} />;
  return <Clock3 className={cls} />;
}

export function StatCard({
  title,
  value,
  note,
  subtitle,
  density = "compact",
  icon = "target",
}: Props) {
  const isWide = density === "wide";
  const sub = subtitle ?? defaultSubtitleFromTitle(title);

  return (
    <Card className="w-full rounded-[26px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
      <CardHeader className={cn(isWide ? "px-6 sm:px-7 pt-5 pb-0" : "px-5 pt-4 pb-0")}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-black/35">
              {title}
            </div>
          </div>

          {/* Top-right icon bubble (matches screenshot style) */}
          <span
            className={cn(
              "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1",
              iconWrap[icon]
            )}
            aria-hidden="true"
          >
            <IconNode icon={icon} />
          </span>
        </div>
      </CardHeader>

      <CardContent className={cn(isWide ? "px-6 sm:px-7 pt-3 pb-0" : "px-5 pt-3 pb-0")}>
        <div
          className={cn(
            "font-semibold tracking-tight text-black/90 leading-none",
            isWide ? "text-[34px]" : "text-[32px]"
          )}
        >
          {value}
        </div>
      </CardContent>

      <CardFooter className={cn(isWide ? "px-6 sm:px-7 pt-1 pb-4" : "px-5 pt-1 pb-4")}>
        <div className="flex w-full items-center justify-between gap-3">
          <div className="text-[11px] font-semibold text-black/45 leading-none">{sub}</div>

          {note ? (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100 leading-none">
              {note}
            </span>
          ) : (
            <span className="sr-only">No note</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
