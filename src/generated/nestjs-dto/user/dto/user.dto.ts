import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  sign_date: Date;
}
