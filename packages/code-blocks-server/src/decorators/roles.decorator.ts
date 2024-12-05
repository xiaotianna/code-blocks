import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../common/enum/role.enum';

export const ROLE_KEY = 'role';

// SetMetadata设置注解信息
export const Role = (...roles: UserRole[]) => SetMetadata(ROLE_KEY, roles);
