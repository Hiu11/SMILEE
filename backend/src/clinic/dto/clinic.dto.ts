import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';
import { AppointmentStatus, InvoiceStatus, Role } from '@prisma/client';

export class ListUsersQueryDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsEnum(Role)
  role!: Role;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}

export class UpdateUserDto {
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() @MinLength(6) password?: string;
  @IsOptional() @IsString() @IsNotEmpty() fullName?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() avatar?: string;
  @IsOptional() @IsEnum(Role) role?: Role;
  @IsOptional() @IsBoolean() isVerified?: boolean;
}

export class CreateServiceDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsOptional() @IsString() description?: string;
  @Type(() => Number) @IsNumber() @Min(0) price!: number;
  @Type(() => Number) @IsInt() @Min(1) duration!: number;
}

export class UpdateServiceDto {
  @IsOptional() @IsString() @IsNotEmpty() name?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) price?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) duration?: number;
}

export class CreateWarehouseItemDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsString() @IsNotEmpty() category!: string;
  @Type(() => Number) @IsInt() @Min(0) quantity!: number;
  @IsString() @IsNotEmpty() unit!: string;
  @Type(() => Number) @IsNumber() @Min(0) pricePerUnit!: number;
}

export class UpdateWarehouseItemDto {
  @IsOptional() @IsString() @IsNotEmpty() name?: string;
  @IsOptional() @IsString() @IsNotEmpty() category?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) quantity?: number;
  @IsOptional() @IsString() @IsNotEmpty() unit?: string;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) pricePerUnit?: number;
}

export class CreateAppointmentDto {
  @IsDateString() date!: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsEnum(AppointmentStatus) status?: AppointmentStatus;
  @IsUUID() customerId!: string;
  @IsOptional() @IsUUID() doctorId?: string;
  @IsOptional() @IsArray() @IsUUID('4', { each: true }) serviceIds?: string[];
}

export class CreatePublicBookingDto {
  @IsString() @IsNotEmpty() fullName!: string;
  @IsString() @IsNotEmpty() phone!: string;
  @IsOptional() @IsEmail() email?: string;
  @IsDateString() date!: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsUUID() doctorId?: string;
  @IsOptional() @IsArray() @IsUUID('4', { each: true }) serviceIds?: string[];
}

export class UpdateAppointmentDto {
  @IsOptional() @IsDateString() date?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsEnum(AppointmentStatus) status?: AppointmentStatus;
  @IsOptional() @IsUUID() doctorId?: string;
}

export class CreateRecordDto {
  @IsString() @IsNotEmpty() diagnosis!: string;
  @IsString() @IsNotEmpty() treatmentPlan!: string;
  @IsOptional() @IsString() notes?: string;
  @IsUUID() patientId!: string;
  @IsUUID() appointmentId!: string;
}

export class CreateInvoiceDto {
  @Type(() => Number) @IsNumber() @Min(0) totalAmount!: number;
  @IsOptional() @IsEnum(InvoiceStatus) status?: InvoiceStatus;
  @IsOptional() @IsString() paymentMethod?: string;
  @IsUUID() customerId!: string;
  @IsOptional() @IsUUID() appointmentId?: string;
}

export class UpdateInvoiceDto {
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) totalAmount?: number;
  @IsOptional() @IsEnum(InvoiceStatus) status?: InvoiceStatus;
  @IsOptional() @IsString() paymentMethod?: string;
}

export class CreateMessageDto {
  @IsString() @IsNotEmpty() fullName!: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() subject?: string;
  @IsString() @IsNotEmpty() message!: string;
}

export class UpdateMessageDto {
  @IsString() @IsNotEmpty() status!: string;
}
