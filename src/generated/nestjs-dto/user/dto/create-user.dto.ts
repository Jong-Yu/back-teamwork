import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  /** 이름 */
  @IsString()
  name?: string;

  /** 이메일 */
  @IsString()
  email: string;

  /**
   * 전화번호
   * @example 01012345678
   */
  @IsInt()
  phone?: number;

  /** 나이 */
  @IsInt()
  @Max(150)
  @Min(1)
  age?: number;
}
