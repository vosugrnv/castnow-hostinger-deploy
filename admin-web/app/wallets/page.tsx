"use client";

import { useCallback, useEffect, useState } from "react";

import { ErrorBox, PageHeader, Spinner, ToastView, useToast } from "@/components/ui";
import { adjustWallet, listWallets, type AdminWalletRow } from "@/lib/adminApi";
import { formatVnd, parseVndInput } from "@/lib/format";

export default function WalletsPage() {
  const [rows, setRows] = useState<AdminWalletRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminWalletRow | null>(null);
  const { toast, show } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await listWallets({ search }));
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
      <PageHeader title="Ví người dùng" sub="Số dư khả dụng và chờ xử lý. Có thể điều chỉnh thủ công (cộng/trừ)." />

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
                <th className="admin-th">Chủ ví</th>
                <th className="admin-th">SĐT</th>
                <th className="admin-th">Khả dụng</th>
                <th className="admin-th">Chờ xử lý</th>
                <th className="admin-th"></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-td py-10 text-center text-slate-500">
                    Không có ví nào
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.owner_id}>
                    <td className="admin-td font-medium text-slate-900">{r.full_name || "—"}</td>
                    <td className="admin-td text-slate-700">{r.phone ?? "—"}</td>
                    <td className={`admin-td font-semibold ${r.available_balance < 0 ? "text-red-600" : "text-slate-900"}`}>
                      {formatVnd(r.available_balance)}
                    </td>
                    <td className="admin-td text-slate-500">{formatVnd(r.pending_balance)}</td>
                    <td className="admin-td">
                      <button type="button" onClick={() => setEditing(r)} className="text-xs font-semibold text-brand-600 hover:underline">
                        Điều chỉnh
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-slate-400">Tổng: {total} ví</p>

      {editing ? (
        <AdjustModal
          row={editing}
          onClose={() => setEditing(null)}
          onDone={(msg) => {
            setEditing(null);
            show("success", msg);
            void load();
          }}
          onError={(msg) => show("error", msg)}
        />
      ) : null}

      <ToastView toast={toast} />
    </div>
  );
}

function AdjustModal({
  row,
  onClose,
  onDone,
  onError,
}: {
  row: AdminWalletRow;
  onClose: () => void;
  onDone: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    const value = parseVndInput(amount);
    if (value == null || value === 0) {
      onError("Nhập số tiền hợp lệ (dương để cộng, âm để trừ).");
      return;
    }
    setBusy(true);
    try {
      await adjustWallet({ ownerId: row.owner_id, amount: value, note: note.trim() || "Điều chỉnh thủ công" });
      onDone("Đã điều chỉnh số dư ví.");
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="text-base font-bold text-slate-900">Điều chỉnh ví</h3>
          <p className="text-xs text-slate-500">
            {row.full_name || row.phone} · hiện tại {formatVnd(row.available_balance)}
          </p>
        </div>
        <div className="space-y-4 p-5">
          <label className="block">
            <span className="admin-label">Số tiền (dương = cộng, âm = trừ)</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="VD: 100000 hoặc -50000"
              className="admin-input"
            />
          </label>
          <label className="block">
            <span className="admin-label">Ghi chú</span>
            <input value={note} onChange={(e) => setNote(e.target.value)} className="admin-input" placeholder="Lý do điều chỉnh" />
          </label>
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-3">
          <button type="button" onClick={onClose} className="admin-btn-secondary">
            Hủy
          </button>
          <button type="button" disabled={busy} onClick={submit} className="admin-btn-primary">
            {busy ? "Đang lưu…" : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
}
