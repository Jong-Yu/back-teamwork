
import {ApiProperty} from '@nestjs/swagger'


export class UserDto {
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
}
