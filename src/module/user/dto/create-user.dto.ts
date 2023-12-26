export class CreateUserDto {
  readonly name: string;
  readonly birthday: string;
  readonly gender: string;
  readonly height: number;
  readonly weight: number;

  readonly interests: string[];
}
