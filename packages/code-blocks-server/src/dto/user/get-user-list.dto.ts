import { IsNotEmpty } from 'class-validator';

export class GetUserListDto {
  @IsNotEmpty({ message: 'Page is required' })
  page: number;

  @IsNotEmpty({ message: 'Size is required' })
  size: number;
}
