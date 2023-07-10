import { IsString } from 'class-validator';

export class ConnectScheduleDto {
  @IsString()
  id: string;
}
