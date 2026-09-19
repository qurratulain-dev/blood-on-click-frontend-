export function DonorDonationHistorySkeleton() {
  return (
    <div role="status" aria-label="Loading your donation history" className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex items-center gap-3 sm:w-36 sm:shrink-0">
              <div className="size-9 shrink-0 rounded-lg bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-3 w-14 rounded bg-gray-200" />
              </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="h-4 w-48 max-w-full rounded bg-gray-200" />
              <div className="h-3 w-64 max-w-full rounded bg-gray-200" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-6 w-12 rounded-full bg-gray-200" />
              <div className="h-6 w-20 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}