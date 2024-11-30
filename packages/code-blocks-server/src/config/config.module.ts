import { Module } from '@nestjs/common';
// env
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
// joi 参数校验
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [() => dotenv.config({ path: `.env` })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('production', 'development')
          .default('development'),
        DB_TYPE: Joi.string().default('mysql'),
        DB_DATABASE: Joi.string().default('code-blocks-DB'),
        DB_HOST: Joi.string().required().default('localhost'),
        DB_PORT: Joi.number().required().default(3306),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
})
export class ENV_Config_Module {}
