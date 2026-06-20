import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, Prisma } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';

export type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      if (!user.isVerified) {
        throw new UnauthorizedException('Tài khoản chưa được xác thực OTP');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: UserWithoutPassword) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isVerified: user.isVerified,
      },
    };
  }

  async register(data: Prisma.UserCreateInput): Promise<{ message: string, email: string }> {
    const existingUser = await this.usersService.findOne(data.email);
    if (existingUser) {
      if (existingUser.isVerified) {
        throw new ConflictException('Email đã tồn tại');
      } else {
        throw new ConflictException('Email đã đăng ký nhưng chưa xác thực OTP. Vui lòng kiểm tra email hoặc đăng ký lại với email khác.');
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
    const otpExpires = new Date();
    otpExpires.setMinutes(otpExpires.getMinutes() + 10); // Expires in 10 mins

    const user = await this.usersService.create({
      ...data,
      password: hashedPassword,
      otp,
      otpExpires,
      isVerified: false,
    });

    // Send OTP via Email
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Xác thực tài khoản Smilee Dental',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
          <h2>Chào mừng bạn đến với Smilee Dental</h2>
          <p>Mã xác thực (OTP) của bạn là:</p>
          <h1 style="color: #0284c7; letter-spacing: 2px;">${otp}</h1>
          <p>Mã này sẽ hết hạn trong vòng 10 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai.</p>
        </div>
      `,
    });

    return { message: 'Đăng ký thành công. Vui lòng kiểm tra email để nhận mã OTP.', email: user.email };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Không tìm thấy người dùng');
    }

    if (user.isVerified) {
      throw new ConflictException('Tài khoản đã được xác thực');
    }

    if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
      throw new UnauthorizedException('Mã OTP không hợp lệ hoặc đã hết hạn');
    }

    await this.usersService.update(user.id, {
      isVerified: true,
      otp: null,
      otpExpires: null,
    });

    return { message: 'Xác thực tài khoản thành công' };
  }
}
