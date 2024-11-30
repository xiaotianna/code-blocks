import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { EditPage } from '../entities/edit-page.entity';
import { EditPackage } from '../entities/edit-package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, EditPage, EditPackage])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
