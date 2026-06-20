import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  deleteNotification,
} from "@/features/donor/api/donor";
import { Bell, BellOff, CheckCheck, Trash2, Loader2, RefreshCw, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Notifications() {
  const queryClient = useQueryClient();
  const [deleting, setDeleting] = useState(null);

  const { data: notifications, isLoading } = useQuery({
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
      toast.success("All notifications marked as read");
    },
    onError: () => {
      toast.error("Failed to mark all as read");
    },
  });

  const markReadMutation = useMutation({
    mutationFn: (id) => markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donor-notifications"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donor-notifications"] });
      toast.success("Notification deleted");
    },
    onError: () => {
      toast.error("Failed to delete notification");
    },
  });

  const handleDelete = (id) => {
    if (!confirm("Delete this notification?")) return;
    deleteMutation.mutate(id);
  };

  const unreadCount = (notifications || []).filter((n) => !n.is_read).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
      </div>
      <hr className="mb-6" />

      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => markAllMutation.mutate()}
          disabled={unreadCount === 0 || markAllMutation.isPending}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        >
          <CheckCheck className="size-4" />
          Mark All as Read
        </button>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ["donor-notifications"] })}
          className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          <RefreshCw className="size-4" />
          Refresh
        </button>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        {notifications?.length > 0 ? (
          <div className="divide-y">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start justify-between gap-4 px-5 py-4 transition ${
                  !n.is_read ? "border-l-4 border-red-500 bg-red-50/50" : ""
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Bell className={`size-4 ${n.is_read ? "text-gray-400" : "text-red-500"}`} />
                    <h6 className={`text-sm ${n.is_read ? "font-normal text-gray-700" : "font-semibold text-gray-900"}`}>
                      {n.title}
                    </h6>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{n.message}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="size-3" />
                    {new Date(n.created_at).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {!n.is_read && (
                    <button
                      onClick={() => markReadMutation.mutate(n.id)}
                      className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                      title="Mark as read"
                    >
                      <CheckCheck className="size-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(n.id)}
                    disabled={deleteMutation.isPending && deleting === n.id}
                    className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <BellOff className="size-12 text-gray-300" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
