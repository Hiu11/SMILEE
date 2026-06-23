# SMILEE

SMILEE là hệ thống quản lý phòng khám nha khoa, gồm giao diện khách hàng, khu vực quản trị, API và cơ sở dữ liệu.

## Công nghệ sử dụng

- `frontend/`: Next.js, React và Tailwind CSS
- `backend/`: NestJS, Prisma và PostgreSQL
- Xác thực bằng JWT, mật khẩu được mã hóa với bcrypt
- Gửi OTP qua email

## Yêu cầu

- Node.js 20 trở lên
- npm
- PostgreSQL

## Cài đặt

Tại thư mục gốc của dự án:

```bash
npm install
cd backend
npm install
copy .env.example .env
cd ../frontend
npm install
```

Cập nhật thông tin kết nối PostgreSQL, JWT và email trong `backend/.env` trước khi chạy backend.

## Chạy toàn bộ hệ thống

Từ thư mục gốc `SMILEE`, chạy đồng thời frontend và backend:

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

Giữ `Ctrl` và nhấp vào đường dẫn frontend trong terminal để mở trình duyệt.

Để chạy hệ thống và tự động mở trình duyệt:

```bash
npm run dev:open
```

Lệnh trên cũng có thể được gọi khi terminal đang ở thư mục `frontend`:

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

Chạy unit test và e2e test backend:

```bash
npm test
```

## Cấp quyền quản trị

Thêm email cần cấp quyền vào `backend/.env`:

```env
ADMIN_EMAIL="admin@example.com"
```

Sau đó chạy:

```bash
cd backend
npm run grant:admin
```

Tài khoản phải được đăng ký trước khi thực hiện lệnh này.

## Lưu ý về Git

- Không commit `node_modules`, `.next`, `dist` hoặc các thư mục build.
- Không commit file `.env` chứa thông tin thật.
- Sử dụng `.env.example` làm mẫu cấu hình.
