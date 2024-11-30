import { Body, Controller, Inject, LoggerService, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { TypeOrmDecorator } from '../decorators/typeorm.decorator';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { RegisterDto } from '../dto/user/register.dto';

@Controller('auth')
@TypeOrmDecorator()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  /**
   * 注册用户接口
   * @param phone 用户手机号
   * @param password 用户密码
   * @returns
   */
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const res = await this.authService.register(dto);
    const { id, phone, username } = res;
    return {
      code: 200,
      message: '注册成功',
      data: { id, phone, username },
    };
  }

  /**
   * 登录接口
   * @param phone 用户手机号
   * @param password 用户密码
   * @returns
   */
  @Post('login')
  async login(@Body() dto: RegisterDto) {
    const user = await this.authService.login(dto);
    return {
      code: 200,
      message: '登录成功',
      data: user,
    };
  }
}
