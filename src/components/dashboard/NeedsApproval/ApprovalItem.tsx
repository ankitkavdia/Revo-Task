// src/components/dashboard/NeedsApproval/ApprovalItem.tsx
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  brand: string;
  action: string;
  avatarText: string;
  time: string;
  avatarTone: "orange" | "blue" | "purple" | "green";
};

const tone = {
  orange: "bg-orange-100 text-orange-700",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  green: "bg-green-100 text-green-700",
} as const;

export function ApprovalItem({ brand, action, avatarText, time, avatarTone }: Props) {
  return (
    <div
      className={cn(
        "w-[255px] lg:w-auto",
        "rounded-2xl bg-white",
        "border border-black/5",
        "shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
        "px-4 py-4"
      )}
    >
      {/* Top row: avatar + time */}
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full text-[12px] font-bold",
            tone[avatarTone]
          )}
          aria-label={`${brand} avatar`}
        >
          {avatarText}
        </div>

        <span className="text-[11px] font-semibold text-black/35">{time}</span>
      </div>

      {/* Brand + action (NAME exists) */}
      <div className="mt-3">
        <div className="text-sm font-semibold text-black/85">{brand}</div>
        <div className="mt-0.5 text-xs font-semibold text-black/40">{action}</div>
      </div>

      {/* Review button with icon (like screenshot) */}
      <div className="mt-4">
        <Button
          type="button"
          variant="outline"
          className={cn(
            "h-9 w-full rounded-xl",
            "border-black/5 bg-[#F4F3F2] text-black/70",
            "text-xs font-semibold",
            "hover:bg-[#EEECEB]"
          )}
        >
          <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/80 ring-1 ring-black">
            <Check className="text-black" />
          </span>
          Review
        </Button>
      </div>
    </div>
  );
}
