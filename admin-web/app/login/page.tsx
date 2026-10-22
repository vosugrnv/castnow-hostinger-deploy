"use client";

import { FormEvent, useState } from "react";

import { useAdminAuth } from "@/components/AdminAuthProvider";
import { EnvMissing } from "@/components/EnvMissing";
import { ADMIN_BRAND } from "@/lib/brand";
import { hasSupabaseEnv } from "@/lib/supabase";

export default function LoginPage() {
  const { signIn, signInPreview } = useAdminAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!hasSupabaseEnv()) {
    return <EnvMissing />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signIn(phone, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-bg-mesh flex min-h-screen items-center justify-center px-4 py-12">
      <div className="admin-surface-elevated w-full max-w-md p-8 sm:p-10">
        <div className="mb-8 text-center">
          <img
            src={ADMIN_BRAND.logoSrc}
            alt={ADMIN_BRAND.name}
            className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-white object-contain p-1 shadow-lg shadow-brand-500/30 ring-1 ring-brand-100"
          />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{ADMIN_BRAND.product}</h1>
          <p className="mt-1 text-sm text-slate-500">Đăng nhập bằng email hoặc SĐT quản trị CastNow</p>
        </div>

        <form onSubmit={(e) => void onSubmit(e)} className="space-y-4">
          <label className="block">
            <span className="admin-label">Email hoặc số điện thoại</span>
            <input
              type="text"
              autoComplete="username"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="email@domain.com hoặc 09xxxxxxxx"
              className="admin-input"
              disabled={busy}
            />
          </label>
          <label className="block">
            <span className="admin-label">Mật khẩu</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              disabled={busy}
            />
          </label>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          ) : null}

          <button type="submit" disabled={busy} className="admin-btn-primary w-full">
            {busy ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <button type="button" onClick={signInPreview} className="admin-btn-secondary w-full">
            Xem thử giao diện (demo)
          </button>
          <p className="mt-2 text-center text-xs text-slate-400">
            Chế độ demo chỉ xem giao diện — dữ liệu cần tài khoản quản trị thật.
          </p>
        </div>
      </div>
    </div>
  );
}
