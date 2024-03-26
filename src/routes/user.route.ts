import express from 'express';
import { loginUser, registerUser } from '@constollers/user.controller';

const usersRouter = express.Router();

// Маршрут для регистрации нового пользователя
usersRouter.post('/users/register', registerUser);

// Маршрут для авторизации пользователя
usersRouter.post('/users/login', loginUser);

export default usersRouter;
