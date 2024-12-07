import { IsBoolean } from 'class-validator';

export class SignDto {
  @IsBoolean()
  isSigned: boolean;
}
