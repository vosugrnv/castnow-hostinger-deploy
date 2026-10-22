"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ErrorBox,
  FilterChips,
  PageHeader,
  Spinner,
  StatusBadge,
  ToastView,
  useToast,
} from "@/components/ui";
import { deleteJob, listJobs, type AdminJobRow } from "@/lib/adminApi";
import { formatDateTimeVi } from "@/lib/format";

type StatusFilter = "" | "open" | "assigned" | "completed";

export default function JobsPage() {
  const [rows, setRows] = useState<AdminJobRow[]>([]);
  const [status, setStatus] = useState<StatusFilter>("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast, show } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listJobs({ status, search });
      setRows(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [status, search]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onDelete(job: AdminJobRow) {
    if (!window.confirm(`Xóa đơn tìm mẫu "${job.service_title}"? Hành động không thể hoàn tác.`)) return;
    try {
      await deleteJob(job.id);
      show("success", "Đã xóa đơn tìm mẫu.");
      void load();
    } catch (err) {
      show("error", err instanceof Error ? err.message : String(err));
    }
  }

  const total = rows[0]?.total_count ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Đơn tìm mẫu" sub="Khách đăng concept → mẫu báo giá → chốt mẫu → hoàn thành buổi chụp." />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterChips<StatusFilter>
          value={status}
          onChange={setStatus}
          options={[
            { value: "", label: "Tất cả" },
            { value: "open", label: "Đang tuyển" },
            { value: "assigned", label: "Đã chốt mẫu" },
            { value: "completed", label: "Hoàn thành" },
          ]}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tiêu đề, khách, TP…"
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
                <th className="admin-th">Dịch vụ</th>
                <th className="admin-th">Khách hàng</th>
                <th className="admin-th">Khu vực</th>
                <th className="admin-th">Lịch</th>
                <th className="admin-th">Mẫu ảnh</th>
                <th className="admin-th">Trạng thái</th>
                <th className="admin-th">Ngày tạo</th>
                <th className="admin-th"></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="admin-td py-10 text-center text-slate-500">
                    Chưa có đơn tìm mẫu nào
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td className="admin-td font-medium text-slate-900">{r.service_title}</td>
                    <td className="admin-td">
                      <div className="font-medium text-slate-800">{r.customer_name}</div>
                      <div className="text-xs text-slate-500">{r.customer_phone ?? "—"}</div>
                    </td>
                    <td className="admin-td">
                      <div>{r.city}</div>
                      <div className="text-xs text-slate-500">{r.address_label}</div>
                    </td>
                    <td className="admin-td text-slate-600">{r.schedule_text}</td>
                    <td className="admin-td text-slate-700">{r.assigned_worker_name ?? "—"}</td>
                    <td className="admin-td">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="admin-td text-slate-500">{formatDateTimeVi(r.created_at)}</td>
                    <td className="admin-td">
                      <button type="button" onClick={() => onDelete(r)} className="text-xs font-semibold text-red-600 hover:underline">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-slate-400">Tổng: {total} đơn</p>
      <ToastView toast={toast} />
    </div>
  );
}
