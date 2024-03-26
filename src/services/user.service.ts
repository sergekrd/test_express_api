import { STATUS_CODES } from "http";
import { UserLoginInputDto } from "../dto/user.login.dto";
import { UserRegisterInputDto } from "../dto/user.register.dto";
import { Hasher } from "../utils/hasher.utils";
import prisma from "../utils/prisma.client";
import jwt from "jsonwebtoken"

export class UsersService {

  public async registerUser(dto: UserRegisterInputDto) {
    const { email, first_name, password } = dto
    const isUserExist = await this.isUserExist(email)
    if (isUserExist) return { status_code: 400, status: "error", message: "Пользователь с данным адресом электронной почты уже зарегестрирован" }
    const hashedPassword = this.hasher.hashSync(password)
    const user = await prisma.users.create({ data: { first_name, email, password: hashedPassword } })
    return { status_code: 200, status: "ok", message: "user_created", data: { user } };
  }

  public async loginUser(dto: UserLoginInputDto) {
    const { email, password } = dto
    const isUserExist = await this.isUserExist(email)
    if (!isUserExist) return {status_code: 400, status: "error", message: "Пользователь с данным адресом электронной почты не зарегестрирован" }
    const user = await this.isUserExist(email)
    const isPasswordEqual = this.hasher.comparer(password, user.password)
    if (!isPasswordEqual) return { status: "error", message: "Неверный пароль" }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400
    });
    return { status_code: 200, status: "ok", message: "Пользователь авторизован", data: { token } };
  }

  private async isUserExist(email: string) {
    return prisma.users.findUnique({ where: { email } })
  }

  private get hasher(): Hasher {
    return new Hasher();
  }
}
