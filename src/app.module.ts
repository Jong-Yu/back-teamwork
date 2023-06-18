import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    AdminModule,
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
      password: '327812',
      database: 'test',
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AdminService],
})
export class AppModule {}
