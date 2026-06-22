import { Injectable } from '@nestjs/common';
import { AppointmentStatus, InvoiceStatus, Prisma, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClinicService {
  constructor(private prisma: PrismaService) {}

  async dashboard() {
    const [patients, appointments, revenue, doctors, upcoming] = await Promise.all([
      this.prisma.user.count({ where: { role: Role.CUSTOMER } }),
      this.prisma.appointment.count(),
      this.prisma.invoice.aggregate({ _sum: { totalAmount: true } }),
      this.prisma.user.count({ where: { role: Role.DOCTOR } }),
      this.prisma.appointment.findMany({
        take: 5,
        orderBy: { date: 'asc' },
        include: { customer: true, doctor: true, services: { include: { service: true } } },
      }),
    ]);

    return { patients, appointments, revenue: revenue._sum.totalAmount ?? 0, doctors, upcoming };
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
    return this.prisma.warehouseItem.findMany({ orderBy: { createdAt: 'desc' } });
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
      include: { customer: true, doctor: true, services: { include: { service: true } }, invoice: true, record: true },
    });
  }

  createAppointment(body: Record<string, unknown>) {
    const serviceIds = Array.isArray(body.serviceIds) ? (body.serviceIds as string[]) : [];

    return this.prisma.appointment.create({
      data: {
        date: new Date(String(body.date)),
        notes: body.notes ? String(body.notes) : undefined,
        status: (body.status as AppointmentStatus) ?? AppointmentStatus.PENDING,
        customer: { connect: { id: String(body.customerId) } },
        doctor: body.doctorId ? { connect: { id: String(body.doctorId) } } : undefined,
        services: {
          create: serviceIds.map((serviceId) => ({
            service: { connect: { id: serviceId } },
          })),
        },
      },
      include: { customer: true, doctor: true, services: { include: { service: true } } },
    });
  }

  updateAppointment(id: string, body: Record<string, unknown>) {
    return this.prisma.appointment.update({
      where: { id },
      data: {
        date: body.date ? new Date(String(body.date)) : undefined,
        notes: body.notes === undefined ? undefined : String(body.notes),
        status: body.status as AppointmentStatus | undefined,
        doctor: body.doctorId ? { connect: { id: String(body.doctorId) } } : undefined,
      },
      include: { customer: true, doctor: true, services: { include: { service: true } } },
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

  createRecord(body: Record<string, string>) {
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

  createInvoice(body: Record<string, unknown>) {
    return this.prisma.invoice.create({
      data: {
        totalAmount: Number(body.totalAmount),
        status: (body.status as InvoiceStatus) ?? InvoiceStatus.UNPAID,
        paymentMethod: body.paymentMethod ? String(body.paymentMethod) : undefined,
        customer: { connect: { id: String(body.customerId) } },
        appointment: body.appointmentId ? { connect: { id: String(body.appointmentId) } } : undefined,
      },
    });
  }

  updateInvoice(id: string, data: Prisma.InvoiceUpdateInput) {
    return this.prisma.invoice.update({ where: { id }, data });
  }

  listMessages() {
    return this.prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  }

  createMessage(data: Prisma.ContactMessageCreateInput) {
    return this.prisma.contactMessage.create({ data });
  }

  updateMessage(id: string, data: Prisma.ContactMessageUpdateInput) {
    return this.prisma.contactMessage.update({ where: { id }, data });
  }
}
