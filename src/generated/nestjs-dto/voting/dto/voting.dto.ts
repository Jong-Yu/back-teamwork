import { ApiProperty } from '@nestjs/swagger';

export class VotingDto {
  id_2: string;
  voting: boolean;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  voting_date: Date;
}
