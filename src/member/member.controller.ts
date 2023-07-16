import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../_middleware/AuthGuard';
import { MemberService } from './member.service';
import { CreateMemberDto } from 'src/_model/member/dto/create-member.dto';
import { UpdateMemberDto } from 'src/_model/member/dto/update-member.dto';

@ApiTags('멤버 API')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('find')
  @UseGuards(AuthGuard)
  findMembers() {
    return this.memberService.find();
  }

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Post('update')
  @UseGuards(AuthGuard)
  update(@Body() memberId: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(memberId, updateMemberDto);
  }
}
