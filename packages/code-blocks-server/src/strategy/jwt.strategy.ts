import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from '../common/constant/env';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected configService: ConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JWT_SECRET),
    });
  }

  // 对token进行校验，会在req.user上添加信息
  async validate(payload: { userId: string; phone: string }) {
    const user_info = await this.usersRepository.findOne({
      where: { id: payload.userId },
      select: ['id', 'phone', 'is_status'],
    });
    if (!user_info) return false;
    if (!user_info.is_status) return false;
    if (user_info.phone !== payload.phone && user_info.id !== payload.userId)
      return false;
    return { userId: payload.userId, phone: payload.phone };
  }
}
