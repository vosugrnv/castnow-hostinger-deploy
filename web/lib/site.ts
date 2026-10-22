export const COMPANY = "LITETECH COMPANY LIMITED";
export const SUPPORT_EMAIL = "support@castnow.vn";
export const SITE_URL = "https://www.castnowvietnam.com";
export const ZALO_URL = "https://zalo.me/castnow";
export const APP_DOWNLOAD_URL = "https://onelink.to/castnow";
export const APP_STORE_URL = "https://apps.apple.com/vn/app/castnow/id6771256512?l=vi";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.castnow.app&hl=vi";

export const SOCIALS = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/search/top?q=CastNow" },
  { id: "twitter", label: "Twitter", href: "https://x.com/search?q=CastNow" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/results?search_query=CastNow" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/search?q=CastNow" },
] as const;

export const SERVICES = [
  {
    kind: "portrait",
    title: "Chụp ảnh chân dung",
    short: "Chân dung",
    note: "Ảnh profile, headshot, ảnh CV và chân dung nghệ thuật.",
    body: "Headshot cho CV, ảnh profile và chân dung nghệ thuật theo concept. Chọn mẫu ảnh đúng góc mặt, phong cách và khung giờ bạn cần.",
    closer: "Xem portfolio rồi chốt mẫu ảnh.",
  },
  {
    kind: "fashion",
    title: "Chụp ảnh thời trang, lookbook",
    short: "Thời trang",
    note: "Lookbook, street style, ảnh mặc thử cho shop quần áo.",
    body: "Lookbook bộ sưu tập, ảnh mặc thử đăng sàn, street style ngoài phố. Thuê mẫu ảnh đúng số đo, số outfit và phong cách cho buổi chụp.",
    closer: "Chốt mẫu ảnh trên đơn trước buổi chụp.",
  },
  {
    kind: "product",
    title: "Chụp ảnh sản phẩm",
    short: "Sản phẩm",
    note: "Ảnh mỹ phẩm, đồ ăn, phụ kiện cho shop online và catalog.",
    body: "Ảnh nền trắng cho sàn thương mại điện tử, ảnh mỹ phẩm, đồ ăn, phụ kiện có bối cảnh. Ghi số sản phẩm, số góc và kích thước ảnh để nhận báo giá sát.",
    closer: "Brief càng rõ, báo giá càng đúng.",
  },
  {
    kind: "wedding",
    title: "Chụp ảnh cưới, cặp đôi",
    short: "Cưới & cặp đôi",
    note: "Pre-wedding, phóng sự cưới, ảnh kỷ niệm cặp đôi.",
    body: "Pre-wedding ngoại cảnh, phóng sự ngày cưới, ảnh kỷ niệm và cầu hôn. Chọn khung giờ, địa điểm và phong cách màu trước khi chốt lịch.",
    closer: "Xem portfolio của mẫu ảnh trước khi đặt.",
  },
  {
    kind: "event",
    title: "Chụp ảnh sự kiện",
    short: "Sự kiện",
    note: "Khai trương, hội nghị, tiệc công ty, sân khấu.",
    body: "Khai trương cửa hàng, hội nghị, tiệc tất niên, sinh nhật và sân khấu. Ghi thời lượng, số khách và yêu cầu trang phục để mẫu ảnh chuẩn bị.",
    closer: "Lịch sự kiện được chốt trên đơn.",
  },
  {
    kind: "family",
    title: "Chụp ảnh gia đình, em bé",
    short: "Gia đình",
    note: "Ảnh gia đình, em bé, kỷ niệm tại nhà hoặc studio.",
    body: "Ảnh gia đình tại nhà, chụp em bé, mẹ bầu và các dịp kỷ niệm. Chọn mẫu ảnh hợp concept và khung giờ cả nhà thoải mái.",
    closer: "Đặt mẫu có portfolio gần concept của bạn.",
  },
  {
    kind: "outdoor",
    title: "Chụp ảnh ngoại cảnh, du lịch",
    short: "Ngoại cảnh",
    note: "Công viên, phố cổ, biển, du lịch và concept ngoài trời.",
    body: "Chụp ngoại cảnh công viên, phố cổ, biển và ảnh du lịch. Ghi địa điểm và giờ vàng trong brief, app ưu tiên mẫu ảnh đang ở gần nơi chụp.",
    closer: "Mẫu ảnh gần địa điểm, đến đúng giờ.",
  },
  {
    kind: "commercial",
    title: "Chụp ảnh thương mại, quảng cáo",
    short: "Thương mại",
    note: "Ảnh thương hiệu, quảng cáo, nội dung mạng xã hội.",
    body: "Ảnh nhận diện thương hiệu, banner quảng cáo, nội dung TikTok, Facebook và website. Nêu kênh đăng, số ảnh bàn giao và quyền sử dụng ngay trên đơn.",
    closer: "Giá và phạm vi bàn giao nằm trên đơn.",
  },
] as const;

export type Service = (typeof SERVICES)[number];

/** Nhãn kiểu buổi chụp dùng chung admin hồ sơ mẫu & trang /mau-anh-nhiep-anh-gia. */
export const MODEL_SERVICE_LABELS = SERVICES.map((s) => s.title);

export const STEPS = [
  {
    n: "01",
    title: "Chọn kiểu buổi chụp",
    body: "Mở app, chọn chân dung, thời trang, sản phẩm, cưới, sự kiện hoặc kể concept bạn đang cần.",
  },
  {
    n: "02",
    title: "Nói với trợ lý AI",
    body: "Trợ lý nghe phong cách, địa điểm và thời gian rồi gợi ý mẫu ảnh phù hợp.",
  },
  {
    n: "03",
    title: "Chọn mẫu đúng yêu cầu",
    body: "Xem hồ sơ, portfolio và báo giá theo concept, rồi tự chọn mẫu ảnh phù hợp trước khi đặt lịch.",
  },
  {
    n: "04",
    title: "Chốt lịch đến khi xong",
    body: "Nhắn brief trong đơn, thanh toán trên app, nhận ảnh và đánh giá sau buổi chụp.",
  },
] as const;

type FaqGroup = { id: string; title: string; items: { q: string; a: string }[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "co-ban",
    title: "Về CastNow",
    items: [
      {
        q: "CastNow là ứng dụng gì?",
        a: "CastNow là nền tảng đặt lịch mẫu ảnh. Bạn chọn kiểu buổi chụp, xem hồ sơ và chốt lịch trên app. Mẫu ảnh bạn chọn đến đúng địa điểm, đúng khung giờ.",
      },
      {
        q: "CastNow có trực tiếp chụp ảnh không?",
        a: "Không. CastNow là nền tảng kết nối do LITETECH COMPANY LIMITED vận hành. Người thực hiện buổi chụp là mẫu ảnh bạn chọn. Giá, giờ và phạm vi buổi chụp được chốt trên đơn.",
      },
      {
        q: "CastNow dùng được ở đâu?",
        a: "Trong app bạn chọn tỉnh thành trước. CastNow phủ 63 tỉnh thành. Sau khi có địa điểm chụp, app ưu tiên mẫu ảnh đang nhận lịch trong bán kính khoảng 10km.",
      },
      {
        q: "CastNow đặt được những kiểu chụp nào?",
        a: "Chân dung, thời trang, sản phẩm, cưới và cặp đôi, sự kiện, gia đình, ngoại cảnh và ảnh thương mại. Bạn đặt mẫu ảnh đúng concept cho buổi chụp.",
      },
    ],
  },
  {
    id: "dat-viec",
    title: "Đặt Lịch",
    items: [
      {
        q: "Đặt lịch mất bao lâu?",
        a: "Bạn chọn kiểu buổi chụp, mô tả concept và khung giờ. App hướng tới việc có mẫu phù hợp trong vòng 60 phút, tùy khu vực và số mẫu ảnh đang rảnh.",
      },
      {
        q: "Bán kính 10km dùng để làm gì?",
        a: "Sau khi có địa điểm chụp, CastNow ưu tiên mẫu ảnh trong bán kính khoảng 10km để mẫu đến đúng chỗ. Khoảng cách hiện trên app trước khi bạn chốt.",
      },
      {
        q: "Trợ lý AI giúp được gì?",
        a: "Bạn kể concept bằng lời thường, ví dụ ảnh chân dung ngoài trời buổi chiều hoặc lookbook thời trang trong studio. Trợ lý gợi ý kiểu chụp và người phù hợp phong cách, giá và thời gian. Bạn vẫn tự xem hồ sơ và tự chọn.",
      },
      {
        q: "Có cần đưa số điện thoại cho mẫu ảnh không?",
        a: "Không cần ngay từ đầu. Đổi giờ, gửi brief hay hỏi thêm đều nhắn trong đơn. Trạng thái đơn cho biết ai nhận, đang đến hay đã xong buổi chụp.",
      },
      {
        q: "Muốn đổi giờ hoặc hủy lịch thì làm sao?",
        a: "Nhắn rõ trên đơn trước giờ diễn ra. Thêm địa điểm, trang phục hoặc người tham gia cũng cần thống nhất trên đơn trước.",
      },
    ],
  },
  {
    id: "thanh-toan",
    title: "Giá Và Thanh Toán",
    items: [
      {
        q: "Giá buổi chụp được tính thế nào?",
        a: "CastNow không niêm một bảng giá cứng cho mọi buổi. Mẫu ảnh đọc brief rồi gửi báo giá trên đơn. Bạn thấy mức giá, khung giờ và phạm vi buổi chụp trước khi đồng ý.",
      },
      {
        q: "Thanh toán bằng cách nào?",
        a: "Thanh toán trên đơn trong app. Nếu trả tại địa điểm chụp, bạn có thể quét mã QR; giao dịch vẫn được ghi trên ví.",
      },
      {
        q: "Giao dịch có vấn đề thì khiếu nại ở đâu?",
        a: "Gửi email về support@castnow.vn kèm mã đơn. Giao dịch đã ghi nhận trên ví không tự ý sửa, nên mã đơn giúp kiểm tra nhanh hơn.",
      },
    ],
  },
  {
    id: "doi-tac",
    title: "Dành Cho Mẫu Ảnh",
    items: [
      {
        q: "Muốn nhận lịch trên CastNow thì đăng ký ở đâu?",
        a: "Trong app, chuyển sang hồ sơ mẫu ảnh và gửi portfolio, khu vực nhận lịch, ảnh chân dung. Hồ sơ được xét duyệt trước khi nhận lịch.",
      },
      {
        q: "Người nhận lịch được trả tiền thế nào?",
        a: "Bạn có ví riêng để xem số dư, sao kê và gửi yêu cầu rút tiền. Khi khách trả tại buổi chụp, dùng mã QR để thu.",
      },
      {
        q: "Mẫu ảnh có phải nhân viên của CastNow không?",
        a: "Không. Mẫu ảnh là đối tác nhận lịch trên nền tảng, tự sắp xếp thời gian và chịu trách nhiệm buổi đã nhận.",
      },
    ],
  },
  {
    id: "tai-khoan",
    title: "Tài Khoản Và Dữ Liệu",
    items: [
      {
        q: "Vị trí của tôi được dùng vào việc gì?",
        a: "Vị trí dùng để tìm mẫu ảnh quanh địa điểm chụp khi bạn bật quyền. App không dùng vị trí để theo dõi khi bạn không mở tính năng cần định vị.",
      },
      {
        q: "Xóa tài khoản được không?",
        a: "Có. Trong phần cài đặt của app bạn có thể yêu cầu xóa tài khoản. Cần hỗ trợ thì viết về support@castnow.vn.",
      },
    ],
  },
];

export const FAQS = FAQ_GROUPS.flatMap((group) => group.items);

/** Câu hỏi hiện trên trang chủ, bám các từ khóa tìm kiếm chính (thuê mẫu ảnh, đặt lịch mẫu ảnh). */
export const HOME_FAQS = [
  {
    q: "CastNow là gì?",
    a: "CastNow là nền tảng đặt lịch mẫu ảnh do LITETECH COMPANY LIMITED vận hành. Bạn chọn kiểu buổi chụp, xem hồ sơ, portfolio và báo giá, rồi chốt lịch ngay trên app. Mẫu ảnh bạn chọn đến đúng địa điểm, đúng khung giờ.",
  },
  {
    q: "Thuê mẫu ảnh trên CastNow giá bao nhiêu?",
    a: "CastNow không áp một bảng giá cứng. Mẫu ảnh đọc brief rồi gửi báo giá trên đơn, tùy kiểu chụp, thời lượng, số outfit và địa điểm. Bạn thấy mức giá trước khi đồng ý, mức đã chốt nằm trên đơn.",
  },
  {
    q: "Thuê mẫu ảnh cho shop quần áo hoặc thương hiệu thế nào?",
    a: "Chọn kiểu chụp thời trang hoặc thương mại, mô tả sản phẩm, số outfit, phong cách và địa điểm. Mẫu ảnh phù hợp gửi báo giá, bạn xem portfolio rồi tự chọn. Phạm vi sử dụng ảnh nên ghi rõ trên đơn.",
  },
  {
    q: "Một buổi chụp đặt được mấy mẫu ảnh?",
    a: "Bạn đặt mẫu ảnh cho đúng concept của buổi chụp. Brief ghi số người, số outfit, giờ và địa điểm. Mẫu ảnh xem brief rồi gửi báo giá, bạn tự chọn người phù hợp.",
  },
  {
    q: "CastNow có ở tỉnh thành của tôi không?",
    a: "CastNow phủ 63 tỉnh thành. Sau khi bạn nhập địa điểm chụp, app ưu tiên mẫu ảnh đang nhận lịch trong bán kính khoảng 10km và hiện khoảng cách trước khi bạn chốt.",
  },
  {
    q: "Ảnh chụp xong được bàn giao thế nào?",
    a: "Số ảnh, ảnh chỉnh hay ảnh gốc và thời hạn bàn giao được ghi trên đơn trước buổi chụp. Sau buổi chụp, bạn nhận ảnh theo đúng phạm vi đã chốt và đánh giá mẫu ảnh ngay trên đơn.",
  },
  {
    q: "Làm sao để nhận lịch làm mẫu trên CastNow?",
    a: "Tải app, mở hồ sơ mẫu ảnh, thêm portfolio, phong cách và khu vực nhận lịch. Hồ sơ được xét duyệt trước khi lịch mới hiện về. Bạn có ví riêng để xem số dư và rút tiền.",
  },
];
