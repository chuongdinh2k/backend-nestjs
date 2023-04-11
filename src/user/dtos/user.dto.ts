import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(3)
  first_name: string;

  @IsNotEmpty()
  @MaxLength(12)
  last_name: string;

  updated_at: Date;
}
