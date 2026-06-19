import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, updateDonor, updateBloodBank, updateSeeker, deleteUser, getAllRequests, updateRequestStatus } from "@/features/admin/api/admin";
import { BLOOD_GROUPS } from "@/config/constants";
import { Loader2, Edit2, Trash2, CheckCircle, XCircle, User, Building2, Search, ClipboardList, Save, X } from "lucide-react";
import toast from "react-hot-toast";

const groupColors = {
  "A+": "bg-red-100 text-red-800", "A-": "bg-pink-100 text-pink-800",
  "B+": "bg-orange-100 text-orange-800", "B-": "bg-amber-100 text-amber-800",
  "AB+": "bg-purple-100 text-purple-800", "AB-": "bg-violet-100 text-violet-800",
  "O+": "bg-green-100 text-green-800", "O-": "bg-teal-100 text-teal-800",
};

const tabs = [
  { key: "donors", icon: User, label: "Donors" },
  { key: "banks", icon: Building2, label: "Blood Banks" },
  { key: "seekers", icon: Search, label: "Seekers" },
  { key: "requests", icon: ClipboardList, label: "Requests" },
];

function EditableRow({ user, type, columns, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState({ ...user });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (type === "donor") await updateDonor(user.id, form);
      else if (type === "bank") await updateBloodBank(user.id, form);
      else if (type === "seeker") await updateSeeker(user.id, form);
      toast.success("Updated successfully!");
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <tr className="bg-blue-50">
      <td className="px-3 py-2">{user.id}</td>
      {columns.map((col) => (
        <td key={col.key} className="px-3 py-2">
          {col.editable ? (
            col.type === "select" ? (
              <select name={col.key} value={form[col.key] || ""} onChange={handleChange} className="h-7 rounded border px-1.5 text-xs">
                {(col.options || []).map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                type={col.inputType || "text"}
                name={col.key}
                value={form[col.key] || ""}
                onChange={handleChange}
                className="h-7 w-full rounded border px-1.5 text-xs"
              />
            )
          ) : (
            <span className="text-xs text-muted-foreground">{user[col.key] || "—"}</span>
          )}
        </td>
      ))}
      <td className="px-3 py-2">
        <div className="flex gap-1">
          <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-1 rounded bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50">
            <Save className="size-3" /> {saving ? "..." : "Save"}
          </button>
          <button onClick={onCancel} className="inline-flex items-center gap-1 rounded bg-gray-500 px-2 py-1 text-xs font-medium text-white hover:bg-gray-600">
            <X className="size-3" /> Cancel
          </button>
        </div>
      </td>
    </tr>
  );
}

function UserTable({ data, type, columns, onEdit, onDelete, editingId }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-red-50 text-xs uppercase text-red-800">
          <tr>
            <th className="px-3 py-3 font-semibold">ID</th>
            {columns.map((c) => <th key={c.key} className="px-3 py-3 font-semibold">{c.label}</th>)}
            <th className="px-3 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? data.map((item) =>
            editingId === item.id ? (
              <EditableRow
                key={item.id}
                user={item}
                type={type}
                columns={columns}
                onSave={() => onEdit(null)}
                onCancel={() => onEdit(null)}
                onDelete={() => onDelete(item.id, type)}
              />
            ) : (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">{item.id}</td>
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-3">
                    {col.render ? col.render(item) : item[col.key] ?? "—"}
                  </td>
                ))}
                <td className="px-3 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => onEdit(item.id)} className="inline-flex items-center gap-1 rounded bg-yellow-500 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-yellow-600">
                      <Edit2 className="size-3" /> Edit
                    </button>
                    <button onClick={() => { if (confirm("Delete this user?")) onDelete(item.id, type); }} className="inline-flex items-center gap-1 rounded bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-red-700">
                      <Trash2 className="size-3" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={columns.length + 2} className="px-3 py-12 text-center text-sm text-muted-foreground">
                No {type} found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function ManageUsers() {
  const [activeTab, setActiveTab] = useState("donors");
  const [editingId, setEditingId] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await getUsers();
      return res.data;
    },
  });

  const { data: requestsData, isLoading: reqLoading } = useQuery({
    queryKey: ["admin-all-requests"],
    queryFn: async () => {
      const res = await getAllRequests();
      return res.data;
    },
    enabled: activeTab === "requests",
  });

  const delMut = useMutation({
    mutationFn: ({ type, id }) => deleteUser(type, id),
    onSuccess: () => { toast.success("Deleted!"); queryClient.invalidateQueries({ queryKey: ["admin-users"] }); },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });

  const reqStatusMut = useMutation({
    mutationFn: ({ id, status }) => updateRequestStatus(id, status),
    onSuccess: () => { toast.success("Status updated!"); queryClient.invalidateQueries({ queryKey: ["admin-all-requests"] }); },
    onError: (err) => toast.error("Failed to update"),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-red-600" />
      </div>
    );
  }

  const counts = data?.counts || {};

  const donorCols = [
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email", editable: false },
    { key: "phone", label: "Phone", editable: true },
    { key: "blood_group", label: "Group", render: (d) => <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${groupColors[d.blood_group] || "bg-gray-100"}`}>{d.blood_group}</span>, editable: true, type: "select", options: BLOOD_GROUPS },
    { key: "age", label: "Age/Wt", render: (d) => `${d.age}/${d.weight}kg`, editable: true },
    { key: "status", label: "Status", render: (d) => <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${d.status === "available" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{d.status}</span>, editable: true, type: "select", options: ["available", "not_available"] },
  ];

  const bankCols = [
    { key: "full_name", label: "Bank Name", editable: true },
    { key: "email", label: "Email", editable: false },
    { key: "phone", label: "Phone", editable: true },
    { key: "registration_number", label: "Reg No", editable: true },
    { key: "status", label: "Status", render: (b) => <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${b.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{b.status}</span>, editable: true, type: "select", options: ["active", "inactive"] },
  ];

  const seekerCols = [
    { key: "full_name", label: "Name", editable: true },
    { key: "email", label: "Email", editable: false },
    { key: "phone", label: "Phone", editable: true },
    { key: "address", label: "Address", render: (s) => s.address?.length > 40 ? s.address.slice(0, 40) + "..." : s.address || "—", editable: true },
  ];

  const handleDelete = (id, type) => {
    delMut.mutate({ type, id });
  };

  return (
    <div className="mx-auto max-w-7xl">
      <h2 className="mb-1 text-2xl font-bold">Manage Users</h2>
      <hr className="mb-6" />

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-lg bg-gray-200 p-1">
        {tabs.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => { setActiveTab(key); setEditingId(null); }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition ${
              activeTab === key ? "bg-white text-red-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon className="size-4" />
            {label}
            {counts[key] > 0 && activeTab !== key && (
              <span className="rounded-full bg-gray-300 px-2 py-0.5 text-xs font-semibold text-gray-700">{counts[key]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Donors Tab */}
      {activeTab === "donors" && (
        <UserTable
          data={data?.donors}
          type="donor"
          columns={donorCols}
          onEdit={(id) => setEditingId(id)}
          onDelete={handleDelete}
          editingId={editingId}
        />
      )}

      {/* Banks Tab */}
      {activeTab === "banks" && (
        <UserTable
          data={data?.blood_banks}
          type="bank"
          columns={bankCols}
          onEdit={(id) => setEditingId(id)}
          onDelete={handleDelete}
          editingId={editingId}
        />
      )}

      {/* Seekers Tab */}
      {activeTab === "seekers" && (
        <UserTable
          data={data?.seekers}
          type="seeker"
          columns={seekerCols}
          onEdit={(id) => setEditingId(id)}
          onDelete={handleDelete}
          editingId={editingId}
        />
      )}

      {/* Requests Tab */}
      {activeTab === "requests" && (
        <>
          {reqLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-6 animate-spin text-red-600" />
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-red-50 text-xs uppercase text-red-800">
                  <tr>
                    <th className="px-3 py-3 font-semibold">ID</th>
                    <th className="px-3 py-3 font-semibold">Seeker</th>
                    <th className="px-3 py-3 font-semibold">Blood Bank</th>
                    <th className="px-3 py-3 font-semibold">Group</th>
                    <th className="px-3 py-3 font-semibold">Units</th>
                    <th className="px-3 py-3 font-semibold">Status</th>
                    <th className="px-3 py-3 font-semibold">Urgency</th>
                    <th className="px-3 py-3 font-semibold">Date</th>
                    <th className="px-3 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requestsData?.length > 0 ? requestsData.map((r) => (
                    <tr key={r.id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-3 font-medium">{r.id}</td>
                      <td className="px-3 py-3">{r.seeker_name}</td>
                      <td className="px-3 py-3">{r.bank_name}</td>
                      <td className="px-3 py-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${groupColors[r.blood_group] || "bg-gray-600"}`}>{r.blood_group}</span>
                      </td>
                      <td className="px-3 py-3">{r.quantity}</td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          r.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          r.status === "approved" ? "bg-green-100 text-green-800" :
                          r.status === "fulfilled" ? "bg-blue-100 text-blue-800" :
                          r.status === "rejected" ? "bg-red-100 text-red-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>{r.status}</span>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          r.urgency === "Emergency" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                        }`}>{r.urgency}</span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">{r.requested_date}</td>
                      <td className="px-3 py-3">
                        {r.status === "pending" ? (
                          <div className="flex gap-1">
                            <button onClick={() => reqStatusMut.mutate({ id: r.id, status: "approved" })}
                              className="inline-flex items-center gap-1 rounded bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700">
                              <CheckCircle className="size-3" /> Approve
                            </button>
                            <button onClick={() => reqStatusMut.mutate({ id: r.id, status: "rejected" })}
                              className="inline-flex items-center gap-1 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700">
                              <XCircle className="size-3" /> Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={9} className="px-3 py-12 text-center text-sm text-muted-foreground">No requests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
