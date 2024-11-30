import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { EditPage } from '../entities/edit-page.entity';
import { User } from '../entities/user.entity';
import { PageReleaseDto, PageUpdateDto } from '../dto/editor/page.dto';
import {
  PackageSaveDto,
  PackageUpdateSaveDto,
} from '../dto/editor/package.dto';
import { EditPackage } from '../entities/edit-package.entity';
import { PackageListDto } from '../dto/editor/package-list.dto';

@Injectable()
export class EditService {
  constructor(
    @InjectRepository(EditPage) private editsRepository: Repository<EditPage>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(EditPackage)
    private packagesRepository: Repository<EditPackage>,
  ) {}

  async pageRelease(dto: PageReleaseDto): Promise<EditPage> {
    const { name, content, user_id } = dto;
    const edit = new EditPage();
    edit.name = name;
    edit.content = content;
    const user = await this.usersRepository.findOne({
      where: {
        id: user_id,
      },
      select: ['id'],
    });
    if (!user) {
      throw new HttpException('用户不存在', 404);
    }
    edit.user = user;
    const editTmp = this.editsRepository.create(edit);
    return this.editsRepository.save(editTmp);
  }

  async pageUpdate(dto: PageUpdateDto): Promise<UpdateResult> {
    const { id, name, content, user_id } = dto;
    const record = await this.editsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (record.user.id !== user_id) {
      throw new ForbiddenException('无权限');
    }
    const result = await this.editsRepository.update({ id }, { name, content });
    return result;
  }

  async packageSave(dto: PackageSaveDto): Promise<EditPackage> {
    const { name, content, user_id } = dto;
    const edit = new EditPackage();
    edit.name = name;
    edit.content = content;
    const user = await this.usersRepository.findOne({
      where: {
        id: user_id,
      },
      select: ['id'],
    });
    if (!user) {
      throw new HttpException('用户不存在', 404);
    }
    edit.user = user;
    const editTmp = this.packagesRepository.create(edit);
    return this.packagesRepository.save(editTmp);
  }

  async packageUpdate(dto: PackageUpdateSaveDto): Promise<UpdateResult> {
    const { id, name, content, user_id } = dto;
    const record = await this.packagesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (record.user.id !== user_id) {
      throw new ForbiddenException('无权限');
    }
    const result = await this.packagesRepository.update(
      { id },
      { name, content },
    );
    return result;
  }

  async packageList(dto: PackageListDto): Promise<EditPackage[]> {
    const { user_id, page, size } = dto;
    const skip = (page - 1) * size;
    const result = await this.packagesRepository.find({
      where: { user: { id: user_id } },
      skip,
      take: size,
      order: { update_time: 'DESC' },
    });
    return result;
  }
}
