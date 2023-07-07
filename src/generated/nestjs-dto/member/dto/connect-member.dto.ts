import { IsString } from 'class-validator';

export class ConnectMemberDto {
  @IsString()
  id: string;
}
