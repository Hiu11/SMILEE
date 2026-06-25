import { BadRequestException, Injectable } from '@nestjs/common';
import { AppointmentStatus, InvoiceStatus, Prisma, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import type {
  CreateAppointmentDto,
  CreateInvoiceDto,
  CreateRecordDto,
  CreatePublicBookingDto,
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

  async createPublicBooking(body: CreatePublicBookingDto) {
    const fullName = requiredString(body.fullName, 'fullName');
    const phone = requiredString(body.phone, 'phone');
    const email = this.normalizeBookingEmail(body.email, phone);
    const serviceIds = Array.isArray(body.serviceIds)
      ? body.serviceIds.map((value) => requiredString(value, 'serviceIds'))
      : [];

    const customer = await this.findOrCreateBookingCustomer({
      email,
      fullName,
      phone,
    });

    return this.prisma.appointment.create({
      data: {
        date: validDate(body.date, 'date'),
        notes: optionalString(body.notes, 'notes'),
        status: AppointmentStatus.PENDING,
        customer: { connect: { id: customer.id } },
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

  async updateAppointment(id: string, body: UpdateAppointmentDto) {
    const status = body.status;
    if (
      status !== undefined &&
      !Object.values(AppointmentStatus).includes(status)
    ) {
      throw new BadRequestException('status is invalid');
    }

    const updated = await this.prisma.appointment.update({
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
        invoice: true,
      },
    });

    if (updated.status === AppointmentStatus.COMPLETED && !updated.invoice) {
      return this.createInvoiceForCompletedAppointment(updated.id);
    }

    return updated;
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

  listTreatments() {
    return this.prisma.treatment.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  createTreatment(data: Prisma.TreatmentCreateInput) {
    return this.prisma.treatment.create({ data });
  }

  updateTreatment(id: string, data: Prisma.TreatmentUpdateInput) {
    return this.prisma.treatment.update({ where: { id }, data });
  }

  removeTreatment(id: string) {
    return this.prisma.treatment.delete({ where: { id } });
  }

  private async createInvoiceForCompletedAppointment(appointmentId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        customer: true,
        doctor: true,
        services: { include: { service: true } },
        invoice: true,
      },
    });

    if (!appointment) {
      throw new BadRequestException('appointment not found');
    }

    if (appointment.invoice) {
      return appointment;
    }

    const totalAmount = appointment.services.reduce(
      (sum, item) => sum + item.quantity * item.service.price,
      0,
    );

    await this.prisma.invoice.create({
      data: {
        totalAmount,
        status: InvoiceStatus.UNPAID,
        paymentMethod: 'PENDING',
        customer: { connect: { id: appointment.customerId } },
        appointment: { connect: { id: appointment.id } },
      },
    });

    return this.prisma.appointment.findUniqueOrThrow({
      where: { id: appointmentId },
      include: {
        customer: true,
        doctor: true,
        services: { include: { service: true } },
        invoice: true,
      },
    });
  }

  private normalizeBookingEmail(email: string | undefined, phone: string) {
    const normalizedEmail = email?.trim().toLowerCase();
    if (normalizedEmail) return normalizedEmail;

    const phoneKey = phone.replace(/\D/g, '');
    if (phoneKey) return `guest-${phoneKey}@smilee.local`;

    return `guest-${randomUUID()}@smilee.local`;
  }

  private async findOrCreateBookingCustomer(data: {
    email: string;
    fullName: string;
    phone: string;
  }) {
    const existing = await this.prisma.user.findFirst({
      where: {
        role: Role.CUSTOMER,
        OR: [{ email: data.email }, { phone: data.phone }],
      },
    });

    if (existing) {
      return this.prisma.user.update({
        where: { id: existing.id },
        data: {
          fullName: data.fullName,
          phone: data.phone,
          email: existing.email,
        },
      });
    }

    const password = await bcrypt.hash(randomUUID(), 10);

    return this.prisma.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        phone: data.phone,
        password,
        role: Role.CUSTOMER,
        isVerified: false,
      },
    });
  }
}
