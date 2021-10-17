import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, MinLength } from 'class-validator';

export class SetPasswordDto {
  @IsNotEmpty()
  @Length(1, 225)
  @MinLength(6, { message: 'Password must have at least 6 letters' })
  @ApiProperty()
  readonly password: string;
}
