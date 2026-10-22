"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { PageHeader, ErrorBox, Spinner, ToastView, useToast } from "@/components/ui";
import {
  deleteWebTasker,
  getWebTaskerPhoto,
  listWebTaskers,
  upsertWebTasker,
  type AdminWebTaskerOffer,
  type AdminWebTaskerRow,
} from "@/lib/adminApi";
import {
  prepareTaskerPhoto,
  WEB_SITE_URL,
  WEB_TASKER_CITIES,
  WEB_TASKER_DISTRICTS,
  WEB_TASKER_SERVICES,
  webTaskerUrl,
} from "@/lib/webTaskerCatalog";

type OfferDraft = {
  key: string;
  service: string;
  label: string;
  price: string;
  featured: boolean;
};

type Draft = {
  id: string | null;
  fullName: string;
  city: string;
  district: string;
  services: string[];
  bio: string;
  highlights: string;
  rating: number;
  reviewCount: number;
  isPublished: boolean;
  sortOrder: number;
  hasPhoto: boolean;
  hasPhoto2: boolean;
  hasPhoto3: boolean;
  offers: OfferDraft[];
};

let offerKey = 0;
function emptyOffer(partial?: Partial<OfferDraft>): OfferDraft {
  offerKey += 1;
  return {
    key: `o-${offerKey}`,
    service: "",
    label: "",
    price: "",
    featured: false,
    ...partial,
  };
}

function blankOffers(count = 3): OfferDraft[] {
  return Array.from({ length: count }, () => emptyOffer());
}

function offersFromRow(raw: AdminWebTaskerOffer[] | null | undefined): OfferDraft[] {
  const list = (raw ?? [])
    .filter((o) => o && (o.service || o.label || o.price))
    .map((o) =>
      emptyOffer({
        service: o.service ?? "",
        label: o.label ?? "",
        price: o.price != null && o.price > 0 ? String(o.price) : "",
        featured: Boolean(o.featured),
      }),
    );
  while (list.length < 3) list.push(emptyOffer());
  return list;
}

function normalizeOffers(offers: OfferDraft[], services: string[]): AdminWebTaskerOffer[] {
  return offers
    .map((o) => ({
      service: o.service.trim(),
      label: o.label.trim(),
      price: Math.round(Number(String(o.price).replace(/[^\d]/g, "")) || 0),
      featured: o.featured,
    }))
    .filter((o) => o.service || o.label || o.price > 0)
    .filter((o) => services.includes(o.service) && o.label && o.price > 0)
    .map(({ service, label, price, featured }) => ({ service, label, price, featured }));
}

const emptyDraft: Draft = {
  id: null,
  fullName: "",
  city: "TP.HCM",
  district: "",
  services: [],
  bio: "",
  highlights: "",
  rating: 5,
  reviewCount: 0,
  isPublished: true,
  sortOrder: 0,
  hasPhoto: false,
  hasPhoto2: false,
  hasPhoto3: false,
  offers: blankOffers(3),
};

function friendlyError(err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  if (/not_admin/.test(msg)) return "Tài khoản hiện tại không có quyền admin.";
  if (/PGRST202|Could not find the function.*virtual_tasker|service_offers/i.test(msg)) {
    return "API chưa nhận hàm cập nhật hồ sơ mẫu (thiếu service_offers). Cần áp migration 032 và reload PostgREST trên VPS.";
  }
  if (/relation .*public_virtual_taskers.* does not exist|PGRST205/i.test(msg)) {
    return "Server chưa có bảng mẫu hiển thị web. Cần chạy file supabase/migrations/030_public_virtual_taskers.sql trên database VPS.";
  }
  return msg;
}

export default function WebTaskersPage() {
  const [rows, setRows] = useState<AdminWebTaskerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const { toast, show } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await listWebTaskers());
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function openEdit(r: AdminWebTaskerRow) {
    setDraft({
      id: r.id,
      fullName: r.full_name,
      city: r.city,
      district: r.district ?? "",
      services: r.services ?? [],
      bio: r.bio ?? "",
      highlights: (r.highlights ?? []).join("\n"),
      rating: Number(r.rating) || 5,
      reviewCount: r.review_count ?? 0,
      isPublished: r.is_published,
      sortOrder: r.sort_order ?? 0,
      hasPhoto: r.has_photo,
      hasPhoto2: Boolean(r.has_photo2),
      hasPhoto3: Boolean(r.has_photo3),
      offers: offersFromRow(r.service_offers),
    });
  }

  const publishedCount = rows.filter((r) => r.is_published).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mẫu ảnh hiển thị web"
        sub={`Hồ sơ mẫu ảnh hiện trên ${WEB_SITE_URL.replace("https://", "")}/mau-anh-nhiep-anh-gia (sau mẫu thật). Thay đổi lên web trong khoảng 1 phút.`}
        action={
          <button type="button" onClick={() => setDraft({ ...emptyDraft })} className="admin-btn-primary">
            + Thêm hồ sơ
          </button>
        }
      />

      {error ? <ErrorBox message={error} /> : null}

      {!loading && !error ? (
        <p className="text-sm text-slate-500">
          {rows.length} hồ sơ · {publishedCount} đang hiển thị ·{" "}
          <a href={`${WEB_SITE_URL}/mau-anh-nhiep-anh-gia`} target="_blank" rel="noreferrer" className="font-semibold text-brand-600 hover:underline">
            Mở trang mẫu ảnh
          </a>
        </p>
      ) : null}

      <div className={`admin-table-wrap overflow-x-auto ${error ? "hidden" : ""}`}>
        {loading ? (
          <Spinner />
        ) : (
          <table className="admin-table">
            <thead className="admin-thead">
              <tr>
                <th className="admin-th">Ảnh</th>
                <th className="admin-th">Mẫu ảnh</th>
                <th className="admin-th">Khu vực</th>
                <th className="admin-th">Đánh giá</th>
                <th className="admin-th">Trạng thái</th>
                <th className="admin-th"></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-td py-10 text-center text-slate-500">
                    Chưa có hồ sơ nào. Bấm “+ Thêm hồ sơ” để tạo.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td className="admin-td">
                      <Thumb id={r.id} name={r.full_name} hasPhoto={r.has_photo} version={r.updated_at} />
                    </td>
                    <td className="admin-td">
                      <div className="font-medium text-slate-900">{r.full_name}</div>
                      <div className="max-w-sm truncate text-xs text-slate-400">{(r.services ?? []).join(" · ")}</div>
                    </td>
                    <td className="admin-td text-slate-700">
                      {r.district ? `${r.district}, ` : ""}
                      {r.city}
                    </td>
                    <td className="admin-td text-slate-700">
                      ★ {Number(r.rating).toFixed(1)} <span className="text-xs text-slate-400">({r.review_count})</span>
                    </td>
                    <td className="admin-td">
                      {r.is_published ? (
                        <span className="admin-badge-emerald">Đang hiển thị</span>
                      ) : (
                        <span className="admin-badge-slate">Ẩn</span>
                      )}
                    </td>
                    <td className="admin-td">
                      <div className="flex justify-end gap-2 whitespace-nowrap">
                        <button type="button" onClick={() => openEdit(r)} className="admin-btn-secondary px-3 py-1.5 text-xs">
                          Chỉnh sửa
                        </button>
                        {r.is_published ? (
                          <a
                            href={webTaskerUrl(r.id, r.full_name)}
                            target="_blank"
                            rel="noreferrer"
                            className="admin-btn-primary px-3 py-1.5 text-xs"
                          >
                            Xem ↗
                          </a>
                        ) : (
                          <span
                            title="Hồ sơ đang ẩn nên chưa có trang trên web"
                            className="admin-btn-secondary cursor-not-allowed px-3 py-1.5 text-xs opacity-50"
                          >
                            Xem ↗
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {draft ? (
        <TaskerModal
          draft={draft}
          onClose={() => setDraft(null)}
          onDone={(msg) => {
            setDraft(null);
            show("success", msg);
            void load();
          }}
          onError={(msg) => show("error", msg)}
        />
      ) : null}

      <ToastView toast={toast} />
    </div>
  );
}

function Thumb({ id, name, hasPhoto, version }: { id: string; name: string; hasPhoto: boolean; version: string }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setSrc(null);
    if (hasPhoto) {
      getWebTaskerPhoto(id)
        .then((url) => {
          if (alive) setSrc(url);
        })
        .catch(() => undefined);
    }
    return () => {
      alive = false;
    };
  }, [id, hasPhoto, version]);

  return (
    <div className="flex h-14 w-11 items-center justify-center overflow-hidden rounded-lg bg-brand-50 text-lg font-bold text-brand-500">
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : name.trim().charAt(0).toUpperCase()}
    </div>
  );
}

function TaskerModal({
  draft,
  onClose,
  onDone,
  onError,
}: {
  draft: Draft;
  onClose: () => void;
  onDone: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const [d, setD] = useState<Draft>(draft);
  const [busy, setBusy] = useState<"save" | "delete" | null>(null);
  const [previews, setPreviews] = useState<[string | null, string | null, string | null]>([null, null, null]);
  /** undefined = giữ, "" = xóa, base64 = mới — index 0/1/2 */
  const [photoEdits, setPhotoEdits] = useState<[string | undefined, string | undefined, string | undefined]>([
    undefined,
    undefined,
    undefined,
  ]);
  const [activeSlot, setActiveSlot] = useState<0 | 1 | 2>(0);
  const fileRef0 = useRef<HTMLInputElement>(null);
  const fileRef1 = useRef<HTMLInputElement>(null);
  const fileRef2 = useRef<HTMLInputElement>(null);
  const fileRefs = [fileRef0, fileRef1, fileRef2] as const;

  useEffect(() => {
    if (!draft.id) return;
    let alive = true;
    const slots: { slot: 1 | 2 | 3; has: boolean; idx: 0 | 1 | 2 }[] = [
      { slot: 1, has: draft.hasPhoto, idx: 0 },
      { slot: 2, has: draft.hasPhoto2, idx: 1 },
      { slot: 3, has: draft.hasPhoto3, idx: 2 },
    ];
    void Promise.all(
      slots.map(async ({ slot, has, idx }) => {
        if (!has) return { idx, url: null as string | null };
        try {
          return { idx, url: await getWebTaskerPhoto(draft.id!, slot) };
        } catch {
          return { idx, url: null };
        }
      }),
    ).then((rows) => {
      if (!alive) return;
      setPreviews((prev) => {
        const next: [string | null, string | null, string | null] = [...prev];
        for (const row of rows) next[row.idx] = row.url;
        return next;
      });
    });
    return () => {
      alive = false;
    };
  }, [draft.id, draft.hasPhoto, draft.hasPhoto2, draft.hasPhoto3]);

  const districts = WEB_TASKER_DISTRICTS[d.city];
  const activePreview = previews[activeSlot];
  const filledCount = previews.filter(Boolean).length;

  async function onPickPhoto(idx: 0 | 1 | 2, file: File | undefined) {
    if (!file) return;
    try {
      const { base64, dataUrl } = await prepareTaskerPhoto(file);
      setPhotoEdits((prev) => {
        const next: [string | undefined, string | undefined, string | undefined] = [...prev];
        next[idx] = base64;
        return next;
      });
      setPreviews((prev) => {
        const next: [string | null, string | null, string | null] = [...prev];
        next[idx] = dataUrl;
        return next;
      });
      setActiveSlot(idx);
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    }
  }

  function removePhoto(idx: 0 | 1 | 2) {
    setPhotoEdits((prev) => {
      const next: [string | undefined, string | undefined, string | undefined] = [...prev];
      next[idx] = "";
      return next;
    });
    setPreviews((prev) => {
      const next: [string | null, string | null, string | null] = [...prev];
      next[idx] = null;
      if (activeSlot === idx) {
        const fallback = ([0, 1, 2] as const).find((i) => i !== idx && next[i]);
        if (fallback != null) setActiveSlot(fallback);
      }
      return next;
    });
  }

  function openFilePicker(idx: 0 | 1 | 2) {
    fileRefs[idx].current?.click();
  }

  function toggleService(service: string) {
    const on = d.services.includes(service);
    const services = on ? d.services.filter((s) => s !== service) : [...d.services, service];
    setD({
      ...d,
      services,
      // Bỏ chọn nhóm việc → gỡ nhóm đó khỏi biến thể (giữ dòng để admin gán lại).
      offers: on
        ? d.offers.map((o) => (o.service === service ? { ...o, service: "" } : o))
        : d.offers,
    });
  }

  function setOffer(key: string, patch: Partial<OfferDraft>) {
    setD({ ...d, offers: d.offers.map((o) => (o.key === key ? { ...o, ...patch } : o)) });
  }

  function addOffer() {
    setD({ ...d, offers: [...d.offers, emptyOffer(d.services.length === 1 ? { service: d.services[0] } : undefined)] });
  }

  function removeOffer(key: string) {
    const next = d.offers.filter((o) => o.key !== key);
    setD({ ...d, offers: next.length ? next : blankOffers(1) });
  }

  async function submit() {
    if (!d.fullName.trim()) {
      onError("Vui lòng nhập họ tên.");
      return;
    }
    if (!d.services.length) {
      onError("Chọn ít nhất 1 kiểu buổi chụp.");
      return;
    }
    const incomplete = d.offers.filter((o) => {
      const touched = o.service || o.label.trim() || String(o.price).trim();
      if (!touched) return false;
      const price = Number(String(o.price).replace(/[^\d]/g, ""));
      return !o.service || !o.label.trim() || !price;
    });
    if (incomplete.length) {
      onError("Mỗi biến thể cần chọn dịch vụ, nhập tên gói và giá lớn hơn 0. Để trống cả dòng nếu không dùng.");
      return;
    }
    const serviceOffers = normalizeOffers(d.offers, d.services);
    const rating = Math.min(5, Math.max(1, Number(d.rating) || 5));
    setBusy("save");
    try {
      await upsertWebTasker({
        id: d.id,
        fullName: d.fullName.trim(),
        city: d.city,
        district: d.district.trim(),
        services: d.services,
        bio: d.bio.trim(),
        highlights: d.highlights
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        rating: Math.round(rating * 10) / 10,
        reviewCount: Math.max(0, Math.floor(Number(d.reviewCount) || 0)),
        isPublished: d.isPublished,
        sortOrder: Number(d.sortOrder) || 0,
        serviceOffers,
        photoBase64: photoEdits[0],
        photoMime: photoEdits[0] ? "image/jpeg" : undefined,
        photo2Base64: photoEdits[1],
        photo2Mime: photoEdits[1] ? "image/jpeg" : undefined,
        photo3Base64: photoEdits[2],
        photo3Mime: photoEdits[2] ? "image/jpeg" : undefined,
      });
      onDone(d.id ? "Đã cập nhật hồ sơ." : "Đã thêm hồ sơ.");
    } catch (err) {
      onError(friendlyError(err));
    } finally {
      setBusy(null);
    }
  }

  async function remove() {
    if (!d.id) return;
    if (!window.confirm(`Xóa hồ sơ "${d.fullName}" khỏi web? Thao tác này không hoàn tác được.`)) return;
    setBusy("delete");
    try {
      await deleteWebTasker(d.id);
      onDone("Đã xóa hồ sơ.");
    } catch (err) {
      onError(friendlyError(err));
      setBusy(null);
    }
  }

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="text-base font-bold text-slate-900">{d.id ? "Chỉnh sửa hồ sơ mẫu" : "Thêm hồ sơ mẫu"}</h3>
        </div>
        <div className="max-h-[75vh] overflow-y-auto p-5">
          <div className="grid gap-5 sm:grid-cols-[200px_minmax(0,1fr)]">
            <div>
              <span className="admin-label">Ảnh hồ sơ</span>
              <div className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl bg-brand-50 text-4xl font-bold text-brand-500">
                {activePreview ? (
                  <img src={activePreview} alt="" className="h-full w-full object-cover" />
                ) : (
                  d.fullName.trim().charAt(0).toUpperCase() || "?"
                )}
              </div>
              <button
                type="button"
                className="admin-btn-secondary mt-3 block w-full cursor-pointer text-center"
                onClick={() => openFilePicker(activeSlot)}
              >
                {activePreview ? "Đổi ảnh" : "Tải ảnh lên"}
              </button>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {([0, 1, 2] as const).map((idx) => {
                  const src = previews[idx];
                  const selected = activeSlot === idx;
                  return (
                    <div key={idx} className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          if (src) setActiveSlot(idx);
                          else openFilePicker(idx);
                        }}
                        className={`flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border bg-white transition ${
                          selected ? "border-brand-500 ring-1 ring-brand-500" : "border-slate-200 hover:border-slate-300"
                        }`}
                        title={src ? `Ảnh ${idx + 1}` : "Thêm hình ảnh"}
                      >
                        {src ? (
                          <img src={src} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <span className="flex flex-col items-center gap-0.5 px-1 text-center text-[10px] font-medium leading-tight text-slate-400">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                              <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h2l1.2-1.8A1 1 0 0 1 10.5 4h3a1 1 0 0 1 .8.4L15.5 6h2A2.5 2.5 0 0 1 20 8.5v9A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-9Z" />
                              <circle cx="12" cy="13" r="3.2" />
                            </svg>
                            Thêm
                          </span>
                        )}
                      </button>
                      {src ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePhoto(idx);
                          }}
                          className="absolute -right-1.5 -top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold leading-none text-white shadow hover:bg-red-600"
                          aria-label={`Xóa ảnh ${idx + 1}`}
                          title="Xóa ảnh"
                        >
                          ×
                        </button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <p className="mt-2 text-center text-[11px] font-medium text-slate-400">{filledCount}/3 ảnh</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Ảnh đầu là ảnh chính trên web. Tối đa 3 ảnh · khung 4:5 · ~600×750.
              </p>

              {([0, 1, 2] as const).map((idx) => (
                <input
                  key={idx}
                  ref={fileRefs[idx]}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    void onPickPhoto(idx, e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              ))}
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="admin-label">Họ tên</span>
                <input value={d.fullName} onChange={(e) => setD({ ...d, fullName: e.target.value })} className="admin-input" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="admin-label">Tỉnh / Thành phố</span>
                  <select
                    value={d.city}
                    onChange={(e) => setD({ ...d, city: e.target.value, district: "" })}
                    className="admin-input"
                  >
                    {WEB_TASKER_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="admin-label">Quận / Huyện</span>
                  {districts ? (
                    <select value={d.district} onChange={(e) => setD({ ...d, district: e.target.value })} className="admin-input">
                      <option value="">— Không chọn —</option>
                      {districts.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      value={d.district}
                      onChange={(e) => setD({ ...d, district: e.target.value })}
                      placeholder="Không bắt buộc"
                      className="admin-input"
                    />
                  )}
                </label>
              </div>

              <div>
                <span className="admin-label">Kiểu buổi chụp</span>
                <div className="flex flex-wrap gap-2">
                  {WEB_TASKER_SERVICES.map((s) => {
                    const on = d.services.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${
                          on ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-end justify-between gap-3">
                  <div>
                    <span className="admin-label mb-0">Gói giá theo concept</span>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Mỗi dòng = một gói trong kiểu đã chọn (vd. Lookbook 6 outfit · 1.500.000đ). Hiện 3 dòng trống; bấm + để thêm.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addOffer}
                    disabled={!d.services.length}
                    className="admin-btn-secondary shrink-0 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                    title={d.services.length ? "Thêm gói giá" : "Chọn kiểu buổi chụp trước"}
                  >
                    + Thêm
                  </button>
                </div>
                {!d.services.length ? (
                  <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center text-xs text-slate-400">
                    Chọn ít nhất một kiểu buổi chụp ở trên để tạo gói giá.
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="hidden grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_7rem_auto_2rem] gap-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400 sm:grid">
                      <span>Kiểu chụp</span>
                      <span>Tên gói</span>
                      <span>Giá (đ)</span>
                      <span>Đề xuất</span>
                      <span />
                    </div>
                    {d.offers.map((o) => (
                      <div
                        key={o.key}
                        className="grid grid-cols-1 gap-2 rounded-xl border border-slate-100 bg-slate-50/80 p-2 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_7rem_auto_2rem] sm:items-center"
                      >
                        <select
                          value={o.service}
                          onChange={(e) => setOffer(o.key, { service: e.target.value })}
                          className="admin-input"
                        >
                          <option value="">— Chọn kiểu —</option>
                          {d.services.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <input
                          value={o.label}
                          onChange={(e) => setOffer(o.key, { label: e.target.value })}
                          placeholder="VD: Lookbook 6 outfit"
                          className="admin-input"
                        />
                        <input
                          inputMode="numeric"
                          value={o.price}
                          onChange={(e) => setOffer(o.key, { price: e.target.value.replace(/[^\d]/g, "") })}
                          placeholder="1500000"
                          className="admin-input"
                        />
                        <label className="flex items-center gap-1.5 px-1 text-xs text-slate-600">
                          <input
                            type="checkbox"
                            checked={o.featured}
                            onChange={(e) => setOffer(o.key, { featured: e.target.checked })}
                          />
                          Đề xuất
                        </label>
                        <button
                          type="button"
                          onClick={() => removeOffer(o.key)}
                          className="h-9 w-8 rounded-lg text-lg leading-none text-slate-400 hover:bg-red-50 hover:text-red-600"
                          aria-label="Xóa gói giá"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label className="block">
                <span className="admin-label">Giới thiệu</span>
                <textarea
                  value={d.bio}
                  onChange={(e) => setD({ ...d, bio: e.target.value })}
                  placeholder="Phong cách mẫu, kinh nghiệm, khu vực nhận lịch…"
                  className="admin-input min-h-24"
                />
              </label>
              <label className="block">
                <span className="admin-label">Điểm nổi bật (mỗi dòng 1 ý)</span>
                <textarea
                  value={d.highlights}
                  onChange={(e) => setD({ ...d, highlights: e.target.value })}
                  placeholder={"Có portfolio lookbook\nNhận lịch cuối tuần\nCao 1m70"}
                  className="admin-input min-h-20"
                />
              </label>

              <div className="grid grid-cols-3 gap-3">
                <label className="block">
                  <span className="admin-label">Điểm (1–5)</span>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    step={0.1}
                    value={d.rating}
                    onChange={(e) => setD({ ...d, rating: Number(e.target.value) })}
                    className="admin-input"
                  />
                </label>
                <label className="block">
                  <span className="admin-label">Số đánh giá</span>
                  <input
                    type="number"
                    min={0}
                    value={d.reviewCount}
                    onChange={(e) => setD({ ...d, reviewCount: Number(e.target.value) })}
                    className="admin-input"
                  />
                </label>
                <label className="block">
                  <span className="admin-label">Thứ tự</span>
                  <input
                    type="number"
                    value={d.sortOrder}
                    onChange={(e) => setD({ ...d, sortOrder: Number(e.target.value) })}
                    className="admin-input"
                  />
                </label>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={d.isPublished} onChange={(e) => setD({ ...d, isPublished: e.target.checked })} />
                <span className="text-sm text-slate-700">Hiển thị trên web</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-5 py-3">
          <div>
            {d.id ? (
              <button type="button" disabled={busy !== null} onClick={remove} className="admin-btn-danger">
                {busy === "delete" ? "Đang xóa…" : "Xóa hồ sơ"}
              </button>
            ) : null}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="admin-btn-secondary">
              Hủy
            </button>
            <button type="button" disabled={busy !== null} onClick={submit} className="admin-btn-primary">
              {busy === "save" ? "Đang lưu…" : "Lưu"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
