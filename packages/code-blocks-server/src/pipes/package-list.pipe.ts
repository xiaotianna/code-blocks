import {
  ArgumentMetadata,
  Injectable,
  ParseIntPipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PackageListParamsPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { page, size, user_id } = value;
    const transformInt = {
      page: await new ParseIntPipe().transform(page, metadata),
      size: await new ParseIntPipe().transform(size, metadata),
    };
    return {
      ...transformInt,
      user_id,
    };
  }
}
