import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class FileTypeFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 500;

    // 记录错误日志
    const errMsg = `${request.method}: ${request.url}，错误信息：${exception.message}`;
    this.logger.error(errMsg);

    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: '请上传图片文件',
    });
  }
}
