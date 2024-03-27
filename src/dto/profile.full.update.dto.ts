import { enum_gender } from "@prisma/client";
import { IsBase64, IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ProfileFullUpdateDto {
  @IsNotEmpty({ message: 'Имя пользователя обязательно к заполнению' })
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  public readonly first_name: string;

  @IsNotEmpty({ message: 'Фамилия пользователя обязательна к заполнению' })
  @IsString({ message: 'Фамилия должна быть строкой' })
  public readonly last_name: string;

  @IsNotEmpty({ message: 'Адрес электронной почты обязателен к заполнению' })
  @IsEmail({}, { message: 'Неверный формат адреса электронной почты' })
  public readonly email: string;

  @IsNotEmpty({ message: 'Пол обязателен к заполнению' })
  @IsEnum(enum_gender, { message: 'Неверное значение пола' })
  public readonly gender: string;

  @IsNotEmpty({ message: 'Изображение в формате Base64 обязательно к заполнению' })
  @IsBase64({}, { message: 'Неверный формат изображения, передайте в Base64' })
  public readonly image_base64_string: string;

  constructor(body: any) {
    this.first_name=body.first_name
    this.last_name = body.last_name;
    this.email = body.email;
    this.gender = body.gender;
    this.image_base64_string = body.image_base64_string;
  }
}
