import { IsString } from 'class-validator';

export class ConnectNoticeDto {
  @IsString()
  id: string;
}
