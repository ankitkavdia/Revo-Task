type MessageItemProps = {
  name: string
  message: string
  time?: string
  unread?: boolean
}

export function MessageItem({
  name,
  message,
  time,
  unread = false,
}: MessageItemProps) {
  return (
    <div
      className={[
        "flex items-start gap-3 rounded-xl p-3 cursor-pointer transition",
        unread ? "bg-black/5" : "hover:bg-black/5",
      ].join(" ")}
    >
      {/* Avatar */}
      <div className="h-9 w-9 rounded-full bg-black/10 flex items-center justify-center text-sm font-semibold">
        {name.charAt(0)}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{name}</p>
          {time && (
            <span className="text-[10px] text-black/40">{time}</span>
          )}
        </div>

        <p className="text-xs text-black/50 truncate">
          {message}
        </p>
      </div>
    </div>
  )
}
