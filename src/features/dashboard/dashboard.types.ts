export type ActivityChip = {
  id: string
  title: string
  subtitle: string
  avatarText: string
  avatarTone: "neutral" | "blue" | "red" | "green" | "yellow"
}

export type ApprovalItem = {
  id: string
  brand: string
  action: string
  time: string
  avatarText: string
  avatarTone: "orange" | "blue" | "purple" | "green"
}

export type InboxMessage = {
  id: string
  name: string
  message: string
  time: string
  unreadCount?: number
}

export type ProgramRow = {
  id: string
  name: string
  partners: number
  percent: number
}

export type DashboardOverview = {
  user: { firstName: string }
  meta: { name: string; id: string; status: "In progress" | "Active" }
  activity: ActivityChip[]
  approvals: { total: number; items: ApprovalItem[] }
  payouts: { label: string; value: string; noteRight: string }
  funnel: {
    uplift: string
    subnote: string
    blocks: Array<{ label: string; value: string; tone: "a" | "b" | "c" | "d" }>
  }
  kpis: Array<{ id: string; title: string; value: string; foot?: string; pill?: string }>
  program: { uplift: string; pill: string; rows: ProgramRow[] }
  inbox: { messages: InboxMessage[] }
}
