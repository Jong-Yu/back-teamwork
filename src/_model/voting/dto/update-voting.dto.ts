import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateVotingDto {
  @IsBoolean()
  @IsOptional()
  voting?: boolean;
}
