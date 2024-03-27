import { UserLoginInputDto } from "../dto/user.login.dto";
import { UserRegisterInputDto } from "../dto/user.register.dto";
import { Hasher } from "../commons/utils/hasher";
import prisma from "../commons/utils/prisma.client";
import jwt from "jsonwebtoken"
import { DataObject } from "../interfaces/response.data.object";
import { CustomError } from "../commons/errors/custom.error";
import { HTTP_STATUS } from "../commons/constants/statuses";
import { prepareProfileInfo } from "../commons/utils/profile.prepare";

export class UsersService {

  public async registerUser(dto: UserRegisterInputDto): Promise<DataObject> {
    try {
      const { email, first_name, password } = dto
      const isUserExist = await this.isUserExist(email)
      if (isUserExist) throw new CustomError(HTTP_STATUS.BAD_REQUEST, "Пользователь с данным адресом электронной почты уже зарегестрирован")
      const hashedPassword = this.hasher.hashSync(password)
      const user = await prisma.users.create({ data: { first_name, email, password: hashedPassword } })
      const output = prepareProfileInfo(user)
      return { status_code: 200, status: "ok", message: "user_created", data: { user: output } };
    } catch (error) {
      throw error
    }
  }


  public async loginUser(dto: UserLoginInputDto): Promise<DataObject> {
    try {
      const { email, password } = dto
      const isUserExist = await this.isUserExist(email)
      if (!isUserExist) throw new CustomError(HTTP_STATUS.BAD_REQUEST, "Пользователь с данным адресом электронной почты не зарегестрирован")
      const user = await this.isUserExist(email)
      const isPasswordEqual = this.hasher.comparer(password, user.password)
      if (!isPasswordEqual) throw new CustomError(HTTP_STATUS.BAD_REQUEST, "Неверный пароль")
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400
      });
      return { status_code: 200, status: "ok", message: "Пользователь авторизован", data: { token } };
    } catch (error) {
      throw error
    }
  }

  private async isUserExist(email: string) {
    return prisma.users.findUnique({ where: { email } })
  }

  private get hasher(): Hasher {
    return new Hasher();
  }
}
