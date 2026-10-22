import { callPublicRpc } from "@/lib/fetchPublicWorkers";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);

type PhotoRow = { photo_data: string | null; photo_mime: string | null };

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID.test(id)) return new Response("Not found", { status: 404 });

  const slotRaw = Number(new URL(req.url).searchParams.get("slot") || "1");
  const slot = slotRaw === 2 || slotRaw === 3 ? slotRaw : 1;

  const rows = await callPublicRpc<PhotoRow[]>(
    "app_get_virtual_tasker_photo",
    { p_id: id, p_slot: slot },
    3600,
  );
  const row = Array.isArray(rows) ? rows[0] : undefined;
  if (!row?.photo_data) return new Response("Not found", { status: 404 });

  const mime = row.photo_mime && ALLOWED_MIME.has(row.photo_mime) ? row.photo_mime : "image/jpeg";
  const bytes = Buffer.from(row.photo_data, "base64");

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": mime,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
