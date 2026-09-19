import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Bell,
  BellOff,
  CheckCheck,
  RefreshCw,
  CircleAlert,
  ArrowRight,
  Clock,
} from "lucide-react";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/features/donor/api/donor";
import { DonorNotificationsSkeleton } from "@/features/donor/components/dashboard/DonorNotificationsSkeleton";

const PREVIEW_LIMIT = 5;

function formatTimestamp(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DonorNotificationsEmpty() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-gray-200 bg-white px-5 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-red-50">
        <BellOff className="size-6 text-red-600" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-gray-900">You're all caught up</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Updates about your account and donation activity will appear here.
      </p>
    </div>
  );
}

function DonorNotificationsError({ onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-red-50">
        <CircleAlert className="size-6 text-red-600" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-gray-900">We couldn't load your notifications</p>
      <p className="max-w-sm text-sm text-muted-foreground">Please try again in a moment.</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        <RefreshCw className="size-4" aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}

function NotificationItem({ notification, onMarkRead, isMarkingRead }) {
  const unread = !notification.is_read;

  return (
    <li
      className={`flex items-start justify-between gap-4 p-4 sm:p-5 ${
        unread ? "border-l-4 border-red-500 bg-red-50/50" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
          <Bell
            className={`size-4 ${unread ? "text-red-600" : "text-gray-400"}`}
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className={`text-sm ${unread ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
              {notification.title}
            </p>
            {unread && (
              <span className="sr-only">Unread</span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{notification.message}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
            <Clock className="size-3 shrink-0" aria-hidden="true" />
            {formatTimestamp(notification.created_at)}
          </p>
        </div>
      </div>
      {unread && (
        <button
          type="button"
          onClick={() => onMarkRead(notification.id)}
          disabled={isMarkingRead}
          aria-label="Mark as read"
          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50"
        >
          <CheckCheck className="size-4" aria-hidden="true" />
        </button>
      )}
    </li>
  );
}

export function DonorNotifications() {
  const queryClient = useQueryClient();

  const { data: notifications, isPending, isError, refetch } = useQuery({
    queryKey: ["donor-notifications"],
    queryFn: async () => {
      const res = await getNotifications();
      return res.data;
    },
  });

  const markAllMutation = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donor-notifications"] });
    },
  });

  const markReadMutation = useMutation({
    mutationFn: (id) => markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donor-notifications"] });
    },
  });

  const unreadCount = (notifications || []).filter((n) => !n.is_read).length;
  const preview = (notifications || []).slice(0, PREVIEW_LIMIT);

  return (
    <section className="motion-safe:animate-fade-up [animation-delay:360ms]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-wide text-red-600">Updates</p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900">
            Your notifications
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread update${unreadCount > 1 ? "s" : ""}.`
              : "Updates relevant to your account and donation activity."}
          </p>
        </div>
        {!isPending && !isError && unreadCount > 0 && (
          <button
            type="button"
            onClick={() => markAllMutation.mutate()}
            disabled={markAllMutation.isPending}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50"
          >
            <CheckCheck className="size-4" aria-hidden="true" />
            Mark all as read
          </button>
        )}
      </div>

      <div className="mt-5">
        {isPending ? (
          <DonorNotificationsSkeleton />
        ) : isError ? (
          <DonorNotificationsError onRetry={() => refetch()} />
        ) : preview.length > 0 ? (
          <>
            <ul className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm divide-y">
              {preview.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={markReadMutation.mutate}
                  isMarkingRead={markReadMutation.isPending}
                />
              ))}
            </ul>
            <p className="mt-3 text-right">
              <Link
                to="/donor/notifications"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-red-600 transition hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                View all notifications
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </p>
          </>
        ) : (
          <DonorNotificationsEmpty />
        )}
      </div>
    </section>
  );
}