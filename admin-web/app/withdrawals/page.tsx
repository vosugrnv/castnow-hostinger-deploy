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
import { listWithdrawals, processWithdrawal, type AdminWithdrawalRow } from "@/lib/adminApi";
import { formatDateTimeVi, formatVnd } from "@/lib/format";

type StatusFilter = "pending" | "succeeded" | "cancelled" | "";

export default function WithdrawalsPage() {
  const [rows, setRows] = useState<AdminWithdrawalRow[]>([]);
  const [status, setStatus] = useState<StatusFilter>("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const { toast, show } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await listWithdrawals({ status }));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    void load();
  }, [load]);

  async function process(row: AdminWithdrawalRow, approve: boolean) {
    let note: string | undefined;
    if (approve) {
      if (!window.confirm(`Xác nhận đã chuyển ${formatVnd(row.amount)} cho ${row.owner_name}? Số dư sẽ bị trừ.`)) return;
    } else {
      note = window.prompt("Lý do từ chối (tùy chọn):") ?? undefined;
    }
    setBusyId(row.id);
    try {
      await processWithdrawal({ withdrawalId: row.id, approve, note });
      show("success", approve ? "Đã duyệt rút tiền." : "Đã từ chối yêu cầu.");
      void load();
    } catch (err) {
      show("error", err instanceof Error ? err.message : String(err));
    } finally {
      setBusyId(null);
    }
  }

  const total = rows[0]?.total_count ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Duyệt rút tiền" sub="Yêu cầu rút tiền của mẫu ảnh. Duyệt = trừ số dư; Từ chối = hủy yêu cầu." />

      <FilterChips<StatusFilter>
        value={status}
        onChange={setStatus}
        options={[
          { value: "pending", label: "Chờ duyệt" },
          { value: "succeeded", label: "Đã chuyển" },
          { value: "cancelled", label: "Đã hủy" },
          { value: "", label: "Tất cả" },
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
                <th className="admin-th">Mẫu ảnh</th>
                <th className="admin-th">Số tiền</th>
                <th className="admin-th">Ngân hàng</th>
                <th className="admin-th">Trạng thái</th>
                <th className="admin-th">Yêu cầu lúc</th>
                <th className="admin-th"></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-td py-10 text-center text-slate-500">
                    Không có yêu cầu nào
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td className="admin-td">
                      <div className="font-medium text-slate-900">{r.owner_name || "—"}</div>
                      <div className="text-xs text-slate-400">{r.owner_phone ?? ""}</div>
                    </td>
                    <td className="admin-td font-semibold text-slate-900">{formatVnd(r.amount)}</td>
                    <td className="admin-td text-slate-700">
                      <div className="font-medium">{r.bank_name}</div>
                      <div className="text-xs text-slate-500">
                        {r.bank_account_no} · {r.bank_account_name}
                      </div>
                    </td>
                    <td className="admin-td">
                      <StatusBadge status={r.tx_status} />
                      {r.admin_note ? <div className="mt-1 text-xs text-slate-400">{r.admin_note}</div> : null}
                    </td>
                    <td className="admin-td text-slate-500">{formatDateTimeVi(r.created_at)}</td>
                    <td className="admin-td">
                      {r.tx_status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={busyId === r.id}
                            onClick={() => process(r, true)}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
                          >
                            Duyệt
                          </button>
                          <button
                            type="button"
                            disabled={busyId === r.id}
                            onClick={() => process(r, false)}
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500 disabled:opacity-50"
                          >
                            Từ chối
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">{formatDateTimeVi(r.processed_at)}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-slate-400">Tổng: {total} yêu cầu</p>
      <ToastView toast={toast} />
    </div>
  );
}
