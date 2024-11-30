import { UseFilters } from '@nestjs/common';
import { TypeormFilter } from '../filters/typeorm.filter';

export function TypeOrmDecorator() {
  return UseFilters(new TypeormFilter());
}
