import { Global, Logger, Module } from '@nestjs/common';
// 不同模块
import { AuthModule } from './modules/auth.module';
import { EditModule } from './modules/edit.module';
import { UserModule } from './modules/user.module';
import { TypeOrmConfigModule } from './config/typeorm.module';
import { LogConfigModule } from './config/log.module';
import { ENV_Config_Module } from './config/config.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Global()
@Module({
  imports: [
    ENV_Config_Module,
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User]),
    LogConfigModule,
    AuthModule,
    EditModule,
    UserModule,
  ],
  controllers: [],
  // 全局提供logger，从@nestjs/common进行导入。因为在main.ts中重构官方的logger实例
  providers: [Logger, JwtStrategy],
  exports: [Logger],
})
export class AppModule {}
