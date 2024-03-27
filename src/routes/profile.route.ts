import { errorHandler } from "../middleware/error.middleware";
import { getProfiles, getProfileById, updateFullProfile, updatePartlyProfile } from "../contollers/profile.controller";
import verifyToken from "../middleware/authenticate.middleware";
import express from "express";

const profileRouter = express.Router();

// Маршрут для редактирования пользователя полными данными
profileRouter.put('/profile/:id', verifyToken, updateFullProfile);

// Маршрут для частичного редактирования пользователя
profileRouter.patch('/profile/:id', verifyToken, updatePartlyProfile);

// Маршрут для получения данных пользователя по его id
profileRouter.get('/profile/:id', verifyToken, getProfileById);

// Маршрут для получения всех пользователей
profileRouter.get('/profile', verifyToken, getProfiles);

//Обработка ошибок
profileRouter.use(errorHandler);

export default profileRouter;
