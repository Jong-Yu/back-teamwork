import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService, UserService],
})
export class TeamModule {}
