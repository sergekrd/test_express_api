import { UserLoginInputDto } from '../dto/user.login.dto';
import { UserRegisterInputDto } from '../dto/user.register.dto';
import { validateDto } from '../commons/utils/validate.dto';
import { UsersService } from '../services/user.service';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../commons/utils/send.response';

const userService = new UsersService();
// Регистрация пользователя
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = await validateDto(UserRegisterInputDto, req, res)
    const responseData = await userService.registerUser(dto)
    return sendResponse(res, responseData)
  } catch (error) {
    return next(error);
  }


};

// Авторизация пользователя
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = new UserLoginInputDto(req.body);
    const responseData = await userService.loginUser(dto)
    return sendResponse(res, responseData)
  } catch (error) {
    return next(error);
  }
};
