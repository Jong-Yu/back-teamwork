import { IsBoolean } from 'class-validator';

export class CreateVotingDto {
  @IsBoolean()
  voting: boolean;
}
