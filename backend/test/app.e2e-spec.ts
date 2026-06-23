import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { ClinicService } from '../src/clinic/clinic.service';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Application (e2e)', () => {
  let app: INestApplication<App>;
  const register = jest.fn();
  const createMessage = jest.fn((body: unknown) => ({
    id: 'message-id',
    ...(body as object),
  }));

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({ $connect: jest.fn(), $disconnect: jest.fn() })
      .overrideProvider(MailerService)
      .useValue({ sendMail: jest.fn() })
      .overrideProvider(AuthService)
      .useValue({
        register,
        validateUser: jest.fn(),
        login: jest.fn(),
        verifyOtp: jest.fn(),
      })
      .overrideProvider(ClinicService)
      .useValue({ listServices: jest.fn(() => []), createMessage })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET / responds successfully', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('allows public service listing', async () => {
    await request(app.getHttpServer()).get('/services').expect(200).expect([]);
  });

  it('protects admin endpoints', async () => {
    await request(app.getHttpServer()).get('/dashboard').expect(401);
  });

  it('rejects unknown registration fields such as role', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'customer@example.com',
        password: 'secret123',
        fullName: 'Customer',
        phone: '0900000000',
        role: 'ADMIN',
      })
      .expect(400);

    expect(register).not.toHaveBeenCalled();
  });

  it('validates and accepts a public contact message', async () => {
    await request(app.getHttpServer())
      .post('/messages')
      .send({
        fullName: 'Customer',
        phone: '0900000000',
        message: 'Need an appointment',
      })
      .expect(201);

    expect(createMessage).toHaveBeenCalledTimes(1);
  });

  it('rejects an invalid public contact message', async () => {
    await request(app.getHttpServer())
      .post('/messages')
      .send({ fullName: '' })
      .expect(400);
  });
});
