import { IsNotEmpty, IsString, IsInt, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsArray()
  @IsInt({ each: true })
  @ApiPropertyOptional({ type: [Number] })
  readonly permissions: number[];
}
