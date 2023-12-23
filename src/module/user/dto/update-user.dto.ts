import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly displayName: string;

  readonly gender: string;
  readonly birthday: Date;

  readonly height: number;
  readonly weight: number;
  readonly interests: [string];
}
