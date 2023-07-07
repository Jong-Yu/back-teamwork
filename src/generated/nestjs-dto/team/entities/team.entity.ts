import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../../member/entities/member.entity';
import { Notice } from '../../notice/entities/notice.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';

export class Team {
  id: string;
  name: string;
  logo: string | null;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  registered_date: Date;
  Member?: Member[];
  Notice?: Notice[];
  Schedule?: Schedule[];
}
