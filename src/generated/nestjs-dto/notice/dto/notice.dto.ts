import { IsDate, IsString } from 'class-validator';

export class NoticeDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsDate()
  registed_date: Date;
}
