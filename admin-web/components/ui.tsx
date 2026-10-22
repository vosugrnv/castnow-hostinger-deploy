"use client";

import { useCallback, useState } from "react";

export function PageHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <header className="admin-page-header flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="admin-page-title">{title}</h1>
        {sub ? <p className="admin-page-sub">{sub}</p> : null}
      </div>
      {action ? <div className="flex items-center gap-2">{action}</div> : null}
    </header>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="admin-surface border-red-200 bg-red-50/60 p-5 text-sm text-red-800">
      <p className="font-semibold">Đã xảy ra lỗi</p>
      <p className="mt-1 font-mono text-xs text-red-700">{message}</p>
    </div>
  );
}

export function FilterChips<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`admin-filter-chip ${value === o.value ? "admin-filter-chip-active" : ""}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const STATUS_TONE: Record<string, string> = {
  // jobs
  open: "admin-badge-amber",
  assigned: "admin-badge-brand",
  completed: "admin-badge-emerald",
  // bookings
  pending: "admin-badge-amber",
  matched: "admin-badge-brand",
  confirmed: "admin-badge-brand",
  in_progress: "admin-badge-brand",
  cancelled: "admin-badge-red",
  // tx
  processing: "admin-badge-brand",
  succeeded: "admin-badge-emerald",
  failed: "admin-badge-red",
  // partner
  approved: "admin-badge-emerald",
  rejected: "admin-badge-red",
};

const STATUS_LABEL: Record<string, string> = {
  open: "Đang tuyển",
  assigned: "Đã chốt mẫu",
  completed: "Hoàn thành",
  pending: "Chờ xử lý",
  matched: "Đã ghép",
  confirmed: "Đã xác nhận",
  in_progress: "Đang chụp",
  cancelled: "Đã hủy",
  processing: "Đang xử lý",
  succeeded: "Thành công",
  failed: "Thất bại",
  approved: "Đã duyệt",
  rejected: "Từ chối",
};

export function StatusBadge({ status }: { status: string }) {
  const tone = STATUS_TONE[status] ?? "admin-badge-slate";
  const label = STATUS_LABEL[status] ?? status;
  return <span className={tone}>{label}</span>;
}

export type Toast = { kind: "success" | "error"; text: string } | null;

export function useToast() {
  const [toast, setToast] = useState<Toast>(null);
  const show = useCallback((kind: "success" | "error", text: string) => {
    setToast({ kind, text });
    window.setTimeout(() => setToast(null), 3500);
  }, []);
  return { toast, show };
}

export function ToastView({ toast }: { toast: Toast }) {
  if (!toast) return null;
  return (
    <div
      className={`fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg ${
        toast.kind === "success" ? "bg-emerald-600" : "bg-red-600"
      }`}
    >
      {toast.text}
    </div>
  );
}

export function Spinner({ label = "Đang tải…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
      {label}
    </div>
  );
}
