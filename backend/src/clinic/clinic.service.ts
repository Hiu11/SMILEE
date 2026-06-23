import { BadRequestException, Injectable } from '@nestjs/common';
import { AppointmentStatus, InvoiceStatus, Prisma, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import type {
  CreateAppointmentDto,
  CreateInvoiceDto,
  CreateRecordDto,
  UpdateAppointmentDto,
} from './dto/clinic.dto';

function requiredString(value: unknown, field: string) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new BadRequestException(`${field} is required`);
  }
  return value.trim();
}

function optionalString(value: unknown, field: string) {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string') {
    throw new BadRequestException(`${field} must be a string`);
  }
  return value.trim();
}

function validDate(value: unknown, field: string) {
  const date = new Date(requiredString(value, field));
  if (Number.isNaN(date.getTime())) {
    throw new BadRequestException(`${field} is invalid`);
  }
  return date;
}

@Injectable()
export class ClinicService {
  constructor(private prisma: PrismaService) {}

  async dashboard() {
    const [patients, appointments, revenue, doctors, upcoming] =
      await Promise.all([
        this.prisma.user.count({ where: { role: Role.CUSTOMER } }),
        this.prisma.appointment.count(),
        this.prisma.invoice.aggregate({ _sum: { totalAmount: true } }),
        this.prisma.user.count({ where: { role: Role.DOCTOR } }),
        this.prisma.appointment.findMany({
          take: 5,
          orderBy: { date: 'asc' },
          include: {
            customer: true,
            doctor: true,
            services: { include: { service: true } },
          },
        }),
      ]);

    return {
      patients,
      appointments,
      revenue: revenue._sum.totalAmount ?? 0,
      doctors,
      upcoming,
    };
  }

  listUsers(role?: Role) {
    return this.prisma.user.findMany({
      where: role ? { role } : undefined,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        avatar: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    const password = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: { ...data, password, isVerified: data.isVerified ?? true },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        avatar: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    const nextData = { ...data };
    if (typeof data.password === 'string' && data.password) {
      nextData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: nextData,
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        avatar: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  removeUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  listServices() {
    return this.prisma.service.findMany({ orderBy: { createdAt: 'desc' } });
  }

  createService(data: Prisma.ServiceCreateInput) {
    return this.prisma.service.create({ data });
  }

  updateService(id: string, data: Prisma.ServiceUpdateInput) {
    return this.prisma.service.update({ where: { id }, data });
  }

  removeService(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }

  listWarehouse() {
    return this.prisma.warehouseItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  createWarehouseItem(data: Prisma.WarehouseItemCreateInput) {
    return this.prisma.warehouseItem.create({ data });
  }

  updateWarehouseItem(id: string, data: Prisma.WarehouseItemUpdateInput) {
    return this.prisma.warehouseItem.update({ where: { id }, data });
  }

  removeWarehouseItem(id: string) {
    return this.prisma.warehouseItem.delete({ where: { id } });
  }

  listAppointments() {
    return this.prisma.appointment.findMany({
      orderBy: { date: 'asc' },
      include: {
        customer: true,
        doctor: true,
        services: { include: { service: true } },
        invoice: true,
        record: true,
      },
    });
  }

  createAppointment(body: CreateAppointmentDto) {
    const serviceIds = Array.isArray(body.serviceIds)
      ? body.serviceIds.map((value) => requiredString(value, 'serviceIds'))
      : [];
    const status = body.status ?? AppointmentStatus.PENDING;
    if (!Object.values(AppointmentStatus).includes(status)) {
      throw new BadRequestException('status is invalid');
    }

    return this.prisma.appointment.create({
      data: {
        date: validDate(body.date, 'date'),
        notes: optionalString(body.notes, 'notes'),
        status,
        customer: {
          connect: { id: requiredString(body.customerId, 'customerId') },
        },
        doctor: body.doctorId
          ? { connect: { id: requiredString(body.doctorId, 'doctorId') } }
          : undefined,
        services: {
          create: serviceIds.map((serviceId) => ({
            service: { connect: { id: serviceId } },
          })),
        },
      },
      include: {
        customer: true,
        doctor: true,
        services: { include: { service: true } },
      },
    });
  }

  updateAppointment(id: string, body: UpdateAppointmentDto) {
    const status = body.status;
    if (
      status !== undefined &&
      !Object.values(AppointmentStatus).includes(status)
    ) {
      throw new BadRequestException('status is invalid');
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        date:
          body.date === undefined ? undefined : validDate(body.date, 'date'),
        notes: optionalString(body.notes, 'notes'),
        status,
        doctor:
          body.doctorId === null || body.doctorId === ''
            ? { disconnect: true }
            : body.doctorId
              ? { connect: { id: requiredString(body.doctorId, 'doctorId') } }
              : undefined,
      },
      include: {
        customer: true,
        doctor: true,
        services: { include: { service: true } },
      },
    });
  }

  removeAppointment(id: string) {
    return this.prisma.appointment.delete({ where: { id } });
  }

  listRecords() {
    return this.prisma.record.findMany({
      orderBy: { createdAt: 'desc' },
      include: { patient: true, appointment: { include: { doctor: true } } },
    });
  }

  createRecord(body: CreateRecordDto) {
    return this.prisma.record.create({
      data: {
        diagnosis: body.diagnosis,
        treatmentPlan: body.treatmentPlan,
        notes: body.notes,
        patient: { connect: { id: body.patientId } },
        appointment: { connect: { id: body.appointmentId } },
      },
    });
  }

  listInvoices() {
    return this.prisma.invoice.findMany({
      orderBy: { createdAt: 'desc' },
      include: { customer: true, appointment: true },
    });
  }

  createInvoice(body: CreateInvoiceDto) {
    const totalAmount = Number(body.totalAmount);
    const status = body.status ?? InvoiceStatus.UNPAID;
    if (!Number.isFinite(totalAmount) || totalAmount < 0) {
      throw new BadRequestException('totalAmount must be a positive number');
    }
    if (!Object.values(InvoiceStatus).includes(status)) {
      throw new BadRequestException('status is invalid');
    }

    return this.prisma.invoice.create({
      data: {
        totalAmount,
        status,
        paymentMethod: optionalString(body.paymentMethod, 'paymentMethod'),
        customer: {
          connect: { id: requiredString(body.customerId, 'customerId') },
        },
        appointment: body.appointmentId
          ? {
              connect: {
                id: requiredString(body.appointmentId, 'appointmentId'),
              },
            }
          : undefined,
      },
    });
  }

  updateInvoice(id: string, data: Prisma.InvoiceUpdateInput) {
    return this.prisma.invoice.update({ where: { id }, data });
  }

  listMessages() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  createMessage(data: Prisma.ContactMessageCreateInput) {
    return this.prisma.contactMessage.create({ data });
  }

  updateMessage(id: string, data: Prisma.ContactMessageUpdateInput) {
    return this.prisma.contactMessage.update({ where: { id }, data });
  }
}
