import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  create(adminDto: CreateAdminDto) {
    return adminDto;
  }
}
