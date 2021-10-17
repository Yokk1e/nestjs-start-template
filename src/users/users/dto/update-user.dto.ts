import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, Length, MinLength } from 'class-validator';
import { Role } from '../../roles/role.entity';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 225)
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @Length(1, 225)
  @ApiProperty()
  readonly firstName: string;

  @IsNotEmpty()
  @Length(1, 225)
  @ApiProperty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: Number })
  readonly role: Role;
}
