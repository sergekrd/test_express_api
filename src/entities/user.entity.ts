import { enum_gender } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsEmail, IsEnum, MinLength, IsUUID, Matches } from 'class-validator';


export class UserDTO {
  @IsUUID()
  public readonly id?: string;

  @IsNotEmpty({ message: 'Имя пользователя обязательно к заполнению' })
  public readonly first_name: string;

  @IsOptional({ message: 'Фамилия пользователя' })
  public readonly last_name?: string;

  @IsNotEmpty({ message: 'Адрес электронной почты обязателен к заполнению' })
  @IsEmail({}, { message: 'Неверный формат адреса электронной почты' })
  public readonly email: string;

  @IsNotEmpty({ message: 'Пароль обязателен к заполнению' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/, { message: 'Пароль должен содержать минимум одну большую букву и одну цифру' })
  public readonly password: string;

  @IsOptional({ message: 'Пол' })
  @IsEnum(enum_gender, { message: 'Неверное значение пола' })
  public readonly gender?: string;

  @IsOptional({ message: 'Адрес изображения' })
  public readonly image_url?: string;

  @IsOptional({ message: 'Дата создания пользователя' })
  public readonly createdAt?: Date;

  @IsOptional({ message: 'Дата изменения пользователя' })
  public readonly updatedAt?: Date;
}
