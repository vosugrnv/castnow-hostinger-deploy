export type BlogSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** Ảnh bìa thật (shoots/lookbook) */
  cover: string;
  img: string;
  photo: boolean;
  readMin: number;
  published: string;
  sections: BlogSection[];
  tip: string;
};

export const BLOG_CATEGORIES = ["Chân dung", "Lookbook", "Chọn mẫu", "Brief", "Concept", "Nhận lịch"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "chon-mau-anh-dung-concept",
    title: "Chọn Mẫu Ảnh Đúng Concept Buổi Chụp",
    excerpt:
      "Đúng concept quan trọng hơn đúng khoảng cách. Portfolio, kiểu tạo dáng và số outfit giúp bạn chọn mẫu phù hợp yêu cầu trước khi chốt lịch.",
    category: "Chọn mẫu",
    cover: "/blog/choose.webp",
    img: "/blog/choose.webp",
    photo: true,
    readMin: 5,
    published: "2026-10-20",
    sections: [
      {
        id: "concept-truoc",
        heading: "Ghi concept trước khi mở danh sách mẫu",
        paragraphs: [
          "Viết ngắn: kiểu buổi chụp, tông màu, số outfit và không khí bạn muốn. Một brief rõ giúp bạn lọc hồ sơ nhanh thay vì lướt hết mọi mẫu.",
          "Ví dụ: lookbook thu đông 6 outfit cho shop online, studio trắng, mẫu nữ cao 1m68 trở lên.",
        ],
      },
      {
        id: "portfolio",
        heading: "Đọc portfolio theo đúng thể loại",
        paragraphs: [
          "Mẫu hợp chụp sản phẩm chưa chắc hợp lookbook đường phố. Chỉ xem các bộ ảnh cùng kiểu với buổi bạn sắp đặt: chân dung, thời trang, cưới hoặc sự kiện.",
        ],
        list: ["Ảnh gần nhất cùng concept", "Cách tạo dáng và biểu cảm", "Trang phục và không gian từng set"],
      },
      {
        id: "tu-chon",
        heading: "Bạn tự chọn trên đơn",
        paragraphs: [
          "CastNow gợi ý mẫu theo concept và khu vực, nhưng bạn vẫn xem báo giá, so hồ sơ rồi tự bấm chọn. Đúng người quan trọng hơn chọn nhanh.",
        ],
      },
    ],
    tip: "Lọc theo kiểu buổi chụp trước, rồi mới so portfolio. Đừng bắt đầu bằng mức giá thấp nhất.",
  },
  {
    slug: "lookbook-cho-shop",
    title: "Lookbook Cho Shop: Brief Mẫu Ảnh Cần Ghi Gì",
    excerpt:
      "Số outfit, quyền dùng ảnh và địa điểm quyết định báo giá. Brief rõ giúp mẫu ảnh chuẩn bị đúng lookbook của shop.",
    category: "Lookbook",
    cover: "/blog/lookbook.webp",
    img: "/blog/lookbook.webp",
    photo: true,
    readMin: 4,
    published: "2026-10-19",
    sections: [
      {
        id: "so-outfit",
        heading: "Số outfit và thời lượng",
        paragraphs: [
          "Ghi rõ bao nhiêu look, mỗi look cần bao nhiêu ảnh dùng được và bạn muốn chụp trong bao lâu. Shop thường đặt 4–8 outfit cho một buổi.",
        ],
      },
      {
        id: "quyen",
        heading: "Quyền sử dụng ảnh",
        paragraphs: ["Nêu kênh đăng trước khi chốt:"],
        list: ["Website và sàn thương mại", "Facebook, Instagram, TikTok", "In ấn catalogue hoặc biển cửa hàng"],
      },
      {
        id: "chot",
        heading: "Chốt trên CastNow",
        paragraphs: [
          "Chọn kiểu thời trang, đính kèm moodboard và số outfit. Mẫu đọc brief rồi gửi báo giá trên đơn; bạn so portfolio rồi tự chọn.",
        ],
      },
    ],
    tip: "Gửi 5–8 ảnh tham chiếu cùng tông. Moodboard tốt giúp mẫu báo giá sát hơn một đoạn mô tả dài.",
  },
  {
    slug: "moodboard-buoi-chup",
    title: "Làm Moodboard Để Mẫu Hiểu Concept Nhanh",
    excerpt:
      "Moodboard ngắn giúp mẫu ảnh nắm tông màu, tạo dáng và không khí. Đây là bước khiến báo giá và buổi chụp sát ý hơn.",
    category: "Brief",
    cover: "/blog/moodboard.webp",
    img: "/blog/moodboard.webp",
    photo: true,
    readMin: 3,
    published: "2026-10-18",
    sections: [
      {
        id: "gom",
        heading: "Gom đúng loại ảnh",
        paragraphs: [
          "Chọn ảnh có cùng ánh sáng, màu và cảm xúc. Đừng trộn ảnh studio tối giản với ảnh đường phố neon trong một moodboard.",
        ],
      },
      {
        id: "gui",
        heading: "Gửi kèm brief trên đơn",
        paragraphs: ["Trong đơn CastNow, đính moodboard cùng các dòng:"],
        list: ["Tông màu muốn giữ", "Thứ nên tránh trong khung hình", "Số look hoặc số ảnh cần dùng"],
      },
      {
        id: "ket-qua",
        heading: "Vì sao moodboard giúp chọn mẫu",
        paragraphs: [
          "Khi concept rõ, bạn dễ nhận ra mẫu nào đã có ảnh cùng phong cách trong portfolio. Đó là cách chọn mẫu đúng yêu cầu thay vì chọn theo cảm tính.",
        ],
      },
    ],
    tip: "Một moodboard 5 ảnh rõ hơn mô tả dài. Cập nhật moodboard nếu đổi concept trước buổi chụp.",
  },
  {
    slug: "chuan-bi-buoi-chup-chan-dung",
    title: "Chuẩn Bị Buổi Chụp Chân Dung",
    excerpt:
      "Ánh sáng, trang phục và moodboard nên gửi trước khi đặt. Vài phút chuẩn bị giúp mẫu ảnh báo giá sát và buổi chụp đúng ý.",
    category: "Chân dung",
    cover: "/blog/portrait.webp",
    img: "/blog/portrait.webp",
    photo: true,
    readMin: 4,
    published: "2026-10-12",
    sections: [
      {
        id: "anh-sang",
        heading: "Chọn ánh sáng trước khi chọn địa điểm",
        paragraphs: [
          "Chân dung đẹp thường bắt đầu từ ánh sáng, không phải từ filter. Cửa sổ lớn, giờ vàng hoặc đèn studio đều cho kết quả khác nhau. Hãy nói rõ bạn muốn ảnh sáng tự nhiên hay ánh sáng có kiểm soát.",
          "Nếu chụp ngoài trời, ghi khung giờ bạn rảnh để mẫu ảnh chuẩn bị trang phục và tạo dáng phù hợp.",
        ],
      },
      {
        id: "trang-phuc",
        heading: "Trang phục và moodboard",
        paragraphs: ["Ba đến năm ảnh tham chiếu đủ để hai bên hiểu tông màu. Nên gửi:"],
        list: [
          "Ảnh trang phục bạn định mặc",
          "Một moodboard hoặc ảnh bạn thích",
          "Ghi chú thứ bạn không muốn xuất hiện trong khung hình",
        ],
      },
      {
        id: "dat-lich",
        heading: "Đặt lịch trên CastNow",
        paragraphs: [
          "Chọn kiểu chân dung, đính kèm moodboard và địa điểm. Mẫu phù hợp concept gửi báo giá. Bạn xem portfolio rồi tự chọn mẫu đúng yêu cầu.",
        ],
      },
    ],
    tip: "Gửi moodboard trước khi chốt giờ. Một buổi chụp chân dung sẽ nhanh hơn khi hai bên đã thống nhất tông ảnh.",
  },
  {
    slug: "pre-wedding-voi-mau",
    title: "Pre-Wedding Với Mẫu Ảnh: Concept Và Trang Phục",
    excerpt:
      "Concept cặp đôi, màu trang phục và địa điểm nên thống nhất trước. Chọn mẫu có portfolio pre-wedding hoặc concept tương tự.",
    category: "Concept",
    cover: "/blog/wedding.webp",
    img: "/blog/wedding.webp",
    photo: true,
    readMin: 4,
    published: "2026-10-17",
    sections: [
      {
        id: "khong-khi",
        heading: "Chọn không khí trước",
        paragraphs: [
          "Pre-wedding đời thường khác pre-wedding lãng mạn ngoài trời. Ghi rõ bạn muốn ảnh vui, tối giản hay cổ điển để lọc portfolio đúng kiểu.",
        ],
      },
      {
        id: "trang-phuc",
        heading: "Trang phục và đạo cụ",
        paragraphs: ["Thống nhất trước buổi chụp:"],
        list: ["Màu trang phục hai người hoặc mẫu tham gia", "Địa điểm studio hay ngoại cảnh", "Số set ảnh cần dùng"],
      },
      {
        id: "chon-mau",
        heading: "Chọn mẫu đúng phong cách",
        paragraphs: [
          "Xem các bộ ảnh cưới hoặc cặp đôi trong hồ sơ. Mẫu đã làm concept tương tự sẽ tạo dáng và phối hợp nhanh hơn trên set.",
        ],
      },
    ],
    tip: "Gửi moodboard cặp đôi trước khi nhận báo giá. Concept rõ giúp mẫu chuẩn bị biểu cảm và trang phục sát hơn.",
  },
  {
    slug: "tro-ly-ai-goi-y-mau",
    title: "Dùng Trợ Lý AI Để Gợi Ý Mẫu Đúng Phong Cách",
    excerpt:
      "Kể concept bằng lời thường, trợ lý gợi ý kiểu chụp và mẫu phù hợp. Bạn vẫn tự xem hồ sơ và tự chọn trước khi đặt.",
    category: "Chọn mẫu",
    cover: "/blog/hero-model.webp",
    img: "/blog/hero-model.webp",
    photo: true,
    readMin: 3,
    published: "2026-10-16",
    sections: [
      {
        id: "ke",
        heading: "Kể concept như nói chuyện",
        paragraphs: [
          "Ví dụ: “Lookbook 8 outfit cho shop thời trang, studio sáng, mẫu nữ năng động.” Trợ lý hiểu kiểu buổi chụp và hướng hồ sơ cần xem.",
        ],
      },
      {
        id: "goi-y",
        heading: "Gợi ý chỉ là bước đầu",
        paragraphs: [
          "AI giúp thu hẹp danh sách theo phong cách và yêu cầu. Bạn vẫn mở portfolio, so báo giá và tự quyết định mẫu trên đơn.",
        ],
      },
      {
        id: "ket-hop",
        heading: "Kết hợp brief và gợi ý",
        paragraphs: [
          "Sau khi nhận gợi ý, gửi moodboard trong đơn. Brief rõ giúp mẫu báo giá sát và buổi chụp đúng concept bạn đã kể.",
        ],
      },
    ],
    tip: "Càng cụ thể về outfit, địa điểm và phong cách, gợi ý mẫu càng sát yêu cầu.",
  },
  {
    slug: "chon-nhiep-anh-gia",
    title: "Chọn Mẫu Ảnh Theo Portfolio",
    excerpt:
      "Xem bộ ảnh cũ trước, đừng chỉ nhìn giá. Portfolio cho biết phong cách, tạo dáng và cách mẫu ảnh làm việc trong từng concept.",
    category: "Chọn mẫu",
    cover: "/blog/choose.webp",
    img: "/blog/choose.webp",
    photo: true,
    readMin: 4,
    published: "2026-10-10",
    sections: [
      {
        id: "portfolio",
        heading: "Xem đúng thể loại bạn cần",
        paragraphs: [
          "Một mẫu ảnh hợp chụp sản phẩm chưa chắc hợp lookbook. Hãy xem các bộ ảnh cùng kiểu với buổi bạn sắp đặt: chân dung, thời trang, cưới hoặc sự kiện.",
        ],
      },
      {
        id: "gia",
        heading: "So sánh báo giá cùng phạm vi",
        paragraphs: ["Khi đọc báo giá, kiểm tra cùng một danh sách:"],
        list: [
          "Số giờ / số outfit",
          "Phạm vi tạo dáng và thay look",
          "Địa điểm đã bao gồm hay tính riêng",
          "Quyền dùng ảnh trên kênh của bạn",
        ],
      },
      {
        id: "yeu-cau",
        heading: "Khớp với yêu cầu buổi chụp",
        paragraphs: [
          "CastNow giúp bạn tìm mẫu theo concept. Bạn vẫn tự chọn sau khi xem hồ sơ và báo giá trên đơn — đúng mẫu quan trọng hơn chọn vội.",
        ],
      },
    ],
    tip: "Hỏi một câu về buổi chụp gần nhất cùng thể loại. Câu trả lời thường rõ hơn một dòng giới thiệu trên hồ sơ.",
  },
  {
    slug: "brief-cho-mau-anh",
    title: "Viết Brief Cho Mẫu Ảnh",
    excerpt:
      "Concept, số ảnh và địa điểm giúp báo giá sát hơn. Brief ngắn nhưng đủ ý để mẫu ảnh chuẩn bị trang phục và tạo dáng.",
    category: "Brief",
    cover: "/blog/brief.webp",
    img: "/blog/brief.webp",
    photo: true,
    readMin: 3,
    published: "2026-10-08",
    sections: [
      {
        id: "concept",
        heading: "Concept trong vài câu",
        paragraphs: [
          "Viết bạn đang cần lookbook, ảnh profile, ảnh sản phẩm có người mẫu hay bộ ảnh cặp đôi. Thêm tông màu và cảm xúc mong muốn: tối giản, năng động, sang, hay đời thường.",
        ],
      },
      {
        id: "pham-vi",
        heading: "Số ảnh và địa điểm",
        paragraphs: ["Mẫu ảnh báo giá dựa trên thời gian và mức độ chuẩn bị. Nên ghi:"],
        list: [
          "Số look hoặc số outfit",
          "Địa điểm studio hay ngoại cảnh",
          "Thời lượng dự kiến",
          "Ai chuẩn bị trang phục và đạo cụ",
        ],
      },
      {
        id: "chat",
        heading: "Chốt trong đơn",
        paragraphs: [
          "Mọi thay đổi về giờ, concept hoặc chi phí phát sinh nên thống nhất trong chat của đơn trước buổi chụp.",
        ],
      },
    ],
    tip: "Một moodboard 5 ảnh nói rõ hơn một đoạn mô tả dài. Gửi kèm brief khi đặt lịch.",
  },
  {
    slug: "bao-gia-pham-vi-buoi-chup",
    title: "Đọc Báo Giá Mẫu Ảnh: Phạm Vi Cần Kiểm Tra",
    excerpt:
      "Giá thấp chưa chắc đủ. Kiểm tra số outfit, thời lượng, quyền dùng ảnh và những khoản phát sinh trước khi đồng ý trên đơn.",
    category: "Brief",
    cover: "/blog/product-model.webp",
    img: "/blog/product-model.webp",
    photo: true,
    readMin: 4,
    published: "2026-10-15",
    sections: [
      {
        id: "cung-pham-vi",
        heading: "So sánh cùng một phạm vi",
        paragraphs: [
          "Hai báo giá chỉ công bằng khi cùng số look, cùng thời lượng và cùng quyền sử dụng ảnh. Đừng so số tiền nếu phạm vi khác nhau.",
        ],
      },
      {
        id: "checklist",
        heading: "Checklist trước khi đồng ý",
        paragraphs: ["Trên đơn CastNow, xác nhận lại:"],
        list: [
          "Số outfit / số ảnh cần dùng",
          "Thời gian có mặt của mẫu",
          "Quyền đăng trên kênh của bạn",
          "Chi phí phát sinh nếu kéo dài buổi",
        ],
      },
      {
        id: "minh-bach",
        heading: "Mọi thứ nằm trên đơn",
        paragraphs: [
          "CastNow không áp bảng giá cứng. Mẫu đọc brief rồi gửi báo giá; bạn thấy rõ trước khi chốt. Đổi giờ hoặc đổi concept cũng nên cập nhật trên đơn.",
        ],
      },
    ],
    tip: "Nếu brief đổi sau báo giá, nhờ mẫu gửi lại mức mới trên đơn trước buổi chụp.",
  },
  {
    slug: "portfolio-de-duoc-chon",
    title: "Portfolio Để Khách Dễ Chọn Bạn",
    excerpt:
      "Mẫu ảnh được chọn khi hồ sơ cho thấy đúng phong cách khách đang tìm. Vài ảnh đúng thể loại quan trọng hơn một album lẫn lộn.",
    category: "Nhận lịch",
    cover: "/blog/fashion-street.webp",
    img: "/blog/fashion-street.webp",
    photo: true,
    readMin: 4,
    published: "2026-10-06",
    sections: [
      {
        id: "anh-dai-dien",
        heading: "Ảnh đại diện rõ người",
        paragraphs: [
          "Khách chọn người họ sẽ gặp. Ảnh đại diện nên rõ mặt, đủ sáng và đúng với phong cách bạn nhận lịch.",
        ],
      },
      {
        id: "the-loai",
        heading: "Chỉ bật kiểu buổi chụp bạn làm tốt",
        paragraphs: [
          "Chân dung, thời trang, sản phẩm, cưới, sự kiện, gia đình, ngoại cảnh và ảnh thương mại là các kiểu trên CastNow. Chỉ nhận những kiểu bạn đã có ảnh mẫu.",
        ],
      },
      {
        id: "khu-vuc",
        heading: "Khai đúng khu vực",
        paragraphs: [
          "Bật nhận lịch ở tỉnh thành bạn thực sự đến được. Khách chọn mẫu theo concept trước; khu vực khai sai sẽ làm cả hai mất thời gian.",
        ],
      },
    ],
    tip: "Cập nhật portfolio sau mỗi buổi chụp bạn thấy ưng. Hồ sơ mới giúp khách tin bạn đang nhận lịch.",
  },
  {
    slug: "nhan-lich-mau-anh-lan-dau",
    title: "Nhận Lịch Làm Mẫu Lần Đầu Trên CastNow",
    excerpt:
      "Mở hồ sơ mẫu ảnh, thêm portfolio và khu vực nhận lịch. Hồ sơ được xét duyệt trước khi đơn mới hiện về.",
    category: "Nhận lịch",
    cover: "/blog/receive.webp",
    img: "/blog/receive.webp",
    photo: true,
    readMin: 4,
    published: "2026-10-14",
    sections: [
      {
        id: "ho-so",
        heading: "Chuẩn bị hồ sơ trước khi bật nhận",
        paragraphs: [
          "Ảnh chân dung rõ, vài bộ portfolio đúng kiểu bạn nhận, và khu vực bạn thực sự đến được. Hồ sơ đầy đủ được duyệt nhanh hơn.",
        ],
      },
      {
        id: "kieu",
        heading: "Chọn kiểu buổi chụp bạn làm tốt",
        paragraphs: [
          "Chỉ bật lookbook, chân dung hoặc sự kiện nếu bạn đã có ảnh minh họa. Khách lọc theo concept — đúng kiểu giúp bạn được chọn nhiều hơn.",
        ],
      },
      {
        id: "don",
        heading: "Nhận đơn và báo giá",
        paragraphs: [
          "Khi có lịch mới, đọc brief rồi gửi báo giá trên đơn. Trao đổi trang phục, giờ và phạm vi cũng nằm trong app.",
        ],
      },
    ],
    tip: "Bắt đầu với 1–2 kiểu buổi chụp bạn mạnh nhất. Mở rộng sau khi đã có đánh giá tốt.",
  },
  {
    slug: "concept-san-pham-co-mau",
    title: "Ảnh Sản Phẩm Có Mẫu: Concept Nên Ghi Rõ",
    excerpt:
      "Sản phẩm, nền, trang phục và quyền dùng ảnh quyết định báo giá. Brief rõ giúp mẫu chuẩn bị đúng set thương mại.",
    category: "Concept",
    cover: "/blog/product-model.webp",
    img: "/blog/product-model.webp",
    photo: true,
    readMin: 3,
    published: "2026-10-13",
    sections: [
      {
        id: "san-pham",
        heading: "Mô tả sản phẩm và nền",
        paragraphs: [
          "Ghi loại sản phẩm, màu chủ đạo và nền bạn muốn: trắng studio, lifestyle tại quán, hoặc ngoại cảnh. Mẫu cần biết để chọn trang phục không át sản phẩm.",
        ],
      },
      {
        id: "dung",
        heading: "Cách mẫu xuất hiện",
        paragraphs: ["Nêu rõ mẫu cầm sản phẩm, mặc thử hay chỉ xuất hiện một phần. Mỗi cách tạo dáng khác nhau và ảnh hưởng thời lượng buổi chụp."],
      },
      {
        id: "kenh",
        heading: "Kênh đăng và số ảnh",
        paragraphs: [
          "Website, sàn TMĐT hay mạng xã hội cần khung hình khác nhau. Ghi số ảnh cần dùng và quyền đăng để mẫu báo giá đúng phạm vi.",
        ],
      },
    ],
    tip: "Gửi 3 ảnh sản phẩm + 3 ảnh tham chiếu lifestyle. Concept rõ giúp chọn mẫu đúng phong cách thương hiệu.",
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function relatedPosts(current: BlogPost, limit = 3) {
  return BLOG_POSTS.filter((post) => post.slug !== current.slug)
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category))
    .slice(0, limit);
}

export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${Number(day)}/${Number(month)}/${year}`;
}

export function postsByCategory(category: BlogCategory) {
  return BLOG_POSTS.filter((post) => post.category === category);
}
