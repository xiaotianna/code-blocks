import { Module } from '@nestjs/common';
import { EditController } from '../controllers/edit.controller';
import { EditService } from '../services/edit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { EditPage } from '../entities/edit-page.entity';
import { User } from '../entities/user.entity';
import { EditPackage } from '../entities/edit-package.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EditPage, User, EditPackage]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../', '/public/upload/edit'),
        filename: (req, file, callback) => {
          const fileName = `${new Date().getTime() + extname(file.originalname)}`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [EditController],
  providers: [EditService],
})
export class EditModule {}
