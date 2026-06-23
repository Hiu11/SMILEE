import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../auth/admin.guard';
import { ClinicService } from './clinic.service';
import {
  CreateAppointmentDto,
  CreateInvoiceDto,
  CreateMessageDto,
  CreateRecordDto,
  CreateServiceDto,
  CreateUserDto,
  CreateWarehouseItemDto,
  ListUsersQueryDto,
  UpdateAppointmentDto,
  UpdateInvoiceDto,
  UpdateMessageDto,
  UpdateServiceDto,
  UpdateUserDto,
  UpdateWarehouseItemDto,
} from './dto/clinic.dto';

@Controller()
@UseGuards(AdminGuard)
export class ClinicController {
  constructor(private clinic: ClinicService) {}

  @Get('dashboard')
  dashboard() {
    return this.clinic.dashboard();
  }

  @Get('users')
  users(@Query() query: ListUsersQueryDto) {
    return this.clinic.listUsers(query.role);
  }

  @Post('users')
  createUser(@Body() body: CreateUserDto) {
    return this.clinic.createUser(body);
  }

  @Patch('users/:id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.clinic.updateUser(id, body);
  }

  @Delete('users/:id')
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.clinic.removeUser(id);
  }

  @Get('services')
  services() {
    return this.clinic.listServices();
  }

  @Post('services')
  createService(@Body() body: CreateServiceDto) {
    return this.clinic.createService(body);
  }

  @Patch('services/:id')
  updateService(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateServiceDto,
  ) {
    return this.clinic.updateService(id, body);
  }

  @Delete('services/:id')
  removeService(@Param('id', ParseUUIDPipe) id: string) {
    return this.clinic.removeService(id);
  }

  @Get('warehouse')
  warehouse() {
    return this.clinic.listWarehouse();
  }

  @Post('warehouse')
  createWarehouse(@Body() body: CreateWarehouseItemDto) {
    return this.clinic.createWarehouseItem(body);
  }

  @Patch('warehouse/:id')
  updateWarehouse(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateWarehouseItemDto,
  ) {
    return this.clinic.updateWarehouseItem(id, body);
  }

  @Delete('warehouse/:id')
  removeWarehouse(@Param('id', ParseUUIDPipe) id: string) {
    return this.clinic.removeWarehouseItem(id);
  }

  @Get('appointments')
  appointments() {
    return this.clinic.listAppointments();
  }

  @Post('appointments')
  createAppointment(@Body() body: CreateAppointmentDto) {
    return this.clinic.createAppointment(body);
  }

  @Patch('appointments/:id')
  updateAppointment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAppointmentDto,
  ) {
    return this.clinic.updateAppointment(id, body);
  }

  @Delete('appointments/:id')
  removeAppointment(@Param('id', ParseUUIDPipe) id: string) {
    return this.clinic.removeAppointment(id);
  }

  @Get('records')
  records() {
    return this.clinic.listRecords();
  }

  @Post('records')
  createRecord(@Body() body: CreateRecordDto) {
    return this.clinic.createRecord(body);
  }

  @Get('invoices')
  invoices() {
    return this.clinic.listInvoices();
  }

  @Post('invoices')
  createInvoice(@Body() body: CreateInvoiceDto) {
    return this.clinic.createInvoice(body);
  }

  @Patch('invoices/:id')
  updateInvoice(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateInvoiceDto,
  ) {
    return this.clinic.updateInvoice(id, body);
  }

  @Get('messages')
  messages() {
    return this.clinic.listMessages();
  }

  @Post('messages')
  createMessage(@Body() body: CreateMessageDto) {
    return this.clinic.createMessage(body);
  }

  @Patch('messages/:id')
  updateMessage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateMessageDto,
  ) {
    return this.clinic.updateMessage(id, body);
  }
}
