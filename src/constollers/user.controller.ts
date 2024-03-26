import { UsersService } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

const userService = new UsersService();
// Регистрация пользователя
export const registerUser = (req: Request, res: Response) => {
  const { username, password, email } = req.body;

   if (!username || !password || !email) {
      return res.status(400).json({ message: 'Необходимо указать имя пользователя, пароль и адрес электронной почты' });
  }
return userService.registerUser
};

// Авторизация пользователя
export const loginUser = (req: Request, res: Response) => {
  const { password, email } = req.body;

   if (!password || !email) {
      return res.status(400).json({ message: 'Необходимо указать адрес электронной почты и пароль' });
  }
return userService.loginUser
};
