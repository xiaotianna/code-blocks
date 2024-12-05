import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateUserStatusDto {
  @IsNotEmpty({ message: 'User id is required' })
  @IsUUID('4', { message: 'User id must be a valid UUID' })
  user_id: string;

  @IsNotEmpty({ message: 'Other user id is required' })
  @IsUUID('4', { message: 'Other user id must be a valid UUID' })
  other_uid: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsBoolean({ message: 'Status must be a boolean value' })
  is_status: boolean;
}
