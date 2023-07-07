import { Member_status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from '../../team/entities/team.entity';
import { User } from '../../user/entities/user.entity';
import { Notice } from '../../notice/entities/notice.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Voting } from '../../voting/entities/voting.entity';

export class Member {
  id: string;
  team_id: string;
  user_id: string;
  duty: string;
  @ApiProperty({
    enum: Member_status,
  })
  status: Member_status;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  status_date: Date;
  Team?: Team;
  User?: User;
  Notice?: Notice[];
  Schedule?: Schedule[];
  Voting?: Voting[];
}
