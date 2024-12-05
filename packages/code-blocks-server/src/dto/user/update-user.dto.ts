import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'User id is required' })
  @IsUUID('4', { message: 'User id must be a valid UUID' })
  user_id: string;

  @IsNotEmpty({ message: 'User name is required' })
  username: string;

  @IsNotEmpty({ message: 'User ImageUrl is required' })
  imgUrl: string;
}
