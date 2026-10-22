"use client";

import { useEffect, useState } from "react";

import { StatCard } from "@/components/StatCard";
import { ErrorBox, PageHeader, Spinner } from "@/components/ui";
import { fetchDashboardStats, type DashboardStats } from "@/lib/adminApi";
import { formatVnd } from "@/lib/format";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await fetchDashboardStats();
        if (active) setStats(data);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" sub="Tổng quan đặt mẫu ảnh, người dùng, ví và tác vụ cần xử lý trên CastNow." />

      {loading ? <Spinner /> : null}
      {error ? <ErrorBox message={error} /> : null}

      {stats ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <StatCard title="Tổng người dùng" value={stats.total_users} subtitle={`${stats.total_customers} khách · ${stats.total_workers} mẫu ảnh`} accent="blue" />
            <StatCard title="Đơn tìm mẫu" value={stats.total_jobs} subtitle={`${stats.open_jobs} đang tuyển`} accent="brand" />
            <StatCard title="Đã chốt mẫu" value={stats.assigned_jobs} accent="purple" />
            <StatCard title="Buổi chụp xong" value={stats.completed_jobs} accent="emerald" />
            <StatCard title="Đơn đặt lịch" value={stats.total_bookings} accent="slate" />
            <StatCard title="Cần duyệt rút tiền" value={stats.pending_withdrawals} subtitle="Chờ xử lý" accent="amber" />
            <StatCard title="Hồ sơ mẫu chờ duyệt" value={stats.pending_partner_apps} accent="red" />
            <StatCard title="Tổng số dư ví" value={formatVnd(stats.total_wallet_balance)} accent="emerald" />
          </div>

          <div className="admin-surface-elevated p-5">
            <h2 className="text-base font-bold text-slate-900">Cần xử lý</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {stats.pending_withdrawals > 0 || stats.pending_partner_apps > 0 ? (
                <>
                  <span className="font-semibold text-brand-700">{stats.pending_withdrawals}</span> yêu cầu rút tiền;{" "}
                  <span className="font-semibold text-amber-700">{stats.pending_partner_apps}</span> hồ sơ mẫu ảnh chờ duyệt.
                </>
              ) : (
                <span className="text-slate-500">Không có mục nào cần xử lý. Mọi thứ ổn định.</span>
              )}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
