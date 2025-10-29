
---

## README.md — NHA KHOA SMILEE MANAGEMENT SYSTEM

# NHA KHOA SMILEE MANAGEMENT SYSTEM

Hệ thống **Nha Khoa Smilee** là nền tảng quản lý tổng thể dành cho phòng khám nha khoa, hỗ trợ 4 nhóm người dùng chính:
>  Admin, Lễ tân, Nha sĩ, Khách hàng

Dự án được phát triển bằng **HTML, CSS, JavaScript (LocalStorage)** — mô phỏng quy trình quản lý từ **đặt lịch → xác nhận → điều trị → thanh toán.**

---

## Cấu trúc thư mục

```
SMILEE/
│
├── css/                           # Style của toàn hệ thống
│   ├── base.css                   # Reset và cấu trúc nền
│   ├── main.css                   # Style chung cho toàn site
│   ├── about.css                  # Trang giới thiệu
│   ├── auth.css                   # Trang đăng nhập / đăng ký
│   ├── booking.css                # Trang đặt lịch khách hàng
│   ├── confirm-booking.css        # Trang xác nhận đặt lịch
│   ├── contact.css                # Trang liên hệ
│   ├── doctor-management.css      # Trang quản lý bệnh án (admin)
│   ├── doctor-records.css         # Hồ sơ bệnh nhân
│   ├── doctor-style.css           # Giao diện nha sĩ
│   ├── invoice.css                # Hóa đơn
│   ├── manage.css                 # Quản lý lịch hẹn (customer)
│   ├── profile.css                # Hồ sơ cá nhân
│   ├── reception.css              # Style lễ tân tổng thể
│   ├── reception-manage.css       # Lễ tân - Quản lý lịch
│   ├── reception-support.css      # Lễ tân - Hỗ trợ khách hàng
│   ├── admin-account.css          # Admin - tài khoản hệ thống
│   └── treatment.css              # Trang điều trị
│
├── html/                          # Tất cả file giao diện chính
│   ├── index.html                 # Trang chủ chung trước khi đăng nhập
│   ├── login.html / reset.html    # Đăng nhập & reset mật khẩu
│   ├── home.html                  # Trang chủ khách hàng
│   ├── about.html / contact.html  # Giới thiệu & liên hệ hỗ trợ
│   │
│   ├── booking.html               # Đặt lịch (Customer)
│   ├── confirm-booking.html       # Xác nhận lịch (Customer)
│   ├── manage.html                # Quản lý lịch hẹn cá nhân
│   │
│   ├── admin-system-account-management.html
│   ├── admin-add-account.html / admin-update-account.html
│   │
│   ├── admin-service-management.html
│   ├── admin-add-service.html / admin-update-service.html
│   │
│   ├── admin-warehouse-management.html
│   ├── admin-add-warehouse.html / admin-update-warehouse.html
│   │
│   ├── admin-doctor-manage.html
│   ├── admin-doctor-records.html
│   ├── admin-doctor-records-add.html / admin-doctor-records-edit.html / admin-doctor-records-detail.html
│   │
│   ├── admin-reception-appointment.html     # Lễ tân - lịch hẹn KH
│   ├── admin-reception-confirm.html         # Lễ tân - xác nhận lịch
│   ├── admin-reception-invoice.html         # Lễ tân - hóa đơn
│   ├── admin-reception-invoice-add.html     # Lễ tân - thêm hóa đơn
│   ├── admin-reception-manage.html          # Lễ tân - quản lý lịch
│   ├── admin-reception-payment.html         # Lễ tân - thanh toán
│   ├── admin-reception-support.html         # Lễ tân - hỗ trợ KH
│   │
│   ├── doctor-management-records.html
│   ├── doctor-management-records-add.html / detail.html
│   ├── doctor-records.html / doctor-record-add.html / edit.html
│   ├── doctor-profile.html
│   │
│   ├── reception-invoice.html / reception-invoice-create.html
│   ├── reception-manage.html
│   ├── reception-support.html
│   ├── reception-profile.html
│   │
│   └── profile.html                        # Hồ sơ cá nhân người dùng
│
├── js/                            # Logic xử lý và tương tác
│   ├── auth.js                    # Đăng nhập, quên mật khẩu
│   ├── booking.js                 # Chọn bác sĩ, giờ, lưu localStorage
│   ├── confirm-booking.js         # Lưu thông tin lịch hẹn
│   ├── contact.js                 # Gửi liên hệ
│   │
│   ├── admin-add-account.js / admin-update-account.js
│   ├── admin-service-management.js / admin-add-service.js / admin-update-service.js
│   ├── admin-warehouse-management.js / admin-add-warehouse.js / admin-update-warehouse.js
│   ├── admin-system-account-management.js
│   │
│   ├── admin-reception-appointment.js
│   ├── admin-reception-confirm.js
│   ├── admin-reception-invoice.js
│   ├── admin-reception-support.js
│   │
│   ├── doctor-management.js
│   ├── doctor-management-records.js
│   ├── doctor-records.js
│   │
│   ├── reception-manage.js
│   ├── reception-invoice.js / reception-invoice-create.js
│   ├── reception-payment.js
│   ├── reception-support.js
│   │
│   ├── dropdown.js                # Menu dropdown mega
│   ├── reset.js / reset-otp.js / reset-new.js
│   └── utils.js                   # Hàm phụ trợ chung
│
├── pic/                           # Hình ảnh, icon, banner
│   ├── logo_smilee.png
│   ├── dentist1.png / dentist2.png / dentist3.png
│   ├── banner_home.png
│   └── ...
│
└── README.md
```

---

## Dữ liệu & hoạt động

Dự án **không sử dụng server backend**, toàn bộ dữ liệu được lưu qua **LocalStorage**:
- `appointments`: Lịch hẹn  
- `accounts`: Tài khoản người dùng  
- `services`: Dịch vụ nha khoa  
- `warehouses`: Kho vật tư  
- `records`: Hồ sơ bệnh nhân  
- `invoices`: Hóa đơn thanh toán  

Mỗi trang CRUD đều:
- Hiển thị thông tin sẵn có
- Cho phép thêm / sửa / xóa
- Cập nhật lại danh sách sau mỗi hành động

---

## Các nhóm người dùng (4 Actor)

### 1. **Admin**
- Quản lý tài khoản, dịch vụ, kho vật tư  
- Cập nhật dữ liệu hệ thống  
- Trang tiêu biểu:
  - `admin-system-account-management.html`
  - `admin-service-management.html`
  - `admin-warehouse-management.html`

---

### 2. **Receptionist (Lễ tân)**
- Quản lý lịch hẹn khách hàng  
- Xác nhận và cập nhật trạng thái lịch  
- Lập hóa đơn, thanh toán và hỗ trợ khách hàng  
- Trang tiêu biểu:
  - `admin-reception-appointment.html`
  - `admin-reception-confirm.html`
  - `admin-reception-invoice.html`
  - `admin-reception-support.html`

---

### 3. **Doctor (Nha sĩ)**
- Xem danh sách bệnh nhân  
- Thêm, chỉnh sửa hồ sơ điều trị  
- Ghi chú chẩn đoán và kết quả điều trị  
- Trang tiêu biểu:
  - `doctor-records.html`
  - `doctor-record-add.html`
  - `doctor-management-records.html`

---

### 4. **Customer (Khách hàng)**
- Xem danh sách bác sĩ & đặt lịch  
- Xác nhận và theo dõi lịch hẹn  
- Cập nhật hồ sơ cá nhân  
- Trang tiêu biểu:
  - `booking.html`
  - `confirm-booking.html`
  - `manage.html`

---

## Cách chạy dự án

### Dùng Live Server
1. Mở thư mục `SMILEE` trong **VS Code**
2. Chuột phải vào `html/index.html`
3. Chọn **“Open with Live Server”**

### Dùng trình duyệt
- Mở file `html/index.html` trực tiếp  
- Điều hướng qua sidebar hoặc menu navbar.

---

## Kỹ thuật & công nghệ
| Thành phần | Công nghệ |
|-------------|------------|
| Giao diện | HTML5, CSS3 (Flexbox, Grid, Responsive) |
| Logic | JavaScript (DOM, LocalStorage) |
| Icon | Font Awesome 6 |
| Style Framework | Custom CSS modules |
| Dữ liệu giả lập | JSON trong LocalStorage |

---


## Tác giả
** Sinh viên:** Đỗ Trọng Hiếu  
** Môn học:** Môn PHÂN TÍCH THIẾT KẾ HỆ THỐNG  
** Phiên bản:** v1.1 (2025)  
** Ngôn ngữ:** HTML, CSS, JavaScript  


