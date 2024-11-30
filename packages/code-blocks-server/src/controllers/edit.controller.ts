import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'node:buffer';
import { FileTypeDecorator } from '../decorators/file-type.decorator';
import { EditService } from '../services/edit.service';
import { PageReleaseDto, PageUpdateDto } from '../dto/editor/page.dto';
import { TypeOrmDecorator } from '../decorators/typeorm.decorator';
import {
  PackageSaveDto,
  PackageUpdateSaveDto,
} from '../dto/editor/package.dto';
import { PackageListDto } from '../dto/editor/package-list.dto';
import { PackageListParamsPipe } from '../pipes/package-list.pipe';
import { JwtGuard } from '../guards/jwt.guard';

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

@Controller('edit')
@TypeOrmDecorator()
@UseGuards(JwtGuard)
export class EditController {
  constructor(private readonly editService: EditService) {}

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
   * 页面发布接口
   * @param name 标题
   * @param content json内容
   * @param user_id 用户id
   * @returns
   */
  @Post('page')
  async pageRelease(@Body() dto: PageReleaseDto) {
    const res = await this.editService.pageRelease(dto);
    return {
      code: 200,
      message: '发布成功',
      data: res,
    };
  }

  /**
   * 页面更新接口
   * @param name 标题
   * @param content json内容
   * @param user_id 用户id
   * @param id 页面id
   * @returns
   */
  @Put('page')
  async pageUpdate(@Body() dto: PageUpdateDto) {
    const res = await this.editService.pageUpdate(dto);
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
   * 保存套件接口
   * @param name 标题
   * @param content json内容
   * @param user_id 用户id
   * @returns
   */
  @Post('package')
  async packageSave(@Body() dto: PackageSaveDto) {
    const res = await this.editService.packageSave(dto);
    return {
      code: 200,
      message: '保存成功',
      data: res,
    };
  }

  /**
   * 套件更新接口
   * @param name 标题
   * @param content json内容
   * @param user_id 用户id
   * @param id 套件id
   * @returns
   */
  @Put('package')
  async packageUpdate(@Body() dto: PackageUpdateSaveDto) {
    const res = await this.editService.packageUpdate(dto);
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
   * 获取套件列表
   */
  @Get('/package/list')
  async packageList(@Query(new PackageListParamsPipe()) dto: PackageListDto) {
    const res = await this.editService.packageList(dto);
    return {
      code: 200,
      message: '获取成功',
      data: res,
    };
  }
}
