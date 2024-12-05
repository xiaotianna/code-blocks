import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from '../dto/user/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwt: JwtService,
  ) {}

  /**
   * 注册
   */
  async register(dto: RegisterDto): Promise<Partial<User>> {
    const { phone, password } = dto;
    const isReg = await this.usersRepository.findOne({ where: { phone } });
    if (isReg) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }
    const user = new User();
    user.phone = phone;
    user.password = password;
    const userTmp = this.usersRepository.create(user);
    return this.usersRepository.save(userTmp);
  }

  /**
   * 登陆
   */
  async login(dto: RegisterDto): Promise<Partial<User & { token: string }>> {
    const { phone, password } = dto;
    const isLogin = await this.usersRepository.findOne({ where: { phone } });
    if (!isLogin) {
      throw new NotFoundException('用户不存在');
    }
    const isStatus = await this.usersRepository.findOne({
      where: { phone, is_status: true },
    });
    if (!isStatus) {
      throw new HttpException('账号已禁用', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersRepository.findOne({
      where: { phone, password },
      select: ['id', 'phone', 'username', 'imgUrl', 'role'],
    });
    if (!user) {
      throw new HttpException('用户名或密码错误', HttpStatus.BAD_REQUEST);
    }
    const token = await this.jwt.signAsync({ userId: user.id, phone });
    const info = {
      ...user,
      token,
    };
    return info;
  }
}
