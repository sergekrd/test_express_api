import { validateDto } from '../commons/utils/validate.dto';
import { ProfilesService } from '../services/profile.service';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../commons/utils/send.response';
import { ProfileFullUpdateDto } from '../dto/profile.full.update.dto';
import { ProfilePartlyUpdateDto } from '../dto/profile.partly.update.dto';

const profilesService = new ProfilesService();

// Получение данных пользователя по его Id
export const getProfileById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const responseData = await profilesService.getProfileById(id)
    return sendResponse(res, responseData)
  } catch (error) {
    return next(error);
  }
};

// Получение списка пользователей (с пагинацией)
export const getProfiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const responseData = await profilesService.getProfiles(req.query)
    return sendResponse(res, responseData)
  } catch (error) {
    return next(error);
  }
};

// Полное изменение данных пользователя (PUT)
export const updateFullProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const dto = await validateDto(ProfileFullUpdateDto, req, res)
    const responseData = await profilesService.updateProfile(id, dto)
    return sendResponse(res, responseData)
  } catch (error) {
    return next(error);
  }
};

// Частичное изменение данных пользователя (PATCH)
export const updatePartlyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const dto = await validateDto(ProfilePartlyUpdateDto, req, res)
    const responseData = await profilesService.updateProfile(id, dto)
    return sendResponse(res, responseData)
  } catch (error) {
    return next(error);
  }
}




