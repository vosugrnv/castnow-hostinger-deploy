import { ArtStage, LegalPage } from "@/components/PageKit";
import { COMPANY, SUPPORT_EMAIL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Chính sách bảo mật",
  description:
    "Chính sách bảo mật của CastNow: dữ liệu được thu thập, mục đích sử dụng, quyền vị trí, chia sẻ với mẫu ảnh và đơn vị thanh toán, quyền của bạn và cách xóa tài khoản.",
  path: "/bao-mat",
});

const SECTIONS = [
  {
    id: "pham-vi",
    title: "Phạm Vi",
    body: (
      <p>
        Chính sách này giải thích cách <strong>{COMPANY}</strong> thu thập và sử dụng dữ liệu khi bạn dùng ứng dụng và website CastNow. Chúng tôi chỉ thu thập dữ liệu đủ để chạy dịch vụ: đăng nhập, tìm mẫu ảnh gần địa điểm chụp, thanh toán và hỗ trợ.
      </p>
    ),
  },
  {
    id: "du-lieu",
    title: "Dữ Liệu Chúng Tôi Thu Thập",
    body: (
      <ul>
        <li>
          <strong>Tài khoản:</strong> số điện thoại, tên, ảnh đại diện.
        </li>
        <li>
          <strong>Vị trí:</strong> địa chỉ bạn nhập và vị trí thiết bị khi bạn bật quyền.
        </li>
        <li>
          <strong>Đơn đặt lịch:</strong> brief, moodboard, tin nhắn trong đơn và đánh giá.
        </li>
        <li>
          <strong>Ví:</strong> số dư, lịch sử nạp, thanh toán và rút tiền.
        </li>
        <li>
          <strong>Với mẫu ảnh:</strong> portfolio, phong cách, khu vực nhận lịch, ảnh hồ sơ dùng khi xét duyệt.
        </li>
        <li>
          <strong>Thông báo:</strong> mã thông báo đẩy nếu bạn cho phép, để báo đơn mới và cập nhật trạng thái.
        </li>
      </ul>
    ),
  },
  {
    id: "muc-dich",
    title: "Mục Đích Sử Dụng",
    body: (
      <ul>
        <li>Tạo và quản lý tài khoản.</li>
        <li>Hiện mẫu ảnh gần địa điểm chụp, ghép lịch theo khu vực nhận lịch.</li>
        <li>Gửi thông báo về đơn, xử lý thanh toán trên ví.</li>
        <li>Kiểm duyệt hồ sơ, portfolio và nội dung cộng đồng.</li>
        <li>Trả lời khi bạn cần hỗ trợ hoặc khiếu nại.</li>
      </ul>
    ),
  },
  {
    id: "vi-tri",
    title: "Vị Trí Và Quyền Thiết Bị",
    body: (
      <p>
        Vị trí chỉ dùng khi bạn mở tính năng cần định vị, như tìm mẫu ảnh quanh địa điểm chụp. Chúng tôi không dùng vị trí để theo dõi bạn khi tính năng đó không được sử dụng. Bạn có thể tắt quyền vị trí, camera hoặc thông báo trong cài đặt điện thoại bất cứ lúc nào.
      </p>
    ),
  },
  {
    id: "chia-se",
    title: "Chia Sẻ Dữ Liệu",
    body: (
      <>
        <ul>
          <li>Mẫu ảnh thấy thông tin đơn cần thiết để đến đúng địa điểm và chuẩn bị đúng brief.</li>
          <li>Khách thấy hồ sơ và portfolio đã công khai trên app.</li>
          <li>Đơn vị thanh toán nhận dữ liệu cần để xử lý nạp và rút tiền.</li>
          <li>Cơ quan nhà nước có thẩm quyền khi pháp luật yêu cầu.</li>
        </ul>
        <p>
          <strong>CastNow không bán dữ liệu hay danh bạ của bạn.</strong>
        </p>
      </>
    ),
  },
  {
    id: "luu-tru",
    title: "Lưu Trữ Và Bảo Vệ",
    body: (
      <p>
        Dữ liệu được lưu trong thời gian bạn dùng tài khoản và thêm một khoảng cần thiết cho các đơn đã phát sinh hoặc nghĩa vụ kế toán. Quyền truy cập dữ liệu được giới hạn theo vai trò công việc.
      </p>
    ),
  },
  {
    id: "quyen",
    title: "Quyền Của Bạn",
    body: (
      <ul>
        <li>Xem và sửa thông tin tài khoản trong app.</li>
        <li>Rút lại các quyền đã cấp cho ứng dụng.</li>
        <li>Yêu cầu xóa tài khoản và dữ liệu liên quan.</li>
        <li>Hỏi về dữ liệu chúng tôi đang lưu bằng cách gửi email hỗ trợ.</li>
      </ul>
    ),
  },
  {
    id: "xoa-tai-khoan",
    title: "Xóa Tài Khoản",
    body: (
      <p>
        Trong app có chức năng xóa tài khoản ở phần cài đặt. Bạn cũng có thể viết tới <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> để được hỗ trợ, hoặc hỏi về dữ liệu còn lưu phục vụ đơn đã phát sinh.
      </p>
    ),
  },
  {
    id: "thay-doi",
    title: "Thay Đổi Chính Sách",
    body: <p>Chính sách có thể được cập nhật khi tính năng thay đổi. Ngày cập nhật ghi ở đầu trang.</p>,
  },
  {
    id: "lien-he",
    title: "Liên Hệ",
    body: (
      <p>
        Câu hỏi về quyền riêng tư, gửi về <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      crumb="Chính sách bảo mật"
      path="/bao-mat"
      kicker="Pháp lý"
      title="Chính Sách Bảo Mật"
      lead="CastNow chỉ thu thập dữ liệu cần thiết để kết nối bạn với mẫu ảnh, xử lý thanh toán và hỗ trợ. Trang này giải thích rõ dữ liệu nào được dùng và dùng vào việc gì."
      updated="tháng 9/2026"
      sections={SECTIONS}
      art={
        <ArtStage
          main="/float-shield-out.webp"
          chips={[
            { img: "/radius-pin.webp", label: "Vị trí chỉ khi cần", pos: "left-0 top-8 sm:-left-4" },
            { img: "/radius-key.webp", label: "Không bán dữ liệu", pos: "right-0 top-1/3 sm:-right-2" },
            { img: "/radius-chat.webp", label: "Xóa tài khoản trong app", pos: "bottom-4 left-4" },
          ]}
        />
      }
    />
  );
}
