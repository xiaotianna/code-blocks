import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { join } from 'path';
// 日志模块
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  // 将filtter配置成全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 配置全局拦截器
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 过滤掉没有被验证的属性
    }),
  );
  // 用winston的provider去替换nest的logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // 配置静态资源目录
  app.useStaticAssets(join(__dirname, '..', '/public/images'));
  app.useStaticAssets(join(__dirname, '..', '/public/upload/edit'));
  app.useStaticAssets(join(__dirname, '..', '/public/upload/user'));

  // 跨域
  app.use(cors());
  await app.listen(3000);
}
bootstrap();
