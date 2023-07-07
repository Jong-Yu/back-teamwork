import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Member } from '../../member/entities/member.entity';

export class Voting {
  schedule_id: string;
  member_id: string;
  id_2: string;
  voting: boolean;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  voting_date: Date;
  Schedule?: Schedule;
  Member?: Member;
}
