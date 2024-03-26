import { UserLoginInputDto } from '../dto/user.login.dto';
import { UserRegisterInputDto } from '../dto/user.register.dto';
import { validateDto } from '../utils/validate.dto';
import { UsersService } from '../services/user.service';
import { validate } from 'class-validator';
import { Request, Response } from 'express';

const userService = new UsersService();
// Регистрация пользователя
export const registerUser = async (req: Request, res: Response) => {
  const dto = await validateDto(UserRegisterInputDto, req, res)
  if (dto) {
    const user = await userService.registerUser(dto)
    return res.status(user.status_code).json({
      status: user.status, message: user.message, ...(user.data) ? { data: user.data } : {}
    });
  }
};

// Авторизация пользователя
export const loginUser = async (req: Request, res: Response) => {
   const dto = new UserLoginInputDto(req.body);
   if (dto) {
    const user = await userService.loginUser(dto)
    return res.status(user.status_code).json({
      status: user.status, message: user.message, ...(user.data) ? { data: user.data } : {}
    });
  }


};
