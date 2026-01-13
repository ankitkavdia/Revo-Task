// src/pages/DashboardPage.tsx
import React from "react";

import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { NeedsApproval } from "@/components/dashboard/NeedsApproval/NeedsApproval";
import { PartnerFunnel } from "@/components/dashboard/PartnerFunnel/PartnerFunnel";
import { PayoutsLastQuarter } from "@/components/dashboard/PayoutsLastQuarter/PayoutsLastQuarter";
import { StatCard } from "@/components/dashboard/Stats/StatCard";
import { ProgramGrowth } from "@/components/dashboard/ProgramGrowth/ProgramGrowth";
import { LatestUpdates } from "@/components/dashboard/LatestUpdates";
import { TopTabs } from "@/components/dashboard/TopTabs";
import { DashboardRightRail } from "@/components/dashboard/DashboardRightRail/DashboardRightRail";

export function DashboardPage() {
  // ✅ default CLOSED
  const [chatOpen, setChatOpen] = React.useState(false);

  return (
    <>
      <Header />
      <LatestUpdates />
      <TopTabs />

      <PageContainer>
        <div className="grid grid-cols-1 gap-6 xl:flex xl:gap-6">
          {/* MAIN */}
          <div className="min-w-0 flex-1 space-y-6">
            <NeedsApproval />

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-4">
                <PayoutsLastQuarter />
              </div>
              <div className="col-span-12 lg:col-span-8">
                <PartnerFunnel />
              </div>
            </div>

            {/* Stat cards ABOVE ProgramGrowth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Outreached"
                value="1,240"
                note="+15%"
                icon="target"
                density={chatOpen ? "compact" : "wide"}
              />
              <StatCard
                title="Onboarded"
                value="85"
                note="+8%"
                icon="check"
                density={chatOpen ? "compact" : "wide"}
              />
              <StatCard
                title="Awaiting Deliverables"
                value="12"
                icon="watch"
                density={chatOpen ? "compact" : "wide"}
              />
            </div>

            <ProgramGrowth />
          </div>

          {/* RIGHT (xl+ only) */}
          <DashboardRightRail chatOpen={chatOpen} onChatOpenChange={setChatOpen} />
        </div>
      </PageContainer>
    </>
  );
}
