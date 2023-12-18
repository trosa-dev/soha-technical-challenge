import { IsNotEmpty, IsString } from 'class-validator';

// LoginDto class definition with validation decorators
export class LoginDto {
  // Decorator to ensure the 'password' property is not empty and is a string
  @IsNotEmpty()
  @IsString()
  password: string;

  // Decorator to ensure the 'email' property is not empty and is a string
  @IsNotEmpty()
  @IsString()
  email: string;
}
