import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { EditPage } from '../entities/edit-page.entity';
import { User } from '../entities/user.entity';
import {
  CopyDto,
  DeleteDto,
  PageListDto,
  PageReleaseDto,
  PageSearchDto,
  PageUpdateDto,
  PreviewDto,
} from '../dto/editor/page.dto';
import {
  PackageSaveDto,
  PackageUpdateSaveDto,
} from '../dto/editor/package.dto';
import { EditPackage } from '../entities/edit-package.entity';
import { PackageListDto } from '../dto/editor/package.dto';

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

  async packageList(
    dto: PackageListDto,
  ): Promise<{ result: EditPackage[]; total: number }> {
    const { user_id, page, size } = dto;
    const skip = (page - 1) * size;
    const result = await this.packagesRepository.find({
      where: { user: { id: user_id } },
      skip,
      take: size,
      order: { update_time: 'DESC' },
    });
    const total = await this.packagesRepository.count({
      where: { user: { id: user_id } },
    });
    return {
      result,
      total,
    };
  }

  async pageList(
    dto: PageListDto,
  ): Promise<{ result: EditPage[]; total: number }> {
    const { user_id, page, size } = dto;
    const skip = (page - 1) * size;
    const result = await this.editsRepository.find({
      where: { user: { id: user_id } },
      skip,
      take: size,
      order: { update_time: 'DESC' },
    });
    const total = await this.editsRepository.count({
      where: { user: { id: user_id } },
    });
    return {
      result,
      total,
    };
  }

  async pagePreview(dto: PreviewDto): Promise<EditPage> {
    const { id } = dto;
    const result = await this.editsRepository.findOne({
      where: { id },
    });
    return result;
  }

  async packagePreview(dto: PreviewDto): Promise<EditPackage> {
    const { id, user_id } = dto;
    const result = await this.packagesRepository.findOne({
      where: { id, user: { id: user_id } },
    });
    return result;
  }

  async pageDelete(dto: DeleteDto): Promise<DeleteResult> {
    const { id } = dto;
    const result = await this.editsRepository.delete(id);
    return result;
  }

  async packageDelete(dto: DeleteDto): Promise<DeleteResult> {
    const { id } = dto;
    const result = await this.packagesRepository.delete(id);
    return result;
  }

  async pageSearch(
    { page, size }: PageSearchDto = { page: 1, size: 12 },
    keyword?: string,
  ): Promise<{ result: EditPackage[]; total: number }> {
    if (!keyword) {
      const skip = (page - 1) * size;
      const result = await this.editsRepository.find({
        skip,
        take: size,
        order: { update_time: 'DESC' },
        relations: ['user'],
        select: {
          user: {
            id: true,
            username: true,
          },
        },
      });
      const total = await this.editsRepository.count();
      return {
        result,
        total,
      };
    } else {
      const skip = (page - 1) * size;
      const queryBuilder = this.editsRepository.createQueryBuilder('edit');
      queryBuilder.where('edit.name LIKE :keyword', {
        keyword: `%${keyword}%`,
      });
      const result = await queryBuilder
        .skip(skip)
        .take(size)
        .orderBy('edit.update_time', 'DESC')
        .leftJoinAndSelect('edit.user', 'user')
        .select([
          'edit.id',
          'edit.name',
          'edit.content',
          'edit.update_time',
          'user.id',
          'user.username',
        ])
        .getMany();
      const total = await queryBuilder.getCount();
      return {
        result,
        total,
      };
    }
  }

  async pageCopy(dto: CopyDto): Promise<Partial<EditPage>> {
    const { id, user_id } = dto;
    const record = await this.editsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    const user = await this.usersRepository.findOne({
      where: {
        id: user_id,
      },
    });
    const edit = new EditPage();
    edit.name = record.name;
    edit.content = record.content;
    edit.user = user;
    const editTmp = this.editsRepository.create(edit);
    return this.editsRepository.save(editTmp);
  }
}
