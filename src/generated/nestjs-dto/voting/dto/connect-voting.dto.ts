import { IsString } from 'class-validator';

export class ConnectVotingDto {
  @IsString()
  id: string;
}
