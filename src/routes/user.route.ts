import express from 'express';
import { loginUser, registerUser } from '../contollers/user.controller';
import { errorHandler } from '../middleware/error.middleware';


const usersRouter = express.Router();

// Маршрут для регистрации нового пользователя
usersRouter.post('/users/register', registerUser);

// Маршрут для авторизации пользователя
usersRouter.post('/users/login', loginUser);

//Обработка ошибок
usersRouter.use(errorHandler);

export default usersRouter;
