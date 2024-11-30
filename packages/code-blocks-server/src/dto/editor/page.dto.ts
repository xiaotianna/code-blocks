import { IsNotEmpty, IsObject, IsString, IsUUID } from 'class-validator';

export class PageReleaseDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Content is required' })
  @IsObject({ message: 'Content must be a valid JSON object' })
  content: object;

  @IsNotEmpty({ message: 'User id is required' })
  @IsUUID('4', { message: 'User id must be a valid UUID' })
  user_id: string;
}

export class PageUpdateDto extends PageReleaseDto {
  @IsNotEmpty({ message: 'Id is required' })
  @IsString({ message: 'Id must be a string' })
  id: string;
}
