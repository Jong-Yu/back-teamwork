import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../../member/entities/member.entity';

export class User {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  sign_date: Date;
  Member?: Member[];
}
