import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../../post/entities/post.entity';
import { Profile } from '../../profile/entities/profile.entity';

export class User {
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  id: number;
  name: string | null;
  email: string;
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  phone: number | null;
  Post?: Post[];
  Profile?: Profile | null;
}
