import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  id: number;
  @ApiProperty()
  name: string | null;
  @ApiProperty()
  email: string;
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  phone: number | null;
}
