/**
 * Chuẩn hóa SĐT giống RPC app: normalize_app_phone trả về dạng "0xxxxxxxxx".
 * Dùng để hiển thị & so khớp ở admin-web.
 */
export function normalizeVietnamPhone(phoneNumber: string): string {
  const trimmed = (phoneNumber ?? "").trim();
  if (!trimmed) return "";
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";

  if (trimmed.startsWith("+")) {
    if (digits.startsWith("84")) return `0${digits.slice(2)}`;
    return `+${digits}`;
  }
  if (digits.startsWith("84")) return `0${digits.slice(2)}`;
  return digits;
}
