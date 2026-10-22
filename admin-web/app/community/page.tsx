"use client";

import { useCallback, useEffect, useState } from "react";

import { ErrorBox, PageHeader, Spinner, ToastView, useToast } from "@/components/ui";
import { deleteCommunityPost, listCommunityPosts, type AdminCommunityRow } from "@/lib/adminApi";
import { formatDateTimeVi } from "@/lib/format";

export default function CommunityPage() {
  const [rows, setRows] = useState<AdminCommunityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast, show } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await listCommunityPosts({}));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onDelete(r: AdminCommunityRow) {
    if (!window.confirm("Xóa bài viết này khỏi cộng đồng?")) return;
    try {
      await deleteCommunityPost(r.id);
      show("success", "Đã xóa bài viết.");
      void load();
    } catch (err) {
      show("error", err instanceof Error ? err.message : String(err));
    }
  }

  const total = rows[0]?.total_count ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Cộng đồng" sub="Kiểm duyệt bài viết trong mục cộng đồng của app." />

      {error ? <ErrorBox message={error} /> : null}

      <div className="admin-table-wrap overflow-x-auto">
        {loading ? (
          <Spinner />
        ) : (
          <table className="admin-table">
            <thead className="admin-thead">
              <tr>
                <th className="admin-th">Tác giả</th>
                <th className="admin-th">Chủ đề</th>
                <th className="admin-th">Nội dung</th>
                <th className="admin-th">Tương tác</th>
                <th className="admin-th">Thời gian</th>
                <th className="admin-th"></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-td py-10 text-center text-slate-500">
                    Chưa có bài viết nào
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td className="admin-td font-medium text-slate-900">{r.author_name || "—"}</td>
                    <td className="admin-td">
                      <span className="admin-badge-slate">{r.topic}</span>
                    </td>
                    <td className="admin-td max-w-md">
                      {r.title ? <div className="font-medium text-slate-800">{r.title}</div> : null}
                      <div className="text-xs text-slate-500">{r.content}</div>
                    </td>
                    <td className="admin-td text-slate-500">
                      {r.like_count} thích · {r.comment_count} bình luận
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

      <p className="text-xs text-slate-400">Tổng: {total} bài</p>
      <ToastView toast={toast} />
    </div>
  );
}
