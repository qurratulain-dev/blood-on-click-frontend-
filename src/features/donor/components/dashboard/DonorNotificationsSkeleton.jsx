export function DonorNotificationsSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading your notifications"
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse p-4 sm:p-5 ${i > 0 ? "border-t border-gray-100" : ""}`}
        >
          <div className="flex items-start gap-3">
            <div className="size-9 shrink-0 rounded-lg bg-gray-200" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="h-4 w-40 max-w-full rounded bg-gray-200" />
              <div className="h-3 w-full max-w-md rounded bg-gray-200" />
              <div className="h-3 w-28 max-w-full rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}