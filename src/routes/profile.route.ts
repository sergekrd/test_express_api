import express from "express";

const profileRouter = express.Router();

// Маршрут для редактирования пользователя
profileRouter.put('/profile/:id', authenticate, editUser);

// Маршрут для получения всех пользователей
profileRouter.get('/users', getUsers);
