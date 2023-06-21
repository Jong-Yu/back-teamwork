import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class Post {
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  id: number;
  title: string;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  createdAt: Date;
  content: string | null;
  published: boolean;
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  authorId: number;
  User?: User;
}
