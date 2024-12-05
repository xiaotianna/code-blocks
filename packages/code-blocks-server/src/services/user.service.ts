import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { UserRole } from '../common/enum/role.enum';
import { GetUserListDto } from '../dto/user/get-user-list.dto';
import { GetRoleDto } from '../dto/user/get-role.dto';
import { UpdateUserStatusDto } from '../dto/user/update-status-user.dto';
import { UpdateUserRoleDto } from '../dto/user/update-role-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async update(dto: UpdateUserDto): Promise<UpdateResult> {
    const { user_id, username, imgUrl } = dto;
    const result = await this.usersRepository.update(
      { id: user_id },
      { username, imgUrl },
    );
    return result;
  }

  async getUserAuth(user_id: string): Promise<User> {
    if (!user_id) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }
    return this.usersRepository.findOne({
      where: { id: user_id, is_status: true },
      select: ['id', 'role'],
    });
  }

  async findUsers(
    id: string,
    dto: GetUserListDto,
  ): Promise<{ result: User[]; total: number }> {
    const user_role = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'role'],
    });
    const { page, size } = dto;
    const skip = (page - 1) * size;
    let result: User[];
    if (user_role.role === UserRole.ADMIN) {
      result = await this.usersRepository.find({
        skip,
        take: size,
        order: { id: 'DESC' },
        select: ['id', 'username', 'phone', 'password', 'role', 'is_status'],
      });
    } else {
      result = await this.usersRepository.find({
        skip,
        take: size,
        order: { id: 'DESC' },
        select: ['username'],
      });
    }
    const total = await this.usersRepository.count();
    return {
      result,
      total,
    };
  }

  async getRole(dto: GetRoleDto): Promise<User> {
    const { user_id } = dto;
    const result = await this.usersRepository.findOne({
      where: { id: user_id },
      select: ['role'],
    });
    return result;
  }

  async updateStatus(dto: UpdateUserStatusDto) {
    const { other_uid, is_status } = dto;
    const result = await this.usersRepository.update(
      { id: other_uid },
      { is_status: Boolean(is_status) },
    );
    return result;
  }

  async updateRole(dto: UpdateUserRoleDto) {
    const { other_uid, role } = dto;
    const result = await this.usersRepository.update(
      { id: other_uid },
      { role: role as UserRole },
    );
    return result;
  }
}
