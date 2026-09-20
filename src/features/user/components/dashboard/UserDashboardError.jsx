import { CircleAlert, RefreshCw } from "lucide-react";

export function UserDashboardError({ onRetry }) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="motion-safe:animate-fade-up flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
        <div className="flex size-12 items-center justify-center rounded-xl bg-red-50">
          <CircleAlert className="size-6 text-red-600" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            We couldn't load your dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Please try again in a moment.</p>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          Try again
        </button>
      </div>
    </div>
  );
}