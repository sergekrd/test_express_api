import { IsNotEmpty, IsEmail, MinLength, Matches } from "class-validator";

export class UserRegisterInputDto {

  @IsNotEmpty({ message: 'Имя пользователя обязательно к заполнению' })
  public readonly first_name: string;

  @IsNotEmpty({ message: 'Адрес электронной почты обязателен к заполнению' })
  @IsEmail({}, { message: 'Неверный формат адреса электронной почты' })
  public readonly email: string;

  @IsNotEmpty({ message: 'Пароль обязателен к заполнению' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/, { message: 'Пароль должен содержать минимум одну большую букву и одну цифру' })
  public readonly password: string;

  constructor(body: any) {
    this.first_name = body?.first_name;
    this.email = body?.email;
    this.password = body?.password;
  }
}
