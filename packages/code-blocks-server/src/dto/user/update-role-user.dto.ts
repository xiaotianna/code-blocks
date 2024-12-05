import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { UserRole } from '../../common/enum/role.enum';

export class UpdateUserRoleDto {
  @IsNotEmpty({ message: 'User id is required' })
  @IsUUID('4', { message: 'User id must be a valid UUID' })
  user_id: string;

  @IsNotEmpty({ message: 'Other user id is required' })
  @IsUUID('4', { message: 'Other user id must be a valid UUID' })
  other_uid: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(UserRole, {
    message:
      'Status must be one of the following: ' +
      Object.values(UserRole).join(', '),
  })
  role: string;
}
