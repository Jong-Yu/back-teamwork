import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  id: number;
  bio: string | null;
}
