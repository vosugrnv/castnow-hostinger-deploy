"use client";

import { useCallback, useEffect, useState } from "react";

import { ErrorBox, PageHeader, Spinner, ToastView, useToast } from "@/components/ui";
import { listNotifications, sendNotification, type AdminNotificationRow } from "@/lib/adminApi";
import { formatDateTimeVi } from "@/lib/format";

export default function NotificationsPage() {
  const [rows, setRows] = useState<AdminNotificationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [city, setCity] = useState("");
  const [busy, setBusy] = useState(false);
  const { toast, show } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await listNotifications());
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function send() {
    if (!title.trim() || !body.trim()) {
      show("error", "Nhập tiêu đề và nội dung.");
      return;
    }
    setBusy(true);
    try {
      await sendNotification({ title, body, targetCity: city });
      show("success", "Đã gửi thông báo.");
      setTitle("");
      setBody("");
      setCity("");
      void load();
    } catch (err) {
      show("error", err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Thông báo" sub="Gửi thông báo tới người dùng (toàn bộ hoặc theo tỉnh/thành) và xem lịch sử." />

      <div className="admin-surface-elevated p-5">
        <h2 className="mb-3 text-base font-bold text-slate-900">Gửi thông báo mới</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="admin-label">Tiêu đề</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="admin-input" />
          </label>
          <label className="block">
            <span className="admin-label">Tỉnh/Thành (trống = tất cả)</span>
            <input value={city} onChange={(e) => setCity(e.target.value)} className="admin-input" placeholder="VD: Hà Nội" />
          </label>
        </div>
        <label className="mt-3 block">
          <span className="admin-label">Nội dung</span>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} className="admin-input min-h-24" />
        </label>
        <div className="mt-3 flex justify-end">
          <button type="button" disabled={busy} onClick={send} className="admin-btn-primary">
            {busy ? "Đang gửi…" : "Gửi thông báo"}
          </button>
        </div>
      </div>

      {error ? <ErrorBox message={error} /> : null}

      <div className="admin-table-wrap overflow-x-auto">
        {loading ? (
          <Spinner />
        ) : (
          <table className="admin-table">
            <thead className="admin-thead">
              <tr>
                <th className="admin-th">Tiêu đề</th>
                <th className="admin-th">Nội dung</th>
                <th className="admin-th">Mục tiêu</th>
                <th className="admin-th">Loại</th>
                <th className="admin-th">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-td py-10 text-center text-slate-500">
                    Chưa có thông báo nào
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td className="admin-td font-medium text-slate-900">{r.title}</td>
                    <td className="admin-td max-w-md text-slate-600">{r.body}</td>
                    <td className="admin-td text-slate-500">
                      {r.target_user_id ? "Cá nhân" : r.target_city ? r.target_city : "Tất cả"}
                    </td>
                    <td className="admin-td">
                      <span className="admin-badge-slate">{r.event_type}</span>
                    </td>
                    <td className="admin-td text-slate-500">{formatDateTimeVi(r.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <ToastView toast={toast} />
    </div>
  );
}
