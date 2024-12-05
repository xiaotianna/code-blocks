import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as Record<string, any>;
    // 如果NotFoundException传入内容，exception.message为传入的内容；如果NotFoundException未传入内容，则默认为HttpException信息
    const resMsg =
      (exceptionResponse.message instanceof Array &&
        exceptionResponse.message.join(', ')) ||
      exception.message ||
      HttpException.name;

    // 记录错误日志
    const errMsg = `${request.method}: ${request.url}，错误信息：${resMsg}`;
    this.logger.error(errMsg);

    response.status(200).json({
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: resMsg,
    });
  }
}
