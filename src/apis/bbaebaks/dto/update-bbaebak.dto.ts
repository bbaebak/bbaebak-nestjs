import { Type } from 'class-transformer';
import { IsArray, IsDate, IsString, ValidateNested } from 'class-validator';

export class UpdateDto {
  @IsString()
  maker: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  desc: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MateDto)
  mates: MateDto[];
}

export class MateDto {
  @IsString()
  name: string;
}
