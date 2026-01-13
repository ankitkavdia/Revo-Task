// src/components/dashboard/PartnerFunnel/FunnelBlock.tsx
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  label: string;
  fillTone: "olive" | "mid" | "light" | "dark";
};

const fillToneClasses: Record<Props["fillTone"], string> = {
  olive: "bg-[#A2CB39]",
  mid: "bg-[#BBE059]",
  light: "bg-[#DBF58C]",
  dark: "bg-[#1B1917]",
};

// Heights are ONLY for the bar (text is not counted).
// Text should “ride” above the bar (low graph mode), so shorter bars = lower text.
const heightByTone: Record<Props["fillTone"], string> = {
  olive: "h-[78px]",
  mid: "h-[60px]",
  light: "h-[42px]",
  dark: "h-[30px]",
};

export function FunnelBlock({ value, label, fillTone }: Props) {
  return (
    <div className="min-w-0">
      {/* Common baseline zone: text sits directly above the bar (moves down for smaller bars) */}
      <div className="mt-3 h-[120px] w-full flex items-end">
        <div className="w-full flex flex-col gap-2">
          {/* Value + label are positioned just ABOVE the bar (not “stuck” at the top) */}
          <div className="leading-none">
            <div className="text-lg font-semibold text-black/90">{value}</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black/55">
              {label}
            </div>
          </div>

          {/* Bar (bottom aligned by parent) */}
          <div
            className={cn(
              "w-full rounded-t-xl rounded-b-lg",
              heightByTone[fillTone],
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]",
              fillToneClasses[fillTone]
            )}
          />
        </div>
      </div>
    </div>
  );
}
