import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { getTokenInRequest } from '../_shared/request.util';
import { CreateTeamDto } from '../_model/team/dto/create-team.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class TeamService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async create(req: Request, createTeamDto: CreateTeamDto) {
    const accessToken = getTokenInRequest(req);

    const payload = this.jwtService.decode(accessToken);

    const user = await this.userService.findUserByEmail(payload['email']);

    if (user) {
      const team = await this.prisma.team.create({
        data: {
          ...createTeamDto,
          Member: {
            create: {
              duty: '회장',
              status: 'active',
              user_id: user.id,
            },
          },
        },
      });

      return team.id;
    } else {
      throw new Error('유저가 존재하지 않습니다.');
    }
  }

  async findMyTeam(req: Request) {
    const accessToken = getTokenInRequest(req);

    const payload = this.jwtService.decode(accessToken);

    const user = await this.userService.findUserByEmail(payload['email']);

    if (user) {
      const myTeams = await this.prisma.team.findMany({
        where: {
          Member: {
            some: { id: user.id },
          },
        },
      });

      return myTeams;
    } else {
      throw new Error('유저가 존재하지 않습니다.');
    }
  }
}
