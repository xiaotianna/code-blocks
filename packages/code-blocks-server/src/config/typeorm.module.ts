import { Module } from '@nestjs/common';
// typeorm
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// env
import { ConfigModule, ConfigService } from '@nestjs/config';
// 常量
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_TYPE,
  DB_USERNAME,
} from '../common/constant/env';
// typeorm 实体
import { User } from '../entities/user.entity';
import { EditPage } from '../entities/edit-page.entity';
import { EditPackage } from '../entities/edit-package.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get(DB_TYPE),
          host: configService.get(DB_HOST),
          port: configService.get(DB_PORT),
          username: configService.get(DB_USERNAME),
          password: configService.get(DB_PASSWORD),
          database: configService.get(DB_DATABASE),
          entities: [User, EditPage, EditPackage],
          // synchronize: configService.get(TYPEORM_synchronize), // 初始化时要为true，不然会创建不了表
          synchronize: false, // 初始化时要为true，不然会创建不了表
          logging: ['log'],
        }) as TypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
