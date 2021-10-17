import { IsOptional, Min, IsNumber, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum OrderType {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class ManagedQueryDto {
  @IsOptional()
  @Transform((page) => Number(page.value))
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({ type: Number })
  readonly page: number = 1;

  @IsOptional()
  @Transform((limit) => Number(limit.value))
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({ type: Number })
  readonly limit: number = 10;

  @IsOptional()
  @IsEnum(OrderType)
  @ApiPropertyOptional({
    type: 'enum',
    enum: OrderType,
    default: OrderType.ASC,
  })
  readonly orderType: OrderType;

  @IsOptional()
  @ApiPropertyOptional()
  readonly search: string;
}
