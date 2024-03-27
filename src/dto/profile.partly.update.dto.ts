import { enum_gender } from "@prisma/client";
import { IsBase64, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class ProfilePartlyUpdateDto {
  @IsOptional({ message: 'Имя пользователя' })
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  public readonly first_name: string;

  @IsOptional({ message: 'Фамилия пользователя' })
  @IsString({ message: 'Фамилия должна быть строкой' })
  public readonly last_name: string;

  @IsOptional({ message: 'Адрес электронной почты' })
  @IsEmail({}, { message: 'Неверный формат адреса электронной почты' })
  public readonly email: string;

  @IsOptional({ message: 'Пол' })
  @IsEnum(enum_gender, { message: 'Неверное значение пола' })
  public readonly gender: string;

  @IsOptional({ message: 'Изображение в формате Base64' })
  @IsBase64({}, { message: 'Неверный формат изображения, передайте в Base64' })
  public readonly image_base64_string: string;

  constructor(body: any) {
    this.first_name = body?.first_name
    this.last_name = body?.last_name;
    this.email = body?.email;
    this.gender = body?.gender;
    this.image_base64_string = body?.image_base64_string;
  }
}
