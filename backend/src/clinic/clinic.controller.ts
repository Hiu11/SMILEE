import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { AdminGuard } from '../auth/admin.guard';
import { ClinicService } from './clinic.service';

@Controller()
@UseGuards(AdminGuard)
export class ClinicController {
  constructor(private clinic: ClinicService) {}

  @Get('dashboard')
  dashboard() {
    return this.clinic.dashboard();
  }

  @Get('users')
  users(@Query('role') role?: Role) {
    return this.clinic.listUsers(role);
  }

  @Post('users')
  createUser(@Body() body: Prisma.UserCreateInput) {
    return this.clinic.createUser(body);
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() body: Prisma.UserUpdateInput) {
    return this.clinic.updateUser(id, body);
  }

  @Delete('users/:id')
  removeUser(@Param('id') id: string) {
    return this.clinic.removeUser(id);
  }

  @Get('services')
  services() {
    return this.clinic.listServices();
  }

  @Post('services')
  createService(@Body() body: Prisma.ServiceCreateInput) {
    return this.clinic.createService(body);
  }

  @Patch('services/:id')
  updateService(@Param('id') id: string, @Body() body: Prisma.ServiceUpdateInput) {
    return this.clinic.updateService(id, body);
  }

  @Delete('services/:id')
  removeService(@Param('id') id: string) {
    return this.clinic.removeService(id);
  }

  @Get('warehouse')
  warehouse() {
    return this.clinic.listWarehouse();
  }

  @Post('warehouse')
  createWarehouse(@Body() body: Prisma.WarehouseItemCreateInput) {
    return this.clinic.createWarehouseItem(body);
  }

  @Patch('warehouse/:id')
  updateWarehouse(@Param('id') id: string, @Body() body: Prisma.WarehouseItemUpdateInput) {
    return this.clinic.updateWarehouseItem(id, body);
  }

  @Delete('warehouse/:id')
  removeWarehouse(@Param('id') id: string) {
    return this.clinic.removeWarehouseItem(id);
  }

  @Get('appointments')
  appointments() {
    return this.clinic.listAppointments();
  }

  @Post('appointments')
  createAppointment(@Body() body: Record<string, unknown>) {
    return this.clinic.createAppointment(body);
  }

  @Patch('appointments/:id')
  updateAppointment(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.clinic.updateAppointment(id, body);
  }

  @Delete('appointments/:id')
  removeAppointment(@Param('id') id: string) {
    return this.clinic.removeAppointment(id);
  }

  @Get('records')
  records() {
    return this.clinic.listRecords();
  }

  @Post('records')
  createRecord(@Body() body: Record<string, string>) {
    return this.clinic.createRecord(body);
  }

  @Get('invoices')
  invoices() {
    return this.clinic.listInvoices();
  }

  @Post('invoices')
  createInvoice(@Body() body: Record<string, unknown>) {
    return this.clinic.createInvoice(body);
  }

  @Patch('invoices/:id')
  updateInvoice(@Param('id') id: string, @Body() body: Prisma.InvoiceUpdateInput) {
    return this.clinic.updateInvoice(id, body);
  }

  @Get('messages')
  messages() {
    return this.clinic.listMessages();
  }

  @Post('messages')
  createMessage(@Body() body: Prisma.ContactMessageCreateInput) {
    return this.clinic.createMessage(body);
  }

  @Patch('messages/:id')
  updateMessage(@Param('id') id: string, @Body() body: Prisma.ContactMessageUpdateInput) {
    return this.clinic.updateMessage(id, body);
  }
}
