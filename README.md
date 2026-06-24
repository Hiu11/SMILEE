# SMILEE

SMILEE là hệ thống quản lý phòng khám nha khoa, bao gồm website giới thiệu dịch vụ cho khách hàng, khu vực đặt lịch, trang quản trị, API backend và cơ sở dữ liệu.

## Công nghệ sử dụng

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: NestJS, Prisma, PostgreSQL
- Xác thực: JWT, bcrypt
- OTP email cho đăng ký/xác thực tài khoản
- Quản lý dữ liệu: Prisma ORM

## Chức năng chính

### Khách hàng

- Xem thông tin phòng khám và dịch vụ nha khoa
- Xem bảng giá dịch vụ
- Đặt lịch tư vấn/khám
- Gửi tin nhắn liên hệ
- Đăng ký, đăng nhập và xác thực OTP

### Quản trị viên/lễ tân/bác sĩ

- Quản lý tài khoản người dùng
- Quản lý bệnh nhân và bác sĩ
- Quản lý lịch hẹn
- Quản lý dịch vụ nha khoa
- Quản lý hồ sơ bệnh án
- Quản lý hóa đơn
- Quản lý kho vật tư
- Xem tin nhắn hỗ trợ từ khách hàng
- Xem thống kê tổng quan trên dashboard

## Cấu trúc thư mục

```txt
SMILEE/
├── backend/      # NestJS API, Prisma, PostgreSQL
├── frontend/     # Next.js client/admin website
├── package.json  # Scripts chạy toàn bộ dự án
└── README.md
```

## Yêu cầu cài đặt

- Node.js 20 trở lên
- npm
- PostgreSQL

## Cài đặt dự án

Tại thư mục gốc của dự án:

```bash
npm install
cd backend
npm install
copy .env.example .env
cd ../frontend
npm install
```

Sau đó cập nhật thông tin kết nối PostgreSQL, JWT và email trong file `backend/.env`.

## Chạy toàn bộ hệ thống

Tại thư mục gốc `SMILEE`, chạy:

```bash
npm run dev
```

Mặc định:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

Để chạy hệ thống và tự động mở trình duyệt:

```bash
npm run dev:open
```

## Chạy riêng từng phần

Backend:

```bash
cd backend
npm run start:dev
```

Frontend:

```bash
cd frontend
npm run dev
```

## Kiểm tra dự án

Build toàn bộ dự án:

```bash
npm run build
```

Chạy test backend:

```bash
npm test
```

## Cấp quyền quản trị

Thêm email cần cấp quyền vào file `backend/.env`:

```env
ADMIN_EMAIL="admin@example.com"
```

Sau đó chạy:

```bash
cd backend
npm run grant:admin
```

Lưu ý: tài khoản cần được đăng ký trước khi cấp quyền quản trị.

## Biến môi trường quan trọng

Backend cần cấu hình các biến môi trường như:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
ADMIN_EMAIL="admin@example.com"
```

Frontend có thể cấu hình API URL:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

## Lưu ý khi commit

- Không commit `node_modules`, `.next`, `dist` hoặc các thư mục build.
- Không commit file `.env` chứa thông tin thật.
- Sử dụng `.env.example` làm mẫu cấu hình.

## Hướng phát triển tiếp theo

- Kết nối toàn bộ trang admin với dữ liệu thật từ backend.
- Hoàn thiện luồng đặt lịch: đặt lịch, xác nhận, hoàn thành, tạo hóa đơn.
- Phân quyền giao diện theo vai trò: admin, lễ tân, bác sĩ, khách hàng.
- Thêm trợ lý AI tư vấn dịch vụ và hỗ trợ đặt lịch.
- Chuẩn bị deploy frontend lên Vercel và backend/database lên Render, Railway hoặc Supabase.
