import { ApiProperty } from '@nestjs/swagger';
import { Team } from '../../team/entities/team.entity';
import { Member } from '../../member/entities/member.entity';

export class Notice {
  id: string;
  team_id: string;
  member_id: string;
  title: string;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  registed_date: Date;
  Team?: Team;
  Member?: Member;
}
