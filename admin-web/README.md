# CastNow Admin Web

Bảng quản trị (Next.js 15 + Tailwind) cho CastNow. Kết nối cùng backend với app (Supabase / VPS).
qua các RPC `admin_*` (security definer, kiểm tra `profiles.role = 'admin'`).

## Tính năng

- **Dashboard** — tổng quan người dùng, đặt mẫu ảnh, ví, tác vụ cần xử lý
- **Đơn tìm mẫu** — danh sách job khách đăng, lọc trạng thái, xóa
- **Đơn đặt lịch** — bookings theo lịch
- **Duyệt mẫu ảnh** — xét duyệt hồ sơ mẫu (ảnh chân dung/CCCD, duyệt/từ chối)
- **Mẫu ảnh / Đối tác** — danh sách mẫu ảnh
- **Quản lý Users** — đổi vai trò (khách/mẫu ảnh/admin), khóa/mở tài khoản
- **Ví người dùng** — xem số dư, điều chỉnh thủ công
- **Giao dịch ví** — lịch sử biến động ví
- **Duyệt rút tiền** — duyệt/từ chối yêu cầu rút tiền của mẫu ảnh
- **Khuyến mãi** — CRUD ưu đãi & mã giảm giá
- **Thông báo** — gửi thông báo (toàn bộ / theo tỉnh thành) + lịch sử
- **Cộng đồng** — kiểm duyệt bài viết

## Cài đặt

```bash
cd admin-web
npm install
cp .env.example .env.local   # điền NEXT_PUBLIC_SUPABASE_URL + ANON_KEY
npm run dev
```

Mở http://localhost:3000

## Yêu cầu backend

1. Deploy migration `supabase/migrations/027_admin_web_ops.sql` lên project backend CastNow/TaskNow
   (chứa toàn bộ RPC `admin_*`).
2. Đặt ít nhất 1 tài khoản làm admin:

```sql
update public.profiles set role = 'admin' where phone = '0xxxxxxxxx';
```

Tài khoản admin đăng nhập bằng **SĐT + mật khẩu** (cùng tài khoản app, RPC `app_sign_in_phone`).
Chỉ tài khoản có `role = 'admin'` mới vào được.

## Deploy

Tương thích Vercel (Next.js App Router). Thêm biến môi trường `NEXT_PUBLIC_SUPABASE_URL`
và `NEXT_PUBLIC_SUPABASE_ANON_KEY` trên Vercel, rồi deploy thư mục `admin-web`.
