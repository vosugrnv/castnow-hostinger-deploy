export type PublicWorkerRow = {
  user_id: string;
  full_name: string;
  avatar_url: string;
  working_city: string;
  bio: string;
  skills: string[] | null;
  rating: number | null;
  total_jobs: number | null;
};

export type PublicVirtualTaskerOfferRow = {
  service?: string;
  label?: string;
  price?: number;
  featured?: boolean;
};

export type PublicVirtualTaskerRow = {
  id: string;
  full_name: string;
  city: string;
  district: string | null;
  services: string[] | null;
  bio: string | null;
  highlights: string[] | null;
  rating: number | null;
  review_count: number | null;
  has_photo: boolean;
  has_photo2?: boolean | null;
  has_photo3?: boolean | null;
  photo_version: number | null;
  service_offers?: PublicVirtualTaskerOfferRow[] | null;
};

export const PUBLIC_TASKERS_REVALIDATE = 60;

export async function callPublicRpc<T>(
  name: string,
  body: Record<string, unknown> = {},
  revalidate: number = PUBLIC_TASKERS_REVALIDATE,
): Promise<T | null> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!base || !key) return null;

  try {
    const res = await fetch(`${base}/rest/v1/rpc/${name}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      next: { revalidate },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchPublicWorkers(): Promise<PublicWorkerRow[]> {
  const data = await callPublicRpc<PublicWorkerRow[]>("app_list_public_workers");
  return Array.isArray(data) ? data : [];
}

export async function fetchPublicVirtualTaskers(): Promise<PublicVirtualTaskerRow[]> {
  const data = await callPublicRpc<PublicVirtualTaskerRow[]>("app_list_public_virtual_taskers");
  return Array.isArray(data) ? data : [];
}
