import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

type RequestLike = {
  method?: string;
  path?: string;
  url?: string;
  headers?: { authorization?: string };
  query?: { role?: string };
};

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestLike>();
    const method = request.method ?? '';
    const path = request.path ?? request.url ?? '';

    if (this.isPublicClinicRoute(method, path, request.query?.role)) {
      return true;
    }

    const token = this.extractBearerToken(request.headers?.authorization);
    if (!token) {
      throw new UnauthorizedException('Vui lòng đăng nhập để tiếp tục');
    }

    try {
      const payload = this.jwtService.verify<{ role?: Role }>(token, {
        secret: process.env.JWT_SECRET,
      });

      if (payload.role !== Role.ADMIN) {
        throw new ForbiddenException('Tài khoản không có quyền quản trị');
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new UnauthorizedException(
        'Phiên đăng nhập không hợp lệ hoặc đã hết hạn',
      );
    }
  }

  private isPublicClinicRoute(method: string, path: string, role?: string) {
    if (method === 'GET' && path === '/services') return true;
    if (method === 'GET' && path === '/users' && role === Role.DOCTOR)
      return true;
    if (method === 'POST' && path === '/messages') return true;
    return false;
  }

  private extractBearerToken(authorization?: string) {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
