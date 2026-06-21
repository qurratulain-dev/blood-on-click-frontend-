import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markNotificationRead } from "@/features/bloodBank/api/bloodBank";
import { Bell, CheckCheck, Loader2, Clock } from "lucide-react";
import { toast } from "sonner";

export function BankNotifications() {
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["blood-bank-notifications"],
    queryFn: async () => {
      const res = await getNotifications();
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (id) => markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blood-bank-notifications"] });
      toast.success("Notification marked as read");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-red-600" />
      </div>
    );
  }

  const unreadCount = notifications?.filter((n) => !n.is_read).length || 0;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "No unread notifications"}
          </p>
        </div>
      </div>
      <hr className="mb-6" />

      {notifications?.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`rounded-xl border p-4 shadow-sm transition ${
                !n.is_read ? "border-red-200 bg-red-50" : "bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 flex size-8 items-center justify-center rounded-full ${
                    !n.is_read ? "bg-red-200" : "bg-gray-100"
                  }`}>
                    <Bell className={`size-4 ${!n.is_read ? "text-red-600" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${!n.is_read ? "font-semibold" : "text-gray-600"}`}>
                      {n.title}
                    </p>
                    <p className="text-xs text-gray-500">{n.message}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="size-3" />
                      {n.created_at || "Recently"}
                    </p>
                  </div>
                </div>
                {!n.is_read && (
                  <button
                    onClick={() => mutation.mutate(n.id)}
                    disabled={mutation.isPending}
                    className="flex shrink-0 items-center gap-1 rounded bg-white px-2.5 py-1 text-xs font-medium text-red-600 shadow-sm hover:bg-red-50 disabled:opacity-50"
                  >
                    <CheckCheck className="size-3" />
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Bell className="size-12 text-gray-300" />
          <p className="text-sm text-muted-foreground">No notifications yet</p>
        </div>
      )}
    </div>
  );
}
