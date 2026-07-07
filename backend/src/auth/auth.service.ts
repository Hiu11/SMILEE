import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role, User } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';

export type UserWithoutPassword = Omit<User, 'password'>;

export type RegisterInput = {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findOne(email.trim().toLowerCase());
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

  async register(
    data: RegisterInput,
  ): Promise<{ message: string; email: string }> {
    const email = data.email?.trim().toLowerCase();
    const password = data.password ?? '';
    const fullName = data.fullName?.trim();

    if (!email || !email.includes('@') || !fullName || password.length < 6) {
      throw new BadRequestException(
        'Email, họ tên và mật khẩu tối thiểu 6 ký tự là bắt buộc',
      );
    }

    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      if (existingUser.isVerified) {
        throw new ConflictException('Email đã tồn tại');
      }
      // If not verified, we can overwrite their info and send a new OTP
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
    const otpExpires = new Date();
    otpExpires.setMinutes(otpExpires.getMinutes() + 10); // Expires in 10 mins

    let user;
    try {
      if (existingUser) {
        user = await this.usersService.update(existingUser.id, {
          fullName,
          phone: data.phone?.trim() || null,
          password: hashedPassword,
          otp,
          otpExpires,
        });
      } else {
        user = await this.usersService.create({
          email,
          fullName,
          phone: data.phone?.trim() || null,
          password: hashedPassword,
          role: Role.CUSTOMER,
          otp,
          otpExpires,
          isVerified: false,
        });
      }
    } catch (dbError) {
      console.error('Database error during user registration:', dbError);
      throw new InternalServerErrorException(
        'Không thể lưu thông tin vào database. Vui lòng kiểm tra lại kết nối hoặc schema.',
      );
    }

    // Send OTP via Email
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Xác thực tài khoản Smilee Dental',
        html: `
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2>Chào mừng bạn đến với Smilee Dental</h2>
            <p>Mã xác thực (OTP) của bạn là:</p>
            <h1 style="color: #0284c7; letter-spacing: 4px; font-size: 36px;">${otp}</h1>
            <p>Mã này sẽ hết hạn trong vòng 10 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai.</p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error('Failed to send OTP email:', mailError);
      throw new InternalServerErrorException(
        'Không thể gửi email OTP. Vui lòng kiểm tra cấu hình Nodemailer (Email/Mật khẩu).',
      );
    }

    return {
      message: 'Đăng ký thành công. Vui lòng kiểm tra email để nhận mã OTP.',
      email: user.email,
    };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.usersService.findOne(email.trim().toLowerCase());
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

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findOne(email.trim().toLowerCase());
    // Always return success to avoid email enumeration
    if (!user) {
      return {
        message: 'Nếu email tồn tại, mã OTP sẽ được gửi trong vài giây.',
      };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date();
    otpExpires.setMinutes(otpExpires.getMinutes() + 10);

    await this.usersService.update(user.id, { otp, otpExpires });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Khôi phục mật khẩu SMILEE Dental',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
          <h2>Khôi phục mật khẩu SMILEE Dental</h2>
          <p>Mã OTP để đặt lại mật khẩu của bạn là:</p>
          <h1 style="color: #0284c7; letter-spacing: 4px; font-size: 36px;">${otp}</h1>
          <p>Mã này có hiệu lực trong <strong>10 phút</strong>.</p>
          <p style="color: #ef4444;">Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.</p>
        </div>
      `,
    });

    return {
      message: 'Nếu email tồn tại, mã OTP sẽ được gửi trong vài giây.',
    };
  }

  async resetPassword(
    email: string,
    otp: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const user = await this.usersService.findOne(email.trim().toLowerCase());
    if (!user) {
      throw new UnauthorizedException('Email không tồn tại');
    }

    if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
      throw new UnauthorizedException('Mã OTP không hợp lệ hoặc đã hết hạn');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.update(user.id, {
      password: hashedPassword,
      otp: null,
      otpExpires: null,
    });

    return { message: 'Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại.' };
  }
}
