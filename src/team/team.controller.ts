import { Request } from 'express';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../_middleware/AuthGuard';
import { CreateTeamDto } from '../_model/team/dto/create-team.dto';
import { TeamDto } from '../_model/team/dto/team.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Req() req: Request, @Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(req, createTeamDto);
  }

  @Get('findMyTeam')
  @UseGuards(AuthGuard)
  findMyTeam(@Req() req: Request): Promise<TeamDto[]> {
    return this.teamService.findMyTeam(req);
  }

  @Get('findTeamById')
  @UseGuards(AuthGuard)
  findTeamById(@Query('id') id: string): Promise<TeamDto> {
    return this.teamService.findMyTeamById(id);
  }
}
