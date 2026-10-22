import type { PublicTasker, PublicTaskerOffer } from "@/lib/publicTaskerTypes";

export type VirtualReview = {
  id: string;
  author: string;
  rating: 4 | 5;
  daysAgo: number;
  serviceLabel: string;
  body: string;
};

const AUTHORS = [
  "Minh Anh",
  "Thu Hà",
  "Quốc Bảo",
  "Lan Phương",
  "Hoàng Nam",
  "Ngọc Trâm",
  "Đức Huy",
  "Mai Chi",
  "Thanh Tùng",
  "Hồng Nhung",
  "Kiều Oanh",
  "Việt Anh",
  "Phương Linh",
  "Tuấn Kiệt",
  "Bảo Châu",
  "Khánh Vy",
  "Hữu Phước",
  "Thảo Nhi",
  "Quỳnh Anh",
  "Gia Bảo",
  "Kim Ngân",
  "Anh Thư",
  "Hải Đăng",
  "Yến Nhi",
];

/** Câu đánh giá đầy đủ — mỗi dòng một “giọng” khác nhau. */
const PORTRAIT_LINES = [
  "Đặt {offer}, ảnh profile lên rất có hồn. Sẽ đặt lại với {name}.",
  "{name} chỉnh góc mặt và tư thế rất kỹ, mình không quen chụp mà vẫn tự nhiên.",
  "Lần đầu dùng CastNow — đến đúng giờ, ánh sáng setup gọn, ảnh đẹp hơn mong đợi.",
  "Headshot cho CV xong trong một buổi. Giá {price} hợp lý.",
  "Ảnh chân dung giữ đúng màu da, retouch nhẹ, không bị giả.",
  "Gói {offer} có cả ảnh thô và ảnh chỉnh, bàn giao đúng hẹn.",
];

const FASHION_LINES = [
  "Lookbook cho shop lên màu chuẩn, outfit nào cũng rõ form. {offer} đáng {price}.",
  "{name} tạo dáng chuyên nghiệp, đổi 6 outfit vẫn giữ năng lượng tốt.",
  "Street style ngoài phố mà ảnh vẫn sạch, ít người lọt khung.",
  "Brief gửi trước một ngày, đến nơi đã nắm concept. Rất yên tâm.",
  "Mẫu đúng gu thương hiệu mình, khách inbox hỏi đồ nhiều hơn hẳn.",
];

const PRODUCT_LINES = [
  "Ảnh sản phẩm nền trắng sạch, đủ góc cho sàn thương mại. Gói {offer} ổn.",
  "{name} xử lý phản sáng chai lọ rất khéo, không phải chỉnh nhiều.",
  "Chụp 30 sản phẩm trong một buổi, đặt tên file gọn gàng. Giá {price} minh bạch.",
  "Ảnh đồ ăn lên màu ngon mắt, đăng menu là có đơn.",
];

const WEDDING_LINES = [
  "Pre-wedding ngoài trời đúng giờ vàng, ảnh rất cảm xúc. Cảm ơn {name}.",
  "Hai đứa ngại chụp nhưng được hướng dẫn tạo dáng từng chút, ảnh tự nhiên.",
  "Gói {offer} bàn giao album sớm hơn hẹn. Đáng {price}.",
  "Chụp lễ cưới bắt được nhiều khoảnh khắc gia đình mình không để ý.",
];

const EVENT_LINES = [
  "Sự kiện khai trương đông người mà ảnh vẫn đủ khách mời, đủ hậu trường.",
  "{name} di chuyển nhanh, không cản trở chương trình. {offer} ổn.",
  "Gửi ảnh chọn lọc ngay tối hôm đó để kịp đăng fanpage.",
  "Chụp hội nghị rõ diễn giả, ánh sáng sân khấu xử lý tốt.",
];

const FAMILY_LINES = [
  "Bé nhà mình hiếu động mà {name} vẫn bắt được nhiều ảnh cười.",
  "Ảnh gia đình tại nhà ấm áp, không cần thuê studio. Gói {offer} hợp lý.",
  "Kiên nhẫn với ông bà và trẻ nhỏ, cả nhà đều thoải mái.",
];

const OUTDOOR_LINES = [
  "Chụp ngoại cảnh công viên, {name} chọn góc tránh nắng gắt rất có kinh nghiệm.",
  "Concept biển lúc hoàng hôn đẹp như moodboard. {offer} đáng {price}.",
  "Gợi ý địa điểm gần nhà mình mà vẫn lên hình đẹp.",
];

const COMMERCIAL_LINES = [
  "Ảnh thương hiệu cho fanpage đồng bộ tông màu, đủ kích thước đăng các kênh.",
  "{name} hiểu brief quảng cáo nhanh, số ảnh bàn giao đúng như đơn.",
  "Bộ ảnh {offer} dùng cho cả website và banner. Giá {price} rõ ràng.",
];

const GENERIC_LINES = [
  "Đúng giờ, gửi brief trong app rõ ràng. Gói {offer} ổn.",
  "{name} nhiệt tình, ảnh đúng concept mình gửi.",
  "Đặt lịch dễ, bàn giao ảnh đúng hẹn, sẽ giới thiệu bạn bè.",
  "Chất lượng ảnh tốt so với giá {price}. {offer} phù hợp.",
  "Làm việc chuyên nghiệp, không kéo dài buổi chụp vô ích.",
  "Thái độ vui vẻ, góp ý tạo dáng rất có tâm.",
  "So với lần đặt trước ở nơi khác, lần này yên tâm hơn nhiều.",
  "Sẽ đặt lại cho buổi chụp sau — portfolio đúng như thực tế.",
];

const TEMPLATES: { match: RegExp; lines: string[] }[] = [
  { match: /chân dung|profile|headshot/i, lines: PORTRAIT_LINES },
  { match: /thời trang|lookbook|mẫu/i, lines: FASHION_LINES },
  { match: /sản phẩm|catalog|đồ ăn/i, lines: PRODUCT_LINES },
  { match: /cưới|cặp đôi|pre-wedding/i, lines: WEDDING_LINES },
  { match: /sự kiện|hội nghị|khai trương/i, lines: EVENT_LINES },
  { match: /gia đình|em bé|bé/i, lines: FAMILY_LINES },
  { match: /ngoại cảnh|ngoài trời|du lịch/i, lines: OUTDOOR_LINES },
  { match: /thương mại|quảng cáo|thương hiệu/i, lines: COMMERCIAL_LINES },
];

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(list: T[], rand: () => number): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

function formatPrice(price: number) {
  return `${price.toLocaleString("vi-VN")}đ`;
}

function templatesFor(service: string) {
  const hit = TEMPLATES.find((t) => t.match.test(service));
  return hit?.lines ?? GENERIC_LINES;
}

function fill(template: string, ctx: { name: string; offer: string; price: string }) {
  return template
    .replaceAll("{name}", ctx.name)
    .replaceAll("{offer}", ctx.offer)
    .replaceAll("{price}", ctx.price);
}

/** Sinh đánh giá ổn định, mỗi bài một giọng / nội dung khác nhau. */
export function buildVirtualReviews(tasker: PublicTasker): VirtualReview[] {
  if (tasker.source !== "virtual") return [];
  const count = Math.max(0, Math.min(tasker.jobCount ?? 0, 12));
  if (!count) return [];

  const offers: PublicTaskerOffer[] =
    tasker.offers && tasker.offers.length
      ? tasker.offers
      : tasker.services.map((service) => ({
          service,
          label: service,
          price: 0,
          featured: false,
        }));

  const rand = mulberry32(hash(tasker.id));
  const shortName = tasker.name.split(/\s+/).slice(-2).join(" ") || tasker.name;

  // Kho câu theo dịch vụ + generic, xáo trộn một lần rồi lấy lần lượt → không trùng mẫu.
  const lineBag: string[] = [];
  const seenLine = new Set<string>();
  for (const offer of offers) {
    for (const line of templatesFor(offer.service)) {
      if (!seenLine.has(line)) {
        seenLine.add(line);
        lineBag.push(line);
      }
    }
  }
  for (const line of GENERIC_LINES) {
    if (!seenLine.has(line)) {
      seenLine.add(line);
      lineBag.push(line);
    }
  }
  const lines = shuffle(lineBag, rand);
  const authorOrder = shuffle(AUTHORS, rand);
  const dayOffsets = shuffle(
    Array.from({ length: 100 }, (_, i) => 2 + i),
    rand,
  );

  const usedBodies = new Set<string>();
  const reviews: VirtualReview[] = [];

  for (let i = 0; i < count; i += 1) {
    const offer = offers[i % offers.length]!;
    // Ưu tiên câu còn lại; nếu hết thì ghép biến thể bằng offer/price khác.
    let template = lines[i % lines.length]!;
    let body = fill(template, {
      name: shortName,
      offer: offer.label,
      price: offer.price > 0 ? formatPrice(offer.price) : "theo báo giá",
    });
    let guard = 0;
    while (usedBodies.has(body) && guard < lines.length + offers.length) {
      guard += 1;
      const nextOffer = offers[(i + guard) % offers.length]!;
      template = lines[(i + guard) % lines.length]!;
      body = fill(template, {
        name: shortName,
        offer: nextOffer.label,
        price: nextOffer.price > 0 ? formatPrice(nextOffer.price) : "theo báo giá",
      });
    }
    // Vẫn trùng (hiếm) → thêm hậu tố ngữ cảnh ngắn, vẫn nghe tự nhiên.
    if (usedBodies.has(body)) {
      const tails = [
        " Đặt qua app rất tiện.",
        " Sẽ giới thiệu hàng xóm.",
        " Làm việc đúng mô tả đơn.",
        " Hài lòng hơn lần trước.",
      ];
      body = `${body}${tails[i % tails.length]}`;
    }
    usedBodies.add(body);

    const author = authorOrder[i % authorOrder.length]!;
    const daysAgo = dayOffsets[i] ?? 3 + i * 5;
    const rating: 4 | 5 = rand() < 0.18 ? 4 : 5;

    reviews.push({
      id: `${tasker.id}-r${i}`,
      author,
      rating,
      daysAgo,
      serviceLabel: offer.label,
      body,
    });
  }

  return reviews.sort((a, b) => a.daysAgo - b.daysAgo);
}

export function reviewDateLabel(daysAgo: number) {
  if (daysAgo <= 1) return "Hôm qua";
  if (daysAgo < 7) return `${daysAgo} ngày trước`;
  if (daysAgo < 30) return `${Math.max(1, Math.floor(daysAgo / 7))} tuần trước`;
  return `${Math.max(1, Math.floor(daysAgo / 30))} tháng trước`;
}

/** Ngày tuyệt đối kiểu Zena: 08-09-2026 */
export function reviewAbsoluteDate(daysAgo: number, format: "display" | "iso" = "display") {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - Math.max(0, daysAgo));
  if (format === "iso") return d.toISOString().slice(0, 10);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${d.getFullYear()}`;
}
