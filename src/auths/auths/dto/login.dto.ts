import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty()
  readonly password: string;
}
