import { IsNotEmpty, IsUUID } from 'class-validator';

export class PackageListDto {
  @IsNotEmpty({ message: 'User id is required' })
  @IsUUID('4', { message: 'User id must be a valid UUID' })
  user_id: string;

  @IsNotEmpty({ message: 'Page is required' })
  page: number;

  @IsNotEmpty({ message: 'Size is required' })
  size: number;
}
