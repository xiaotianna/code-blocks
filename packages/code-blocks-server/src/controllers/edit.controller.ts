import {
  Body,
  Controller,
  Delete,
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
import {
  CopyDto,
  DeleteDto,
  PageListDto,
  PageReleaseDto,
  PageSearchDto,
  PageUpdateDto,
  PreviewDto,
} from '../dto/editor/page.dto';
import { TypeOrmDecorator } from '../decorators/typeorm.decorator';
import {
  PackageSaveDto,
  PackageUpdateSaveDto,
} from '../dto/editor/package.dto';
import { PackageListDto } from '../dto/editor/package.dto';
import { PackageListParamsPipe } from '../pipes/package-list.pipe';
import { JwtGuard } from '../guards/jwt.guard';
import { PageSearchParamsPipe } from '../pipes/page-search.pipe';

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
   * 获取套件列表接口
   * @param params user_id 用户id
   * @param page 页码
   * @param size 每页数量
   * @returns
   */
  @Get('/package/list')
  async packageList(@Query(new PackageListParamsPipe()) dto: PackageListDto) {
    const { result, total } = await this.editService.packageList(dto);
    return {
      code: 200,
      message: '获取成功',
      data: result,
      total,
    };
  }

  /**
   * 获取页面列表接口
   * @param params user_id 用户id
   * @param page 页码
   * @param size 每页数量
   * @returns
   */
  @Get('/page/list')
  async pageList(@Query(new PackageListParamsPipe()) dto: PageListDto) {
    const { result, total } = await this.editService.pageList(dto);
    return {
      code: 200,
      message: '获取成功',
      data: result,
      total,
    };
  }

  /**
   * 预览页面接口
   * @param id 页面id
   * @param user_id 用户id
   * @returns
   */
  @Get('/page/preview')
  async pagePreview(@Query() dto: PreviewDto) {
    const res = await this.editService.pagePreview(dto);
    return {
      code: 200,
      message: '获取成功',
      data: res,
    };
  }

  /**
   * 预览套件接口
   * @param id 套件id
   * @param user_id 用户id
   * @returns
   */
  @Get('/package/preview')
  async packagePreview(@Query() dto: PreviewDto) {
    const res = await this.editService.packagePreview(dto);
    return {
      code: 200,
      message: '获取成功',
      data: res,
    };
  }

  /**
   * 删除页面接口
   * @param id 页面id
   * @returns
   */
  @Delete('/page/delete')
  async pageDelete(@Body() dto: DeleteDto) {
    const res = await this.editService.pageDelete(dto);
    if (res.affected === 0) {
      throw new HttpException('删除失败', 400);
    } else if (res.affected > 0) {
      return {
        code: 200,
        message: '删除成功',
        data: null,
      };
    }
  }

  /**
   * 删除套件接口
   * @param id 页面id
   * @returns
   */
  @Delete('/package/delete')
  async packageDelete(@Body() dto: DeleteDto) {
    const res = await this.editService.packageDelete(dto);
    if (res.affected === 0) {
      throw new HttpException('删除失败', 400);
    } else if (res.affected > 0) {
      return {
        code: 200,
        message: '删除成功',
        data: null,
      };
    }
  }

  /**
   * 获取所有页面接口
   * @param keyword 搜索关键字(作者、作品名称)
   * @param page 页码
   * @param size 每页数量
   * @returns
   */
  @Get('/search')
  async pageSearch(
    @Query(new PageSearchParamsPipe()) dto: PageSearchDto,
    @Query('keyword') keyword?: string,
  ) {
    const { result, total } = await this.editService.pageSearch(dto, keyword);
    return {
      code: 200,
      message: '获取成功',
      data: result,
      total,
    };
  }

  /**
   * 复制页面接口
   * @param id 页面id
   * @param user_id 用户id
   * @returns
   */
  @Post('/copy')
  async pageCopy(@Body() dto: CopyDto) {
    const res = await this.editService.pageCopy(dto);
    if (res) {
      return {
        code: 200,
        message: '复制成功',
        data: null,
      };
    } else {
      throw new HttpException('复制失败', 400);
    }
  }
}
