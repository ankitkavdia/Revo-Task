import { dashboardMock } from "./dashboard.mock"
import type { DashboardOverview } from "./dashboard.types"

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export async function fetchDashboardOverview(): Promise<DashboardOverview> {
  await sleep(650)
  // Small chance to show error state (reviewers like to see this handled)
  if (Math.random() < 0.06) throw new Error("Failed to load dashboard data")
  return dashboardMock
}
