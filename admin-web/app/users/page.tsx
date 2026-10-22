"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ErrorBox,
  FilterChips,
  PageHeader,
  Spinner,
  ToastView,
  useToast,
} from "@/components/ui";
import { listProfiles, setUserActive, setUserRole, type AdminProfileRow } from "@/lib/adminApi";
import { formatDateTimeVi, formatVnd } from "@/lib/format";

type RoleFilter = "" | "customer" | "worker" | "admin";

const ROLE_LABEL: Record<string, string> = {
  customer: "Khách",
  worker: "Mẫu ảnh",
  admin: "Admin",
};

export default function UsersPage() {
  const [rows, setRows] = useState<AdminProfileRow[]>([]);
  const [role, setRole] = useState<RoleFilter>("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast, show } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await listProfiles({ role, search }));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [role, search]);

  useEffect(() => {
    void load();
  }, [load]);

  async function changeRole(row: AdminProfileRow, nextRole: string) {
    if (nextRole === row.role) return;
    if (!window.confirm(`Đổi vai trò "${row.full_name ?? row.phone}" thành ${ROLE_LABEL[nextRole]}?`)) return;
    try {
      await setUserRole(row.id, nextRole);
      show("success", "Đã cập nhật vai trò.");
      void load();
    } catch (err) {
      show("error", err instanceof Error ? err.message : String(err));
    }
  }

  async function toggleActive(row: AdminProfileRow) {
    try {
      await setUserActive(row.id, !row.is_active);
      show("success", row.is_active ? "Đã khóa tài khoản." : "Đã mở khóa tài khoản.");
      void load();
    } catch (err) {
      show("error", err instanceof Error ? err.message : String(err));
    }
  }

  const total = rows[0]?.total_count ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Quản lý Users" sub="Toàn bộ tài khoản: đổi vai trò (khách/mẫu ảnh/admin), khóa/mở tài khoản." />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterChips<RoleFilter>
          value={role}
          onChange={setRole}
          options={[
            { value: "", label: "Tất cả" },
            { value: "customer", label: "Khách" },
            { value: "worker", label: "Mẫu ảnh" },
            { value: "admin", label: "Admin" },
          ]}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên, SĐT, email…"
          className="admin-input max-w-xs"
        />
      </div>

      {error ? <ErrorBox message={error} /> : null}

      <div className="admin-table-wrap overflow-x-auto">
        {loading ? (
          <Spinner />
        ) : (
          <table className="admin-table">
            <thead className="admin-thead">
              <tr>
                <th className="admin-th">Người dùng</th>
                <th className="admin-th">SĐT</th>
                <th className="admin-th">Số dư ví</th>
                <th className="admin-th">Vai trò</th>
                <th className="admin-th">Trạng thái</th>
                <th className="admin-th">Tạo lúc</th>
                <th className="admin-th"></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="admin-td py-10 text-center text-slate-500">
                    Không có người dùng nào
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td className="admin-td">
                      <div className="font-medium text-slate-900">{r.full_name || "—"}</div>
                      <div className="text-xs text-slate-400">{r.email || ""}</div>
                    </td>
                    <td className="admin-td text-slate-700">{r.phone ?? "—"}</td>
                    <td className="admin-td font-semibold text-slate-900">{formatVnd(r.available_balance)}</td>
                    <td className="admin-td">
                      <select
                        value={r.role}
                        onChange={(e) => changeRole(r, e.target.value)}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700"
                      >
                        <option value="customer">Khách</option>
                        <option value="worker">Mẫu ảnh</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="admin-td">
                      {r.is_active ? (
                        <span className="admin-badge-emerald">Hoạt động</span>
                      ) : (
                        <span className="admin-badge-red">Đã khóa</span>
                      )}
                    </td>
                    <td className="admin-td text-slate-500">{formatDateTimeVi(r.created_at)}</td>
                    <td className="admin-td">
                      <button
                        type="button"
                        onClick={() => toggleActive(r)}
                        className={`text-xs font-semibold hover:underline ${r.is_active ? "text-red-600" : "text-emerald-600"}`}
                      >
                        {r.is_active ? "Khóa" : "Mở khóa"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-slate-400">Tổng: {total} người dùng</p>
      <ToastView toast={toast} />
    </div>
  );
}
