"use client";

import { useCallback, useEffect, useState } from "react";

import { ErrorBox, FilterChips, PageHeader, Spinner, StatusBadge } from "@/components/ui";
import { listTransactions, type AdminTxRow } from "@/lib/adminApi";
import { formatDateTimeVi, formatVnd } from "@/lib/format";

type TypeFilter = "" | "topup" | "withdrawal" | "booking_income" | "booking_payment" | "refund" | "adjustment";

const TYPE_LABEL: Record<string, string> = {
  topup: "Nạp tiền",
  withdrawal: "Rút tiền",
  booking_income: "Thu nhập đơn",
  booking_payment: "Phí dịch vụ",
  refund: "Hoàn tiền",
  adjustment: "Điều chỉnh",
};

export default function TransactionsPage() {
  const [rows, setRows] = useState<AdminTxRow[]>([]);
  const [txType, setTxType] = useState<TypeFilter>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await listTransactions({ txType }));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [txType]);

  useEffect(() => {
    void load();
  }, [load]);

  const total = rows[0]?.total_count ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Giao dịch ví" sub="Toàn bộ biến động ví: nạp, rút, phí dịch vụ, hoàn tiền, điều chỉnh." />

      <FilterChips<TypeFilter>
        value={txType}
        onChange={setTxType}
        options={[
          { value: "", label: "Tất cả" },
          { value: "topup", label: "Nạp tiền" },
          { value: "withdrawal", label: "Rút tiền" },
          { value: "booking_payment", label: "Phí dịch vụ" },
          { value: "booking_income", label: "Thu nhập đơn" },
          { value: "refund", label: "Hoàn tiền" },
          { value: "adjustment", label: "Điều chỉnh" },
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
                <th className="admin-th">Chủ ví</th>
                <th className="admin-th">Loại</th>
                <th className="admin-th">Số tiền</th>
                <th className="admin-th">Trạng thái</th>
                <th className="admin-th">Ghi chú</th>
                <th className="admin-th">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-td py-10 text-center text-slate-500">
                    Chưa có giao dịch nào
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td className="admin-td">
                      <div className="font-medium text-slate-900">{r.owner_name || "—"}</div>
                      <div className="text-xs text-slate-400">{r.owner_phone ?? ""}</div>
                    </td>
                    <td className="admin-td">
                      <span className="admin-badge-slate">{TYPE_LABEL[r.tx_type] ?? r.tx_type}</span>
                    </td>
                    <td className="admin-td font-semibold text-slate-900">{formatVnd(r.amount)}</td>
                    <td className="admin-td">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="admin-td text-slate-500">{r.note ?? "—"}</td>
                    <td className="admin-td text-slate-500">{formatDateTimeVi(r.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-slate-400">Tổng: {total} giao dịch</p>
    </div>
  );
}
