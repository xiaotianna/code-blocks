import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule, WinstonModuleOptions, utilities } from 'nest-winston';
import { Console } from 'winston/lib/winston/transports';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const consoleTransPorts = new Console({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(), // 日志时间
    utilities.format.nestLike(),
  ),
});

const dailyTransPorts = new DailyRotateFile({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
  ),
  dirname: 'log',
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true, // 文件压缩
  maxSize: '20m',
  maxFiles: '15d', // 文件保存时间：15天
});

@Module({
  imports: [
    // 异步导入
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          transports: [consoleTransPorts, dailyTransPorts],
        } as WinstonModuleOptions;
      },
    }),
  ],
})
export class LogConfigModule {}
