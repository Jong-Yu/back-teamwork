import { IsString } from 'class-validator';

export class ConnectTeamDto {
  @IsString()
  id: string;
}
