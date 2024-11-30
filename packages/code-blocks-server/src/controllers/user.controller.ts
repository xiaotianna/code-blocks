import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  // find(@Query('user_id', new ParseUUIDPipe()) user_id: string) {
  //   // this.usersRepository.findOne({ where: { id: user_id } });
  //   // ParseUUIDPipe
  //   return 'ok' + user_id;
  // }
  find(@Request() req) {
    //   // this.usersRepository.findOne({ where: { id: user_id } });
    //   // ParseUUIDPipe
    //   return 'ok' + user_id;
    console.log(req.user, 'req.user');
    return 'ok';
  }
}
