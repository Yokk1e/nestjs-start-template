import { IsNotEmpty, Length, IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @IsNotEmpty()
  @Length(0, 255)
  @ApiProperty()
  readonly name: string;

  @IsArray()
  @IsInt({ each: true })
  @ApiProperty({ type: [Number] })
  readonly permissions: number[];
}