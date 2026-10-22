"use client";

import { useCallback, useEffect, useState } from "react";

import { ErrorBox, FilterChips, PageHeader, Spinner, StatusBadge } from "@/components/ui";
import { listBookings, type AdminBookingRow } from "@/lib/adminApi";
import { formatDateTimeVi, formatVnd, shortId } from "@/lib/format";

type StatusFilter = "" | "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

export default function BookingsPage() {
  const [rows, setRows] = useState<AdminBookingRow[]>([]);
  const [status, setStatus] = useState<StatusFilter>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await listBookings({ status }));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    void load();
  }, [load]);

  const total = rows[0]?.total_count ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Đơn đặt lịch" sub="Đơn đặt lịch buổi chụp giữa khách và mẫu ảnh." />

      <FilterChips<StatusFilter>
        value={status}
        onChange={setStatus}
        options={[
          { value: "", label: "Tất cả" },
          { value: "pending", label: "Chờ xử lý" },
          { value: "confirmed", label: "Đã xác nhận" },
          { value: "in_progress", label: "Đang chụp" },
          { value: "completed", label: "Hoàn thành" },
          { value: "cancelled", label: "Đã hủy" },
        ]}
      />

      {error ? <ErrorBox message={error} /> : null}

      <div className="admin-table-wrap overflow-x-auto">
        {loading ? (
          <Spinner />
        ) : (
          <table className="admin-table">
            <thead className="admin-thead">
              <tr>
                <th className="admin-th">Mã</th>
                <th className="admin-th">Khách hàng</th>
                <th className="admin-th">Mẫu ảnh</th>
                <th className="admin-th">Dịch vụ</th>
                <th className="admin-th">Lịch hẹn</th>
                <th className="admin-th">Tổng tiền</th>
                <th className="admin-th">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="admin-td py-10 text-center text-slate-500">
                    Chưa có đơn đặt lịch nào
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td className="admin-td font-mono text-xs text-slate-500">{r.booking_code ?? shortId(r.id)}</td>
                    <td className="admin-td font-medium text-slate-900">{r.customer_name ?? "—"}</td>
                    <td className="admin-td text-slate-700">{r.worker_name ?? "—"}</td>
                    <td className="admin-td text-slate-700">{r.service_name ?? "—"}</td>
                    <td className="admin-td text-slate-500">{formatDateTimeVi(r.scheduled_start_at)}</td>
                    <td className="admin-td font-semibold text-slate-900">{formatVnd(r.total_amount)}</td>
                    <td className="admin-td">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-slate-400">Tổng: {total} đơn</p>
    </div>
  );
}
