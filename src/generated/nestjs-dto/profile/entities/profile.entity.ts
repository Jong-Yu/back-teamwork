import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class Profile {
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  id: number;
  bio: string | null;
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  userId: number;
  User?: User;
}
