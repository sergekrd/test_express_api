import { IsUUID } from "class-validator";

export class ProfileGetInputDto {

  @IsUUID(4, { message: "Неправильный формат Id пользователя" })
  public readonly id: string;

  constructor(body: any) {
    this.id = body.id;
  }
}
