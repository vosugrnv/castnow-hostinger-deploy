import { ArtStage, LegalPage } from "@/components/PageKit";
import { COMPANY, SUPPORT_EMAIL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Điều khoản sử dụng",
  description:
    "Điều khoản sử dụng ứng dụng CastNow: tài khoản, đặt và nhận lịch chụp, báo giá trên đơn, thanh toán, quyền sử dụng hình ảnh, hành vi bị cấm, trách nhiệm của nền tảng và chấm dứt tài khoản.",
  path: "/dieu-khoan-su-dung",
});

const SECTIONS = [
  {
    id: "pham-vi",
    title: "Phạm Vi Áp Dụng",
    body: (
      <>
        <p>
          Điều khoản này áp dụng khi bạn tải, tạo tài khoản, đặt lịch hoặc nhận lịch chụp trên ứng dụng và website CastNow. CastNow do <strong>{COMPANY}</strong> (“chúng tôi”) vận hành.
        </p>
        <p>Khi tiếp tục sử dụng CastNow, bạn đồng ý với các điều khoản dưới đây và Chính sách bảo mật.</p>
      </>
    ),
  },
  {
    id: "vai-tro",
    title: "Vai Trò Của CastNow",
    body: (
      <>
        <p>
          CastNow là nền tảng kết nối giữa <strong>Khách</strong> (người đặt buổi chụp) và <strong>Đối tác</strong> (mẫu ảnh nhận và thực hiện buổi chụp). Chúng tôi cung cấp công cụ tìm kiếm, gợi ý, đặt lịch, trao đổi, thanh toán và đánh giá.
        </p>
        <p>
          Chúng tôi không trực tiếp chụp ảnh, làm mẫu hay sản xuất nội dung, trừ khi một đơn ghi rõ điều khác. Đối tác là cá nhân độc lập, không phải nhân viên của công ty.
        </p>
      </>
    ),
  },
  {
    id: "tai-khoan",
    title: "Tài Khoản",
    body: (
      <ul>
        <li>Bạn đăng nhập bằng số điện thoại của chính mình và chịu trách nhiệm giữ an toàn cho tài khoản.</li>
        <li>Mỗi người giữ một tài khoản, khai báo đúng tên và vai trò.</li>
        <li>Tài khoản đối tác chỉ nhận lịch sau khi hồ sơ (portfolio, khu vực, ảnh chân dung) được xét duyệt.</li>
        <li>Mẫu ảnh phải đủ 18 tuổi khi tự nhận lịch. Người dưới 18 tuổi cần người giám hộ đồng ý và có mặt tại buổi chụp.</li>
        <li>Thông tin sai lệch có thể khiến tài khoản bị tạm khóa trong lúc kiểm tra.</li>
      </ul>
    ),
  },
  {
    id: "don-viec",
    title: "Đặt Và Nhận Lịch Chụp",
    body: (
      <>
        <p>Khách mô tả concept, địa điểm, thời gian và số ảnh mong muốn. Đối tác đọc brief, gửi báo giá và nhận lịch khi đồng ý với phạm vi đó.</p>
        <p>
          Hai bên trao đổi trong phần chat của đơn. Mọi thay đổi về giờ, địa điểm, trang phục, số ảnh bàn giao hoặc chi phí phát sinh cần được thống nhất rõ trên đơn <strong>trước buổi chụp</strong>.
        </p>
      </>
    ),
  },
  {
    id: "hinh-anh",
    title: "Quyền Sử Dụng Hình Ảnh",
    body: (
      <>
        <p>
          Phạm vi sử dụng ảnh (cá nhân, thương mại, quảng cáo, đăng mạng xã hội) và thời hạn bàn giao cần ghi trên đơn. Nếu đơn không ghi, ảnh chỉ dùng cho mục đích cá nhân của Khách.
        </p>
        <p>
          Đối tác chỉ đưa ảnh của buổi chụp vào portfolio khi Khách và người xuất hiện trong ảnh đồng ý. Không chụp, đăng hoặc chia sẻ hình ảnh của người khác khi chưa được phép.
        </p>
      </>
    ),
  },
  {
    id: "gia-thanh-toan",
    title: "Giá Và Thanh Toán",
    body: (
      <>
        <p>Giá của mỗi đơn là mức hai bên đã chốt trên app. CastNow không áp một bảng giá cố định cho mọi buổi chụp.</p>
        <p>
          Thanh toán thực hiện trên đơn trong app. Khi trả tại buổi chụp, Khách có thể quét mã QR của đối tác; giao dịch vẫn được ghi trên ví. Nạp và rút tiền theo luồng hiển thị trong ứng dụng.
        </p>
        <p>
          Giao dịch đã ghi nhận không được tự ý sửa. Khiếu nại gửi về <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> kèm mã đơn.
        </p>
      </>
    ),
  },
  {
    id: "huy-doi",
    title: "Hủy Và Đổi Lịch",
    body: (
      <p>
        Khách hoặc đối tác muốn hủy, đổi giờ cần báo sớm và nói rõ trên đơn. Nghĩa vụ thanh toán cho phần buổi chụp đã thực hiện vẫn được giữ cho đến khi xử lý xong.
      </p>
    ),
  },
  {
    id: "danh-gia",
    title: "Đánh Giá Và Cộng Đồng",
    body: (
      <p>
        Sau khi đơn hoàn tất, Khách có thể đánh giá trên đơn. Đánh giá và bài viết trong cộng đồng cần trung thực, đúng trải nghiệm thực tế. Chúng tôi có thể gỡ nội dung vi phạm điều khoản.
      </p>
    ),
  },
  {
    id: "hanh-vi-cam",
    title: "Hành Vi Bị Cấm",
    body: (
      <ul>
        <li>Đăng nội dung lừa đảo, quấy rối, xúc phạm hoặc sai sự thật.</li>
        <li>Dùng app để giao dịch hàng hóa, dịch vụ trái pháp luật.</li>
        <li>Giả mạo danh tính, dùng tài khoản của người khác.</li>
        <li>Can thiệp, khai thác lỗi hoặc làm gián đoạn hệ thống.</li>
      </ul>
    ),
  },
  {
    id: "trach-nhiem",
    title: "Giới Hạn Trách Nhiệm",
    body: (
      <p>
        Đối tác chịu trách nhiệm về buổi chụp và phần ảnh bàn giao đã nhận. Chúng tôi hỗ trợ tiếp nhận phản ánh, kiểm tra thông tin trên đơn và có thể khóa tài khoản vi phạm, nhưng không thay một bên thực hiện nghĩa vụ đã cam kết với bên kia.
      </p>
    ),
  },
  {
    id: "cham-dut",
    title: "Chấm Dứt",
    body: (
      <p>
        Bạn có thể xóa tài khoản trong phần cài đặt của app. Chúng tôi có thể tạm khóa hoặc chấm dứt tài khoản vi phạm điều khoản. Nghĩa vụ của các đơn đã phát sinh vẫn còn cho đến khi xử lý xong.
      </p>
    ),
  },
  {
    id: "thay-doi",
    title: "Thay Đổi Điều Khoản",
    body: <p>Điều khoản có thể được cập nhật khi tính năng thay đổi. Ngày cập nhật ghi ở đầu trang. Việc tiếp tục sử dụng sau khi cập nhật đồng nghĩa với việc bạn chấp nhận bản mới.</p>,
  },
  {
    id: "lien-he",
    title: "Liên Hệ",
    body: (
      <p>
        Mọi câu hỏi về điều khoản, gửi về <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      crumb="Điều khoản sử dụng"
      path="/dieu-khoan-su-dung"
      kicker="Pháp lý"
      title="Điều Khoản Sử Dụng CastNow"
      lead="Quy định áp dụng khi bạn tạo tài khoản, đặt lịch hoặc nhận lịch chụp trên CastNow. Vui lòng đọc kỹ trước khi sử dụng."
      updated="tháng 9/2026"
      sections={SECTIONS}
      art={
        <ArtStage
          main="/radius-key.webp"
          chips={[
            { img: "/float-shield-out.webp", label: "Tài khoản được duyệt", pos: "left-0 top-8 sm:-left-4" },
            { img: "/coin-dollar.webp", label: "Giá chốt trên đơn", pos: "right-0 top-1/3 sm:-right-2" },
            { img: "/radius-chat.webp", label: "Thống nhất trong đơn", pos: "bottom-4 left-6" },
          ]}
        />
      }
    />
  );
}
