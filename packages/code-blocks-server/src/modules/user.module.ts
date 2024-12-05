import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../', '/public/upload/user'),
        filename: (req, file, callback) => {
          const fileName = `${new Date().getTime() + extname(file.originalname)}`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
