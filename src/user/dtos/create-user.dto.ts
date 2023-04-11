import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(3)
  first_name: string;

  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(3)
  last_name: string;

  created_at: Date;
  updated_at: Date;
}
