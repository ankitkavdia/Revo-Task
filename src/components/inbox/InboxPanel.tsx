import { MessageItem } from "./MessageItem"

export function InboxPanel() {
  return (
    <aside className="rounded-2xl bg-white p-4 flex flex-col h-full">
      <div className="flex-1 space-y-3">
        <MessageItem name="Sarah Jenkins" text="Can we schedule a call?" />
        <MessageItem name="Mike Ross" text="Agreement looks good." />
        <MessageItem name="Elena Fisher" text="Attribution question." />
      </div>

      <input
        placeholder="Quick reply..."
        className="mt-3 rounded-xl border px-4 py-2 text-sm"
      />

      <button className="mt-3 rounded-xl bg-black py-2 text-white text-sm">
        AI Chat Assistant
      </button>
    </aside>
  )
}
