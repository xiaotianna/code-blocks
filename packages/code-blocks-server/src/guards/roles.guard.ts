import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../common/enum/role.enum';
import { ROLE_KEY } from '../decorators/roles.decorator';
import { UserService } from '../services/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取etMetadata的注解信息
    const requireRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLE_KEY,
      [
        context.getHandler(), // 从路由上读
        context.getClass(), // 从controller上读
      ],
    );
    if (!requireRoles) {
      return true;
    }
    // jwt的user信息
    const req = context.switchToHttp().getRequest();
    const user = await this.userService.getUserAuth(req.user.userId);
    const hasRole = requireRoles.some((role) => user.role?.includes(role));
    return hasRole;
  }
}
