import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { File } from 'node:buffer';
import { UserService } from '../services/user.service';
import { JwtGuard } from '../guards/jwt.guard';
import { FileTypeDecorator } from '../decorators/file-type.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { Role } from '../decorators/roles.decorator';
import { UserRole } from '../common/enum/role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { GetUserListDto } from '../dto/user/get-user-list.dto';
import { GetRoleDto } from '../dto/user/get-role.dto';
import { UpdateUserStatusDto } from '../dto/user/update-status-user.dto';
import { UpdateUserRoleDto } from '../dto/user/update-role-user.dto';

export interface FileObject extends File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 图片上传接口
   * @param file 文件对象
   * @returns
   */
  @Post('upload')
  @FileTypeDecorator()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: File) {
    return {
      code: 200,
      message: '上传成功',
      data: {
        url: `/${(file as FileObject).filename}`,
      },
    };
  }

  /**
   * 更新用户信息接口
   * @param user_id 用户id
   * @param username 用户名
   * @param imgUrl 头像地址
   * @returns
   */
  @Put()
  async update(@Body() dto: UpdateUserDto) {
    const res = await this.userService.update(dto);
    if (res.affected > 0) {
      return {
        code: 200,
        message: '更新成功',
        data: null,
      };
    } else {
      throw new HttpException('更新失败', 400);
    }
  }

  /**
   * 获取用户列表
   * @param page 页码
   * @param size 每页数量
   * @returns
   */
  @Get('list')
  @Role(UserRole.ADMIN) // 添加注解信息
  @UseGuards(RolesGuard)
  async findUsers(
    @Request() req: Request & { user: { userId: string; phone: string } },
    @Query() dto: GetUserListDto,
  ) {
    const { userId } = req.user;
    if (userId) {
      const { result, total } = await this.userService.findUsers(userId, dto);
      return {
        code: 200,
        message: '获取用户列表成功',
        data: result,
        total,
      };
    } else {
      throw new HttpException('无权限', 400);
    }
  }

  /**
   * 获取角色信息
   * @param user_id 用户id
   * @returns
   */
  @Get('/role')
  async getRole(@Query() dto: GetRoleDto) {
    const result = await this.userService.getRole(dto);
    if (result) {
      return {
        code: 200,
        message: '获取角色信息成功',
        data: result,
      };
    } else {
      throw new HttpException('获取角色信息失败', 400);
    }
  }

  /**
   * 账号是否被禁用
   * @param user_id 用户id
   * @param other_uid 当前被修改的用户id
   * @param is_status 状态
   * @returns
   */
  @Put('status')
  @Role(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async updateStatus(@Body() dto: UpdateUserStatusDto) {
    const res = await this.userService.updateStatus(dto);
    if (res.affected > 0) {
      return {
        code: 200,
        message: '更新成功',
        data: null,
      };
    } else {
      throw new HttpException('更新失败', 400);
    }
  }

  /**
   * 账号更新角色
   * @param user_id 用户id
   * @param other_uid 当前被修改的用户id
   * @param role 角色
   * @returns
   */
  @Put('role')
  @Role(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async updateRole(@Body() dto: UpdateUserRoleDto) {
    const res = await this.userService.updateRole(dto);
    if (res.affected > 0) {
      return {
        code: 200,
        message: '更新成功',
        data: null,
      };
    } else {
      throw new HttpException('更新失败', 400);
    }
  }
}
