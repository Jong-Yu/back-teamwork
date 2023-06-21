
import {ApiProperty} from '@nestjs/swagger'
import {Post} from './post.entity'
import {Profile} from './profile.entity'


export class User {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
name: string  | null;
email: string ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
phone: number  | null;
Post?: Post[] ;
Profile?: Profile  | null;
}
