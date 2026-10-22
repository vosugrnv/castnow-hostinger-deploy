/** Danh mục kiểu buổi chụp — khớp web/lib/site.ts (SERVICES) để hồ sơ /mau-anh-nhiep-anh-gia hiện đúng. */

export const WEB_SITE_URL = "https://www.castnowvietnam.com";

export const WEB_TASKER_CITIES = [
  "TP.HCM", "Hà Nội", "Đà Nẵng", "Hải Phòng", "Khánh Hòa", "Bắc Ninh", "Cần Thơ", "An Giang",
  "Bắc Giang", "Bình Dương", "Quảng Ninh", "Lâm Đồng", "Bà Rịa - Vũng Tàu", "Cà Mau", "Đắk Lắk",
  "Gia Lai", "Ninh Bình", "Hòa Bình", "Thanh Hóa", "Thái Nguyên", "Tiền Giang", "Thừa Thiên Huế",
  "Vĩnh Long", "Bạc Liêu", "Lào Cai", "Quảng Nam", "Thái Bình", "Đồng Nai", "Kiên Giang",
  "Ninh Thuận", "Quảng Ngãi", "Tuyên Quang", "Vĩnh Phúc", "Bình Định", "Hà Tĩnh", "Hậu Giang",
  "Nghệ An", "Hà Nam", "Quảng Bình", "Đồng Tháp", "Hải Dương", "Hưng Yên", "Kon Tum", "Lạng Sơn",
  "Nam Định", "Phú Thọ", "Quảng Trị", "Sóc Trăng", "Tây Ninh", "Điện Biên", "Long An", "Phú Yên",
  "Yên Bái", "Bình Thuận", "Cao Bằng", "Bến Tre", "Bắc Kạn", "Đắk Nông", "Sơn La", "Bình Phước",
  "Hà Giang", "Lai Châu", "Trà Vinh",
];

export const WEB_TASKER_DISTRICTS: Record<string, string[]> = {
  "Hà Nội": [
    "Ba Đình", "Hoàn Kiếm", "Tây Hồ", "Long Biên", "Cầu Giấy", "Đống Đa", "Hai Bà Trưng", "Hoàng Mai",
    "Thanh Xuân", "Nam Từ Liêm", "Bắc Từ Liêm", "Hà Đông", "Sơn Tây", "Đông Anh", "Gia Lâm", "Sóc Sơn",
    "Thanh Trì", "Mê Linh", "Hoài Đức", "Thường Tín",
  ],
  "TP.HCM": [
    "Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 7", "Quận 10", "Quận 11", "Quận 12", "Bình Thạnh",
    "Phú Nhuận", "Tân Bình", "Tân Phú", "Gò Vấp", "Thủ Đức", "Bình Tân", "Hóc Môn", "Củ Chi", "Nhà Bè",
    "Bình Chánh",
  ],
  "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Liên Chiểu", "Cẩm Lệ", "Hòa Vang"],
  "Hải Phòng": ["Hồng Bàng", "Ngô Quyền", "Lê Chân", "Hải An", "Kiến An", "Đồ Sơn", "Dương Kinh"],
  "Cần Thơ": ["Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn", "Thốt Nốt"],
  "Bình Dương": ["Thủ Dầu Một", "Dĩ An", "Thuận An", "Bến Cát", "Tân Uyên"],
  "Đồng Nai": ["Biên Hòa", "Long Khánh", "Nhơn Trạch", "Trảng Bom", "Long Thành"],
  "Khánh Hòa": ["Nha Trang", "Cam Ranh", "Ninh Hòa", "Diên Khánh"],
  "Thừa Thiên Huế": ["Huế", "Hương Thủy", "Hương Trà", "Phú Vang"],
  "Bà Rịa - Vũng Tàu": ["Vũng Tàu", "Bà Rịa", "Phú Mỹ", "Long Điền"],
};

/** Kiểu buổi chụp / concept mẫu ảnh nhận lịch. */
export const WEB_TASKER_SERVICES = [
  "Chụp ảnh chân dung",
  "Chụp ảnh thời trang, lookbook",
  "Chụp ảnh sản phẩm",
  "Chụp ảnh cưới, cặp đôi",
  "Chụp ảnh sự kiện",
  "Chụp ảnh gia đình, em bé",
  "Chụp ảnh ngoại cảnh, du lịch",
  "Chụp ảnh thương mại, quảng cáo",
];

export function slugifyVi(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0111/g, "d")
    .replace(/\u0110/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function webTaskerUrl(id: string, fullName: string) {
  return `${WEB_SITE_URL}/mau-anh-nhiep-anh-gia/${slugifyVi(fullName)}-${id}`;
}

/** Cắt ảnh về khung 4:5 (giống thẻ trên web), nén JPEG để lưu gọn trong DB.
 *  Ảnh dọc bị cắt lệch lên trên để giữ khuôn mặt. */
export async function prepareTaskerPhoto(file: File): Promise<{ base64: string; dataUrl: string }> {
  if (!file.type.startsWith("image/")) throw new Error("File không phải ảnh.");
  const bitmap = await createImageBitmap(file);
  const targetW = 600;
  const targetH = 750;
  const scale = Math.max(targetW / bitmap.width, targetH / bitmap.height);
  const drawW = bitmap.width * scale;
  const drawH = bitmap.height * scale;

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Trình duyệt không hỗ trợ xử lý ảnh.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, targetW, targetH);
  ctx.drawImage(bitmap, (targetW - drawW) / 2, (targetH - drawH) * 0.3, drawW, drawH);
  bitmap.close();

  const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
  return { base64: dataUrl.slice(dataUrl.indexOf(",") + 1), dataUrl };
}
