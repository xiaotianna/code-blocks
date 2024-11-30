import { UseFilters } from '@nestjs/common';
import { FileTypeFilter } from '../filters/file-type.filter';

export function FileTypeDecorator() {
  return UseFilters(new FileTypeFilter());
}
