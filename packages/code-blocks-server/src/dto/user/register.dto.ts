import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Phone is required' })
  @IsPhoneNumber('CN', { message: 'Invalid phone number' })
  phone: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}
