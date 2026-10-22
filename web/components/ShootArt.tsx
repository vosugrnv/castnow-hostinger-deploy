export type ShootKind =
  | "portrait"
  | "fashion"
  | "product"
  | "wedding"
  | "event"
  | "family"
  | "outdoor"
  | "commercial"
  | "model"
  | "photographer";

const GRADIENTS: Record<ShootKind, string> = {
  portrait: "linear-gradient(135deg, #b40fe0 0%, #ff1468 100%)",
  fashion: "linear-gradient(135deg, #ff1468 0%, #ff7a00 100%)",
  product: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
  wedding: "linear-gradient(135deg, #f472b6 0%, #fb7185 55%, #fda4af 100%)",
  event: "linear-gradient(135deg, #c026d3 0%, #f97316 100%)",
  family: "linear-gradient(135deg, #fb7185 0%, #f59e0b 100%)",
  outdoor: "linear-gradient(135deg, #8b5cf6 0%, #ff4f8b 60%, #ffb347 100%)",
  commercial: "linear-gradient(135deg, #e11d48 0%, #a21caf 100%)",
  model: "linear-gradient(135deg, #a21caf 0%, #ff1468 60%, #ff7a00 100%)",
  photographer: "linear-gradient(135deg, #1a2744 0%, #6b21a8 55%, #e3146f 100%)",
};

const ALT: Record<ShootKind, string> = {
  portrait: "Chân dung mẫu áo dài tại Hội An",
  fashion: "Lookbook áo dài phong cách Việt Nam",
  product: "Chụp ảnh sản phẩm ẩm thực Việt — tô phở",
  wedding: "Cặp đôi chụp ảnh cưới áo dài ở Hội An",
  event: "Sự kiện thả đèn hoa đăng Hội An",
  family: "Chụp ảnh mẹ và bé Việt Nam",
  outdoor: "Ngoại cảnh áo dài tại Lăng Chủ tịch Hồ Chí Minh",
  commercial: "Ảnh thương mại cà phê phin Việt Nam",
  model: "Mẫu áo dài trắng và nón lá",
  photographer: "Mẫu áo dài nón lá tại di tích Việt Nam",
};

/** Neo khung để mặt / chủ thể không bị cắt trong thẻ 4:3. */
const OBJECT_POSITION: Record<ShootKind, string> = {
  portrait: "center 42%",
  fashion: "center 22%",
  product: "center 45%",
  wedding: "center 28%",
  event: "center 40%",
  family: "center 22%",
  outdoor: "center 38%",
  commercial: "center 35%",
  model: "center 28%",
  photographer: "center 28%",
};

export function shootPhoto(kind: ShootKind, small = false) {
  return `/shoots/${kind}${small ? "-sm" : ""}.webp`;
}

/** Ô ảnh theo kiểu chụp: ảnh thật Việt Nam, phủ nhẹ màu thương hiệu, khung ngắm như logo. */
export function ShootTile({
  kind,
  className = "",
  label,
  small = false,
  frame = true,
  alt,
}: {
  kind: ShootKind;
  className?: string;
  label?: string;
  small?: boolean;
  frame?: boolean;
  alt?: string;
}) {
  return (
    <div className={`shoot-tile relative overflow-hidden bg-[#f3e6ee] text-white ${className}`}>
      <img
        src={shootPhoto(kind, small)}
        alt={alt ?? (small ? "" : ALT[kind])}
        loading="lazy"
        decoding="async"
        className="shoot-tile-img absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: OBJECT_POSITION[kind] }}
      />
      <span
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{ backgroundImage: GRADIENTS[kind] }}
        aria-hidden
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/35 to-transparent" aria-hidden />
      {frame && !small ? (
        <span className="pointer-events-none absolute inset-[8%]" aria-hidden>
          <i className="absolute left-0 top-0 h-[16%] w-[16%] rounded-tl-[30%] border-l-2 border-t-2 border-white/80" />
          <i className="absolute right-0 top-0 h-[16%] w-[16%] rounded-tr-[30%] border-r-2 border-t-2 border-white/80" />
          <i className="absolute bottom-0 left-0 h-[16%] w-[16%] rounded-bl-[30%] border-b-2 border-l-2 border-white/80" />
          <i className="absolute bottom-0 right-0 h-[16%] w-[16%] rounded-br-[30%] border-b-2 border-r-2 border-white/80" />
        </span>
      ) : null}
      {label ? (
        <span className="absolute inset-x-0 bottom-0 px-3 pb-2.5 text-[12px] font-bold tracking-wide text-white drop-shadow">{label}</span>
      ) : null}
    </div>
  );
}
