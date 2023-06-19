import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './app.ormconfig';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UserModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
