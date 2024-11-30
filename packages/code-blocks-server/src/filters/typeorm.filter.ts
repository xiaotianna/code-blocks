import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let code = 500;
    if (exception instanceof QueryFailedError) {
      code = exception.driverError.errno;
      // 记录错误日志
      const errMsg = `错误信息：${exception.message}\nsql: ${exception.driverError.sql}`;
      this.logger.error(errMsg);
    }

    response.status(500).json({
      code,
      message: 'typeorm error: ' + exception.message,
      data: null,
    });
  }
}
