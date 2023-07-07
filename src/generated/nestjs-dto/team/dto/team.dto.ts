import { ApiProperty } from '@nestjs/swagger';

export class TeamDto {
  id: string;
  name: string;
  logo: string | null;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  registered_date: Date;
}
