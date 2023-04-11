import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @MaxLength(100)
  product_image: string;
}
