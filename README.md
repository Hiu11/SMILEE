# 🦷 SMILEE - Hệ thống Quản lý Nha khoa Toàn diện

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

SMILEE là nền tảng quản lý phòng khám nha khoa hiện đại, bao gồm website giới thiệu dịch vụ cho khách hàng, hệ thống đặt lịch tự động và trang quản trị mạnh mẽ dành cho bác sĩ/lễ tân.

## 🚀 Công nghệ nổi bật

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS.
- **Backend:** NestJS, Prisma ORM, PostgreSQL.
- **Bảo mật:** JWT Authentication, OTP qua Email (Nodemailer), Bcrypt.

## 📂 Cấu trúc dự án

```text
SMILEE/
├── backend/      # NestJS REST API, Prisma Schema, Postgres DB
├── frontend/     # Next.js Client & Admin Dashboard
├── package.json  # Root scripts để chạy đồng thời cả 2
└── README.md
```

## ⚙️ Hướng dẫn cài đặt (Installation)

### Yêu cầu hệ thống

- Node.js (v20+)
- PostgreSQL (Đang chạy local hoặc dùng cloud)
- npm hoặc yarn

### 1. Clone và cài đặt thư viện

```bash
# Cài đặt root dependencies
npm install

# Cài đặt Backend dependencies
cd backend && npm install

# Cài đặt Frontend dependencies
cd ../frontend && npm install
```

### 2. Thiết lập biến môi trường (.env)

Tạo file `.env` trong thư mục `backend` (tham khảo `.env.example`):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/smilee_db"
JWT_SECRET="your-super-secret-jwt-key"
ADMIN_EMAIL="admin@smilee.com"
```

Tạo file `.env` trong thư mục `frontend`:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

### 3. Khởi tạo Database (Prisma)

```bash
cd backend
npx prisma db push
```

**Đổ dữ liệu mẫu (Seeding):**
Để dễ dàng test các chức năng mà không cần nhập liệu thủ công, bạn nên chạy lệnh seed. Script này sẽ tự động tạo các tài khoản Admin mặc định, danh sách dịch vụ nha khoa, bác sĩ và một vài dữ liệu mẫu khác:

```bash
cd backend
npx prisma db seed
```

### 4. Chạy dự án (Development Mode)

Tại thư mục gốc `SMILEE`, chạy lệnh sau để khởi động cả Frontend (Port 3000) và Backend (Port 4000) cùng lúc:

```bash
npm run dev
# Hoặc npm run dev:open để tự động mở trình duyệt
```

## 🛡️ Hướng dẫn cấp quyền Quản trị (Admin)

Sau khi đăng ký một tài khoản trên Frontend, bạn có thể cấp quyền Admin cho tài khoản đó bằng cách đảm bảo email khớp với biến `ADMIN_EMAIL` trong `.env` của backend, sau đó chạy:

```bash
cd backend
npm run grant:admin
```
