"use client";

import { useCallback, useEffect, useState } from "react";

import { ErrorBox, PageHeader, Spinner } from "@/components/ui";
import { listProfiles, type AdminProfileRow } from "@/lib/adminApi";
import { formatDateTimeVi, formatVnd } from "@/lib/format";

export default function WorkersPage() {
  const [rows, setRows] = useState<AdminProfileRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await listProfiles({ role: "worker", search }));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    void load();
  }, [load]);

  const total = rows[0]?.total_count ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Mẫu ảnh / Đối tác" sub="Danh sách tài khoản đã là mẫu ảnh trên CastNow." />

      <div className="flex justify-end">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên, SĐT…"
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
                <th className="admin-th">Mẫu ảnh</th>
                <th className="admin-th">SĐT</th>
                <th className="admin-th">Số dư ví</th>
                <th className="admin-th">Trạng thái</th>
                <th className="admin-th">Tạo lúc</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-td py-10 text-center text-slate-500">
                    Chưa có mẫu ảnh nào
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
                      {r.is_active ? (
                        <span className="admin-badge-emerald">Hoạt động</span>
                      ) : (
                        <span className="admin-badge-red">Đã khóa</span>
                      )}
                    </td>
                    <td className="admin-td text-slate-500">{formatDateTimeVi(r.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-slate-400">Tổng: {total} mẫu ảnh</p>
    </div>
  );
}
