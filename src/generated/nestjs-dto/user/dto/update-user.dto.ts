import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  name?: string;
  email?: string;
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  phone?: number;
}
