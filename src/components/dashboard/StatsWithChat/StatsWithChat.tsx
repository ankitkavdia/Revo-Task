// src/components/dashboard/StatsWithChat/StatsWithChat.tsx
import React from "react";
import { InboxPanel } from "@/components/inbox/InboxPanel";

/**
 * Chat UI only. No open/close state here.
 * (State lives in DashboardPage via DashboardRightRail.)
 */
export function StatsWithChat() {
  return (
    <div className="min-w-0">
      <InboxPanel />
    </div>
  );
}
