export function EnvMissing() {
  return (
    <div className="admin-bg-mesh flex min-h-screen items-center justify-center p-6">
      <div className="admin-surface max-w-2xl border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50/80 p-8 shadow-card">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
            ⚙️
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-950">Chưa cấu hình Supabase</h2>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/90">
              Tạo file{" "}
              <code className="rounded-md bg-white/80 px-1.5 py-0.5 font-mono text-xs text-amber-950">
                admin-web/.env.local
              </code>{" "}
              từ{" "}
              <code className="rounded-md bg-white/80 px-1.5 py-0.5 font-mono text-xs">.env.example</code>{" "}
              và điền{" "}
              <code className="rounded-md bg-white/80 px-1.5 py-0.5 font-mono text-xs">
                NEXT_PUBLIC_SUPABASE_URL
              </code>{" "}
              cùng{" "}
              <code className="rounded-md bg-white/80 px-1.5 py-0.5 font-mono text-xs">
                NEXT_PUBLIC_SUPABASE_ANON_KEY
              </code>
              .
            </p>
            <p className="mt-3 text-sm leading-relaxed text-amber-900/85">
              Sau đó deploy migration{" "}
              <code className="rounded bg-white/60 px-1 font-mono text-xs">
                027_admin_web_ops.sql
              </code>{" "}
              để mở các RPC quản trị, và đặt 1 tài khoản có{" "}
              <code className="rounded bg-white/60 px-1 font-mono text-xs">profiles.role = &apos;admin&apos;</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
