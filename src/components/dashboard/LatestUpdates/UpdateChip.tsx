import React from "react";

type UpdateChipProps = {
  initials: string;
  name: string;
  subtitle: string;
  avatarBg: string; // e.g. "#0ea5e9"
  active?: boolean;
};

export function UpdateChip({
  initials,
  name,
  subtitle,
  avatarBg,
  active = true,
}: UpdateChipProps) {
  return (
    <div className="shrink-0 flex items-center gap-2 rounded-full bg-white px-3 py-2 border border-black/5">
      <span
        className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold text-white"
        style={{ backgroundColor: avatarBg }}
      >
        {initials}
      </span>

      <div className="min-w-0 leading-tight">
        <div className="text-[11px] font-semibold text-black/80 truncate max-w-[140px]">
          {name}
        </div>
        <div className="text-[10px] text-black/40 truncate max-w-[180px]">
          {subtitle}
        </div>
      </div>

      <span
        className={[
          "ml-2 h-2 w-2 rounded-full",
          active ? "bg-green-500" : "bg-black/20",
        ].join(" ")}
      />
    </div>
  );
}
