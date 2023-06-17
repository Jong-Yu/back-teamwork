import { Body, Controller, Post, Put } from '@nestjs/common';
import validationPipe from '../app.validationPipe';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  createUser(@Body() adminDto: CreateAdminDto) {
    return this.adminService.create(adminDto);
  }

  @Put()
  updateUser(@Body(validationPipe) adminDto: CreateAdminDto) {
    return this.adminService.create(adminDto);
  }
}
