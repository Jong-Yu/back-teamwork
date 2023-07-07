import { IsBoolean, IsDate, IsString } from 'class-validator';

export class VotingDto {
  @IsString()
  id: string;

  @IsBoolean()
  voting: boolean;

  @IsDate()
  voting_date: Date;
}
