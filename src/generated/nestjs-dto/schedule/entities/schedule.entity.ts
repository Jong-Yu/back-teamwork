import { ApiProperty } from '@nestjs/swagger';
import { Team } from '../../team/entities/team.entity';
import { Member } from '../../member/entities/member.entity';
import { Voting } from '../../voting/entities/voting.entity';

export class Schedule {
  id: string;
  team_id: string;
  member_id: string;
  title: string;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  date: Date;
  location: string;
  location_detail: string;
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  min_attend: number | null;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  registred_date: Date;
  Team?: Team;
  Member?: Member;
  Voting?: Voting[];
}
