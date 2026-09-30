import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserDTO {
  @ApiProperty({
    description: 'Enter the user email',
    required: true,
    example: 'test@example.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Enter the name of the user',
    example: 'John',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 chat long' })
  name: string;

  @ApiProperty({
    description:
      'enter password at least 8 char, at least one number, at least one letter and at least one special char',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=]).{8,}$/, {
    message:
      'password must be at least 8 char, at least one number, at least one letter and at least one special char',
  })
  password: string;

  @ApiProperty({
    description:
      'enter confirm password at least 8 char, at least one number, at least one letter and at least one special char',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=]).{8,}$/, {
    message:
      'confirm password must be at least 8 char, at least one number, at least one letter and at least one special char',
  })
  confirmPassword: string;
}

export class LoginDTO {
  @ApiProperty({
    description: 'Enter the user email',
    required: true,
    example: 'test@example.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description:
      'enter password at least 8 char, at least one number, at least one letter and at least one special char',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
