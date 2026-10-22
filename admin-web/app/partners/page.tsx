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
import { listPartnerApplications, reviewPartnerApplication, type AdminPartnerRow } from "@/lib/adminApi";
import { formatDateTimeVi } from "@/lib/format";

type StatusFilter = "pending" | "approved" | "rejected" | "";

export default function PartnersPage() {
  const [rows, setRows] = useState<AdminPartnerRow[]>([]);
  const [status, setStatus] = useState<StatusFilter>("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const { toast, show } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await listPartnerApplications(status));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    void load();
  }, [load]);

  async function review(row: AdminPartnerRow, approve: boolean) {
    let reason: string | undefined;
    if (!approve) {
      reason = window.prompt("Lý do từ chối (tùy chọn):") ?? undefined;
    } else if (!window.confirm(`Duyệt hồ sơ "${row.full_name}" thành mẫu ảnh?`)) {
      return;
    }
    setBusyId(row.id);
    try {
      await reviewPartnerApplication({ applicationId: row.id, approve, rejectionReason: reason });
      show("success", approve ? "Đã duyệt hồ sơ." : "Đã từ chối hồ sơ.");
      void load();
    } catch (err) {
      show("error", err instanceof Error ? err.message : String(err));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Duyệt hồ sơ mẫu ảnh" sub="Xét duyệt hồ sơ đăng ký làm mẫu ảnh: ảnh chân dung, CCCD, phong cách." />

      <FilterChips<StatusFilter>
        value={status}
        onChange={setStatus}
        options={[
          { value: "pending", label: "Chờ duyệt" },
          { value: "approved", label: "Đã duyệt" },
          { value: "rejected", label: "Từ chối" },
          { value: "", label: "Tất cả" },
        ]}
      />

      {error ? <ErrorBox message={error} /> : null}
      {loading ? <Spinner /> : null}

      {!loading && rows.length === 0 ? (
        <div className="admin-surface p-10 text-center text-sm text-slate-500">Không có hồ sơ nào</div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {rows.map((r) => (
          <div key={r.id} className="admin-surface-elevated overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
              <div>
                <p className="font-bold text-slate-900">{r.full_name}</p>
                <p className="text-xs text-slate-500">{r.applicant_phone}</p>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <div className="grid grid-cols-2 gap-3 p-5">
              <Photo label="Chân dung" url={r.portrait_url} />
              <Photo label="CCCD" url={r.id_card_url} />
            </div>
            <div className="space-y-1 px-5 pb-4 text-sm text-slate-700">
              <Row k="Chuyên môn" v={r.expertise_title} />
              <Row k="Kinh nghiệm" v={`${r.experience_years} năm ${r.experience_months} tháng`} />
              <Row k="CCCD" v={r.citizen_id} />
              <Row k="Ngày sinh" v={`${r.birth_day}/${r.birth_month}/${r.birth_year}`} />
              <Row k="Gửi lúc" v={formatDateTimeVi(r.submitted_at)} />
              {r.rejection_reason ? <Row k="Lý do từ chối" v={r.rejection_reason} /> : null}
            </div>
            {r.status === "pending" ? (
              <div className="flex gap-2 border-t border-slate-100 px-5 py-3">
                <button
                  type="button"
                  disabled={busyId === r.id}
                  onClick={() => review(r, true)}
                  className="admin-btn-success flex-1"
                >
                  Duyệt
                </button>
                <button
                  type="button"
                  disabled={busyId === r.id}
                  onClick={() => review(r, false)}
                  className="admin-btn-danger flex-1"
                >
                  Từ chối
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <ToastView toast={toast} />
    </div>
  );
}

function Photo({ label, url }: { label: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="block">
      <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={label}
        className="h-40 w-full rounded-xl border border-slate-200 object-cover"
      />
    </a>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-slate-400">{k}</span>
      <span className="text-right font-medium text-slate-800">{v}</span>
    </div>
  );
}
