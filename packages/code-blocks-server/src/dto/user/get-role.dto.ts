import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetRoleDto {
  @IsNotEmpty({ message: 'User id is required' })
  @IsUUID('4', { message: 'User id must be a valid UUID' })
  user_id: string;
}
