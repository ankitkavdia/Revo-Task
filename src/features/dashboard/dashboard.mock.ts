import type { DashboardOverview } from "./dashboard.types"

export const dashboardMock: DashboardOverview = {
  user: { firstName: "Combina" },
  meta: { name: "Velto", id: "5732", status: "In progress" },
  activity: [
    { id: "latest", title: "LATEST", subtitle: "Updates", avatarText: "A", avatarTone: "neutral" },
    { id: "cdir", title: "CreativeDir", subtitle: "Q4 Brand Assets are live…", avatarText: "CD", avatarTone: "blue" },
    { id: "editor", title: "Editor", subtitle: "First draft of the “Unbox…”", avatarText: "ED", avatarTone: "red" },
    { id: "buyer", title: "MediaBuyer", subtitle: "ROAS is up 15% on the…", avatarText: "MB", avatarTone: "yellow" },
    { id: "sarah", title: "Sarah J.", subtitle: "Velto Inc. approved the…", avatarText: "SJ", avatarTone: "green" },
    { id: "team", title: "MediaTeam", subtitle: "Premium inventory secur…", avatarText: "MT", avatarTone: "red" },
    { id: "bot", title: "SocialBot", subtitle: "Instagram engagement u…", avatarText: "SB", avatarTone: "green" },
  ],
  approvals: {
    total: 4,
    items: [
      { id: "a1", brand: "UrbanFit Life", action: "Approve Content", time: "2h ago", avatarText: "U", avatarTone: "orange" },
      { id: "a2", brand: "TechSavvy Mom", action: "Approve Commission", time: "5h ago", avatarText: "T", avatarTone: "blue" },
      { id: "a3", brand: "Daily Gadgets", action: "Validate Lead", time: "1d ago", avatarText: "D", avatarTone: "purple" },
      { id: "a4", brand: "Yoga with Jen", action: "Approve Invoice", time: "1d ago", avatarText: "Y", avatarTone: "green" },
    ],
  },
  payouts: { label: "Payouts last quarter", value: "+350%", noteRight: "$2.5 m" },
  funnel: {
    uplift: "+37%",
    subnote: "6,653 growth in\nclosed sales",
    blocks: [
      { label: "Total Market", value: "142,382", tone: "a" },
      { label: "Prospects", value: "87,027", tone: "b" },
      { label: "Leads", value: "48,027", tone: "c" },
      { label: "Sales", value: "32,027", tone: "d" },
    ],
  },
  kpis: [
    { id: "k1", title: "Outreached", value: "1,240", foot: "Partners Contacted", pill: "+15%" },
    { id: "k2", title: "Onboarded", value: "85", foot: "Active in Program", pill: "+8%" },
    { id: "k3", title: "Awaiting Deliverables", value: "12", foot: "Pending Content" },
  ],
  program: {
    uplift: "+124",
    pill: "This Month",
    rows: [
      { id: "p1", name: "Levanta", partners: 45, percent: 88 },
      { id: "p2", name: "Impact", partners: 32, percent: 62 },
      { id: "p3", name: "Social Snowball", partners: 28, percent: 48 },
      { id: "p4", name: "Shopify Collabs", partners: 19, percent: 34 },
    ],
  },
  inbox: {
    messages: [
      { id: "m1", name: "Sarah Jenkins", message: "The new assets for the campaign look amazing! Can we schedule a call to discuss the rollout?", time: "2m ago", unreadCount: 2 },
      { id: "m2", name: "Mike Ross", message: "Just sent over the revised agreement. Let me know if you need anything else modified.", time: "1h ago" },
      { id: "m3", name: "Elena Fisher", message: "I have some questions about the attribution window for the “Summer Glow” bundle.", time: "3h ago", unreadCount: 5 },
      { id: "m4", name: "David Kim", message: "The referral links are working perfectly now. Thanks for the quick fix on the tracking!", time: "5h ago", unreadCount: 1 },
      { id: "m5", name: "Alex Morgan", message: "Can we push the meeting to next Tuesday?", time: "6h ago" },
      { id: "m6", name: "Jessica Lee", message: "Invoice #4022 has been paid. Thanks!", time: "1d ago", unreadCount: 3 },
    ],
  },
}
