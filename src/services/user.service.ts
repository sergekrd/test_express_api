import { Hasher } from "@utils/hasher.utils";
import prisma from "@utils/prisma.client";
import jwt from "jsonwebtoken"

export class UsersService {
  public async registerUser(dto: any) {
    const { email, first_name, password } = dto
    const isUserExist = await this.isUserExist(email)
    if (isUserExist) return { status: "error", message: "Пользователь с данным адресом электронной почты уже зарегестрирован" }
    const user = await prisma.users.create({ data: { first_name, email, password: this.hasher.hashSync(password) } })
    return { status: "ok", message: "user_created", data: { user } };
  }
  public async loginUser(dto: any) {
    const { email, password } = dto
    const isUserExist = await this.isUserExist(email)
    if (!isUserExist) return { status: "error", message: "Пользователь с данным адресом электронной почты не зарегестрирован" }
    const user = await this.isUserExist(email)
    const isPasswordEqual = this.hasher.comparer(password, user.password)
    if (!isPasswordEqual) return { status: "error", message: "Неверный пароль" }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400 // expires in 24 hours
    });
    return { status: "ok", message: "Пользователь авторизован", data: { token } };
  }

  private async isUserExist(email: string) {
    return prisma.users.findUnique({ where: { email } })
  }

  private get hasher(): Hasher {
    return new Hasher();
  }
}
