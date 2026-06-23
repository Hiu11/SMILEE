import 'dotenv/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Admin CRUD with PostgreSQL (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let token: string;
  const runId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const adminEmail = `crud-admin-${runId}@example.com`;
  const userEmail = `crud-user-${runId}@example.com`;
  const serviceName = `CRUD Service ${runId}`;
  const warehouseName = `CRUD Item ${runId}`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    prisma = moduleFixture.get(PrismaService);
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: await bcrypt.hash('temporary-password', 4),
        fullName: 'CRUD Admin',
        role: Role.ADMIN,
        isVerified: true,
      },
    });
    token = new JwtService({ secret: process.env.JWT_SECRET }).sign({
      email: admin.email,
      sub: admin.id,
      role: admin.role,
    });
  });

  afterAll(async () => {
    await prisma.service.deleteMany({ where: { name: serviceName } });
    await prisma.warehouseItem.deleteMany({ where: { name: warehouseName } });
    await prisma.user.deleteMany({
      where: { email: { in: [adminEmail, userEmail] } },
    });
    await app.close();
  });

  const authorized = (method: 'post' | 'patch' | 'delete', path: string) =>
    request(app.getHttpServer())
      [method](path)
      .set('Authorization', `Bearer ${token}`);

  it('creates, updates, and deletes a service', async () => {
    const created = await authorized('post', '/services')
      .send({
        name: serviceName,
        description: 'Temporary',
        price: 100000,
        duration: 30,
      })
      .expect(201);
    const service = created.body as { id: string };

    const updated = await authorized('patch', `/services/${service.id}`)
      .send({ price: 120000 })
      .expect(200);
    expect((updated.body as { price: number }).price).toBe(120000);

    await authorized('delete', `/services/${service.id}`).expect(200);
  });

  it('creates, updates, and deletes a warehouse item', async () => {
    const created = await authorized('post', '/warehouse')
      .send({
        name: warehouseName,
        category: 'Test',
        quantity: 2,
        unit: 'box',
        pricePerUnit: 50000,
      })
      .expect(201);
    const item = created.body as { id: string };

    const updated = await authorized('patch', `/warehouse/${item.id}`)
      .send({ quantity: 3 })
      .expect(200);
    expect((updated.body as { quantity: number }).quantity).toBe(3);

    await authorized('delete', `/warehouse/${item.id}`).expect(200);
  });

  it('creates, updates, and deletes a user without returning a password', async () => {
    const created = await authorized('post', '/users')
      .send({
        email: userEmail,
        password: 'temporary-password',
        fullName: 'CRUD User',
        role: Role.CUSTOMER,
      })
      .expect(201);
    const user = created.body as { id: string; password?: string };
    expect(user.password).toBeUndefined();

    const updated = await authorized('patch', `/users/${user.id}`)
      .send({ fullName: 'CRUD User Updated' })
      .expect(200);
    expect((updated.body as { fullName: string }).fullName).toBe(
      'CRUD User Updated',
    );

    await authorized('delete', `/users/${user.id}`).expect(200);
  });
});
