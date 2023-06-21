
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateUserDto {
  name?: string;
email: string;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
phone?: number;
}
