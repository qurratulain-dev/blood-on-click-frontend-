export function DonorDashboardSkeleton() {
  return (
    <div
      className="mx-auto max-w-6xl"
      role="status"
      aria-label="Loading your donor dashboard"
    >
      <div className="animate-pulse">
        <div className="h-3.5 w-28 rounded bg-gray-200" />
        <div className="mt-3 h-8 w-72 max-w-full rounded bg-gray-200" />
        <div className="mt-2 h-4 w-96 max-w-full rounded bg-gray-200" />
      </div>

      <div className="mt-8 animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-gray-200" />
            <div className="space-y-3">
              <div className="h-3.5 w-32 rounded bg-gray-200" />
              <div className="h-5 w-28 rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-11 w-44 rounded-xl bg-gray-200" />
        </div>
      </div>

      <div className="mt-6 grid animate-pulse gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-gray-200" />
              <div className="space-y-2">
                <div className="h-5 w-16 rounded bg-gray-200" />
                <div className="h-3 w-24 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 animate-pulse">
        <div className="h-4 w-32 rounded bg-gray-200" />
        <div className="mt-2 h-3.5 w-48 rounded bg-gray-200" />
      </div>

      <div className="mt-4 grid animate-pulse gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="size-10 rounded-lg bg-gray-200" />
            <div className="mt-3 h-4 w-28 rounded bg-gray-200" />
            <div className="mt-1.5 h-3 w-20 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="mt-8 animate-pulse">
        <div className="h-4 w-32 rounded bg-gray-200" />
        <div className="mt-2 h-3.5 w-48 rounded bg-gray-200" />
      </div>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white shadow-sm">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex animate-pulse items-center gap-4 border-t border-gray-100 px-5 py-3.5 first:border-t-0"
          >
            <div className="size-9 shrink-0 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 rounded bg-gray-200" />
              <div className="h-3 w-56 rounded bg-gray-200" />
            </div>
            <div className="h-6 w-12 shrink-0 rounded-full bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}