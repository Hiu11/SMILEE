import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu seed dữ liệu mẫu cho môi trường local...');

  // Mật khẩu mặc định cho các tài khoản là 123456
  const passwordHash = await bcrypt.hash('123456', 10);

  // 1. Tạo Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@smilee.vn' },
    update: {},
    create: {
      email: 'admin@smilee.vn',
      password: passwordHash,
      fullName: 'Quản Trị Viên',
      phone: '0900000000',
      role: Role.ADMIN,
      isVerified: true,
    },
  });
  console.log('✅ Đã tạo tài khoản Admin: admin@smilee.vn (pass: 123456)');

  // 2. Tạo Nha sĩ
  const doctor1 = await prisma.user.upsert({
    where: { email: 'doctor1@smilee.vn' },
    update: {},
    create: {
      email: 'doctor1@smilee.vn',
      password: passwordHash,
      fullName: 'BS. Nguyễn Văn A',
      phone: '0911111111',
      role: Role.DOCTOR,
      isVerified: true,
    },
  });
  const doctor2 = await prisma.user.upsert({
    where: { email: 'doctor2@smilee.vn' },
    update: {},
    create: {
      email: 'doctor2@smilee.vn',
      password: passwordHash,
      fullName: 'BS. Trần Thị B',
      phone: '0922222222',
      role: Role.DOCTOR,
      isVerified: true,
    },
  });
  console.log('✅ Đã tạo tài khoản Nha sĩ mẫu');

  // 3. Tạo Bệnh nhân (Customer)
  const customer1 = await prisma.user.upsert({
    where: { email: 'khachhang1@gmail.com' },
    update: {},
    create: {
      email: 'khachhang1@gmail.com',
      password: passwordHash,
      fullName: 'Lê Văn Khách',
      phone: '0933333333',
      role: Role.CUSTOMER,
      isVerified: true,
    },
  });
  console.log('✅ Đã tạo tài khoản Khách hàng mẫu');

  // 4. Tạo Dịch vụ Nha khoa
  const services = [
    {
      name: 'Khám tổng quát',
      description: 'Khám, tư vấn và lên phác đồ điều trị',
      price: 150000,
      duration: 30,
    },
    {
      name: 'Nhổ răng khôn',
      description: 'Nhổ răng khôn không đau bằng công nghệ Piezotome',
      price: 1500000,
      duration: 60,
    },
    {
      name: 'Tẩy trắng răng',
      description: 'Tẩy trắng răng Laser an toàn, hiệu quả',
      price: 2500000,
      duration: 45,
    },
    {
      name: 'Niềng răng Invisalign',
      description: 'Niềng răng trong suốt cao cấp',
      price: 45000000,
      duration: 60,
    },
  ];

  let serviceCount = 0;
  for (const svc of services) {
    const existing = await prisma.service.findFirst({
      where: { name: svc.name },
    });
    if (!existing) {
      await prisma.service.create({ data: svc });
      serviceCount++;
    }
  }
  if (serviceCount > 0)
    console.log(`✅ Đã thêm mới ${serviceCount} dịch vụ nha khoa`);

  console.log('🎉 Quá trình seed dữ liệu hoàn tất!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
