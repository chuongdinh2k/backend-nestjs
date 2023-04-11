import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export abstract class PaginationDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  limit?: number;
}
