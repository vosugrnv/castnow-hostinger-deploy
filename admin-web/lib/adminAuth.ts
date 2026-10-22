import { ADMIN_BRAND } from "@/lib/brand";
import { createSupabaseClient } from "@/lib/supabase";

const SESSION_STORAGE_KEY = ADMIN_BRAND.sessionKey;

export type AdminSession = {
  userId: string;
  phone: string;
  displayName: string;
  role: string;
  signedInAt: string;
};

export function readAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AdminSession;
    if (!parsed?.userId || parsed.role !== "admin") {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeAdminSession(session: AdminSession): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function getAdminUserId(): string | null {
  return readAdminSession()?.userId ?? null;
}

type SignInRow = {
  auth_uid: string;
  phone_number: string | null;
  display_name: string | null;
  role: string | null;
};

export async function signInAdmin(identifier: string, password: string): Promise<AdminSession> {
  const id = identifier.trim();
  if (!id || password.trim().length < 1) {
    throw new Error("Vui lòng nhập email (hoặc SĐT) và mật khẩu.");
  }

  const supabase = createSupabaseClient();
  const isEmail = id.includes("@");
  const { data, error } = isEmail
    ? await supabase.rpc("app_sign_in_email", { p_email: id, p_password: password })
    : await supabase.rpc("app_sign_in_phone", { p_phone: id, p_password: password });

  if (error) {
    const msg = error.message || "Đăng nhập thất bại.";
    if (isEmail && /Could not find the function|PGRST202/i.test(msg)) {
      throw new Error("Server chưa bật đăng nhập email. Chạy migration 033_admin_email_auth.sql trên database.");
    }
    throw new Error(msg);
  }

  const row = Array.isArray(data) ? (data[0] as SignInRow | undefined) : (data as SignInRow | null);
  if (!row?.auth_uid) {
    throw new Error(isEmail ? "Sai email hoặc mật khẩu." : "Sai số điện thoại hoặc mật khẩu.");
  }
  if (row.role !== "admin") {
    throw new Error("Tài khoản này không có quyền quản trị.");
  }

  const session: AdminSession = {
    userId: row.auth_uid,
    phone: row.phone_number ?? id,
    displayName: row.display_name?.trim() || "Admin",
    role: row.role,
    signedInAt: new Date().toISOString(),
  };
  writeAdminSession(session);
  return session;
}

export function getAdminDisplayName(): string {
  return process.env.NEXT_PUBLIC_ADMIN_DISPLAY_NAME?.trim() || ADMIN_BRAND.supportName;
}

/** Phiên xem thử giao diện (không có quyền thật — RPC dữ liệu sẽ báo lỗi). */
export function startPreviewSession(): AdminSession {
  const session: AdminSession = {
    userId: "00000000-0000-0000-0000-000000000000",
    phone: "Demo",
    displayName: "Xem thử (demo)",
    role: "admin",
    signedInAt: new Date().toISOString(),
  };
  writeAdminSession(session);
  return session;
}
