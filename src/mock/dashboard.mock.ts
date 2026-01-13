export const approvalItems = [
  { id: 1, name: "UrbanFit Life", action: "Approve Content", avatar: "U", time: "2h ago" },
  { id: 2, name: "TechSavvy Mom", action: "Approve Commission", avatar: "T", time: "5h ago" },
  { id: 3, name: "Daily Gadgets", action: "Validate Lead", avatar: "D", time: "1d ago" },
  { id: 4, name: "Yoga with Jen", action: "Approve Invoice", avatar: "Y", time: "1d ago" },
]


export const latestUpdates = [
  {
    initials: "CD",
    name: "CreativeDir",
    subtitle: "Q4 Brand Assets are live ...",
    avatarBg: "#0ea5e9",
    active: true,
  },
  {
    initials: "ED",
    name: "Editor",
    subtitle: "First draft of the “Unboxi...”",
    avatarBg: "#ef4444",
    active: true,
  },
  {
    initials: "MB",
    name: "MediaBuyer",
    subtitle: "ROAS is up 15% on the ...",
    avatarBg: "#f43f5e",
    active: true,
  },
  {
    initials: "SJ",
    name: "Sarah J.",
    subtitle: "Velto Inc. approved the ...",
    avatarBg: "#111827",
    active: true,
  },
  {
    initials: "MT",
    name: "MediaTeam",
    subtitle: "Premium inventory secur...",
    avatarBg: "#ef4444",
    active: true,
  },
  {
    initials: "SB",
    name: "SocialBot",
    subtitle: "Instagram engagement u...",
    avatarBg: "#16a34a",
    active: true,
  },
] as const;


export const topTabs = [
  { key: "performance", label: "Performance", metric: "$334.4k" },
  { key: "social", label: "Social", metric: "24M Views" },
  { key: "partners", label: "Partners", metric: "400 rebates" },
  { key: "campaigns", label: "Campaigns", metric: "1500 review" },
  { key: "content", label: "Content", metric: "30k assets" },
  { key: "inbox", label: "Inbox", metric: "40 unread" },
  { key: "operations", label: "Operations", metric: "12 Active" },
  { key: "expenses", label: "Expenses", metric: "20 requests" },
] as const;
