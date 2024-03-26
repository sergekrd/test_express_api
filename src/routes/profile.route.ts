import { getProfiles, getProfileWithId } from "../contollers/profile.controller";
import verifyToken from "../middleware/authenticate";
import express from "express";

const profileRouter = express.Router();

// Маршрут для редактирования пользователя
profileRouter.put('/profile/:id', verifyToken, getProfileWithId);

// Маршрут для получения всех пользователей
profileRouter.get('/profile',verifyToken, getProfiles);

export default profileRouter;
