import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
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
}
