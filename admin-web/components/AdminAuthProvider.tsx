"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { AdminShell } from "@/components/AdminShell";
import {
  clearAdminSession,
  readAdminSession,
  signInAdmin,
  startPreviewSession,
  type AdminSession,
} from "@/lib/adminAuth";

type AdminAuthContextValue = {
  session: AdminSession | null;
  signIn: (phone: string, password: string) => Promise<void>;
  signInPreview: () => void;
  signOut: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoginRoute = pathname === "/login";

  useEffect(() => {
    setSession(readAdminSession());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!session && !isLoginRoute) {
      router.replace("/login");
      return;
    }
    if (session && isLoginRoute) {
      router.replace("/");
    }
  }, [loading, session, isLoginRoute, router]);

  const signIn = useCallback(
    async (phone: string, password: string) => {
      const next = await signInAdmin(phone, password);
      setSession(next);
      router.replace("/");
    },
    [router],
  );

  const signInPreview = useCallback(() => {
    const next = startPreviewSession();
    setSession(next);
    router.replace("/");
  }, [router]);

  const signOut = useCallback(() => {
    clearAdminSession();
    setSession(null);
    router.replace("/login");
  }, [router]);

  const value = useMemo(
    () => ({ session, signIn, signInPreview, signOut }),
    [session, signIn, signInPreview, signOut],
  );

  if (loading) {
    return (
      <div className="admin-bg-mesh flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Đang tải…</p>
      </div>
    );
  }

  if (isLoginRoute) {
    return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
  }

  if (!session) {
    return (
      <div className="admin-bg-mesh flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Đang chuyển đến đăng nhập…</p>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={value}>
      <AdminShell>{children}</AdminShell>
    </AdminAuthContext.Provider>
  );
}
