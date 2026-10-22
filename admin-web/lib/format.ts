export function formatDateTimeVi(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString("vi-VN");
}

export function formatDateVi(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleDateString("vi-VN");
}

const vnd = new Intl.NumberFormat("vi-VN");

export function formatVnd(amount: number | string | null | undefined): string {
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (n == null || !Number.isFinite(n)) return "0 đ";
  return `${vnd.format(Math.round(n))} đ`;
}

export function parseVndInput(raw: string): number | null {
  const digits = raw.replace(/[^\d-]/g, "");
  if (!digits || digits === "-") return null;
  const n = Number(digits);
  return Number.isFinite(n) ? n : null;
}

export function shortId(id: string | null | undefined): string {
  if (!id) return "—";
  return `${String(id).slice(0, 8)}…`;
}
