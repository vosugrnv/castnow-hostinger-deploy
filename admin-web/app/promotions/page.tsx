"use client";

import { useCallback, useEffect, useState } from "react";

import { PageHeader, ErrorBox, Spinner, ToastView, useToast } from "@/components/ui";
import { deletePromotion, listPromotions, upsertPromotion, type AdminPromotionRow } from "@/lib/adminApi";
import { formatDateVi } from "@/lib/format";

type Draft = {
  id?: string | null;
  title: string;
  description: string;
  promoKind: "deal" | "coupon";
  discountLabel: string;
  code: string;
  validUntil: string;
  isActive: boolean;
  sortOrder: number;
};

const emptyDraft: Draft = {
  id: null,
  title: "",
  description: "",
  promoKind: "deal",
  discountLabel: "",
  code: "",
  validUntil: "",
  isActive: true,
  sortOrder: 0,
};

export default function PromotionsPage() {
  const [rows, setRows] = useState<AdminPromotionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const { toast, show } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await listPromotions());
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function openEdit(r: AdminPromotionRow) {
    setDraft({
      id: r.id,
      title: r.title,
      description: r.description ?? "",
      promoKind: (r.promo_kind === "coupon" ? "coupon" : "deal"),
      discountLabel: r.discount_label ?? "",
      code: r.code ?? "",
      validUntil: r.valid_until ? r.valid_until.slice(0, 10) : "",
      isActive: r.is_active,
      sortOrder: r.sort_order,
    });
  }

  async function onDelete(r: AdminPromotionRow) {
    if (!window.confirm(`Xóa khuyến mãi "${r.title}"?`)) return;
    try {
      await deletePromotion(r.id);
      show("success", "Đã xóa khuyến mãi.");
      void load();
    } catch (err) {
      show("error", err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Khuyến mãi"
        sub="Ưu đãi & mã giảm giá hiển thị trong app."
        action={
          <button type="button" onClick={() => setDraft({ ...emptyDraft })} className="admin-btn-primary">
            + Thêm khuyến mãi
          </button>
        }
      />

      {error ? <ErrorBox message={error} /> : null}

      <div className="admin-table-wrap overflow-x-auto">
        {loading ? (
          <Spinner />
        ) : (
          <table className="admin-table">
            <thead className="admin-thead">
              <tr>
                <th className="admin-th">Tiêu đề</th>
                <th className="admin-th">Loại</th>
                <th className="admin-th">Nhãn / Mã</th>
                <th className="admin-th">Hết hạn</th>
                <th className="admin-th">Trạng thái</th>
                <th className="admin-th"></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-td py-10 text-center text-slate-500">
                    Chưa có khuyến mãi nào
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td className="admin-td">
                      <div className="font-medium text-slate-900">{r.title}</div>
                      <div className="max-w-md text-xs text-slate-400">{r.description}</div>
                    </td>
                    <td className="admin-td">
                      <span className="admin-badge-slate">{r.promo_kind === "coupon" ? "Mã giảm giá" : "Ưu đãi"}</span>
                    </td>
                    <td className="admin-td text-slate-700">
                      {r.discount_label ? <span className="font-semibold text-brand-700">{r.discount_label}</span> : null}
                      {r.code ? <span className="ml-2 font-mono text-xs">{r.code}</span> : null}
                    </td>
                    <td className="admin-td text-slate-500">{r.valid_until ? formatDateVi(r.valid_until) : "—"}</td>
                    <td className="admin-td">
                      {r.is_active ? (
                        <span className="admin-badge-emerald">Đang bật</span>
                      ) : (
                        <span className="admin-badge-slate">Tắt</span>
                      )}
                    </td>
                    <td className="admin-td">
                      <div className="flex gap-3">
                        <button type="button" onClick={() => openEdit(r)} className="text-xs font-semibold text-brand-600 hover:underline">
                          Sửa
                        </button>
                        <button type="button" onClick={() => onDelete(r)} className="text-xs font-semibold text-red-600 hover:underline">
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {draft ? (
        <PromoModal
          draft={draft}
          onClose={() => setDraft(null)}
          onDone={(msg) => {
            setDraft(null);
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

function PromoModal({
  draft,
  onClose,
  onDone,
  onError,
}: {
  draft: Draft;
  onClose: () => void;
  onDone: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const [d, setD] = useState<Draft>(draft);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!d.title.trim()) {
      onError("Vui lòng nhập tiêu đề.");
      return;
    }
    setBusy(true);
    try {
      await upsertPromotion({
        id: d.id,
        title: d.title.trim(),
        description: d.description.trim(),
        promoKind: d.promoKind,
        discountLabel: d.discountLabel.trim(),
        code: d.code.trim(),
        validUntil: d.validUntil ? new Date(d.validUntil).toISOString() : null,
        isActive: d.isActive,
        sortOrder: Number(d.sortOrder) || 0,
      });
      onDone(d.id ? "Đã cập nhật khuyến mãi." : "Đã thêm khuyến mãi.");
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
          <h3 className="text-base font-bold text-slate-900">{d.id ? "Sửa khuyến mãi" : "Thêm khuyến mãi"}</h3>
        </div>
        <div className="max-h-[70vh] space-y-4 overflow-y-auto p-5">
          <label className="block">
            <span className="admin-label">Tiêu đề</span>
            <input value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} className="admin-input" />
          </label>
          <label className="block">
            <span className="admin-label">Mô tả</span>
            <textarea
              value={d.description}
              onChange={(e) => setD({ ...d, description: e.target.value })}
              className="admin-input min-h-20"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="admin-label">Loại</span>
              <select
                value={d.promoKind}
                onChange={(e) => setD({ ...d, promoKind: e.target.value as Draft["promoKind"] })}
                className="admin-input"
              >
                <option value="deal">Ưu đãi</option>
                <option value="coupon">Mã giảm giá</option>
              </select>
            </label>
            <label className="block">
              <span className="admin-label">Nhãn giảm (vd -15%)</span>
              <input value={d.discountLabel} onChange={(e) => setD({ ...d, discountLabel: e.target.value })} className="admin-input" />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="admin-label">Mã (nếu là coupon)</span>
              <input value={d.code} onChange={(e) => setD({ ...d, code: e.target.value })} className="admin-input" />
            </label>
            <label className="block">
              <span className="admin-label">Hết hạn</span>
              <input type="date" value={d.validUntil} onChange={(e) => setD({ ...d, validUntil: e.target.value })} className="admin-input" />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="admin-label">Thứ tự</span>
              <input
                type="number"
                value={d.sortOrder}
                onChange={(e) => setD({ ...d, sortOrder: Number(e.target.value) })}
                className="admin-input"
              />
            </label>
            <label className="flex items-end gap-2 pb-2">
              <input type="checkbox" checked={d.isActive} onChange={(e) => setD({ ...d, isActive: e.target.checked })} />
              <span className="text-sm text-slate-700">Đang bật</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-3">
          <button type="button" onClick={onClose} className="admin-btn-secondary">
            Hủy
          </button>
          <button type="button" disabled={busy} onClick={submit} className="admin-btn-primary">
            {busy ? "Đang lưu…" : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
