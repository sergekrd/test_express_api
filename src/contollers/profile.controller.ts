import { ProfileGetInputDto } from '../dto/profile.get.dto';
import { validateDto } from '../utils/validate.dto';
import { ProfilesService } from '../services/profile.service';
import { Request, Response } from 'express';

const profilesService = new ProfilesService();

// Получение данных пользователя по его Id
export const getProfileWithId = async (req: Request, res: Response) => {
  const dto = await validateDto(ProfileGetInputDto, req, res)
  if (dto) {
    const responseData = await profilesService.getProfileWithId(dto)
    return res.status(responseData.status_code).json({
      status: responseData.status, message: responseData.message, ...(responseData.data) ? { data: responseData.data } : {}
    });
  }
};

// Получение списка пользователей (с пагинацией)
export const getProfiles =async  (req: Request, res: Response) => {
  const responseData=await profilesService.getProfiles(req.query)
  return res.status(responseData.status_code).json({
    status: responseData.status, message: responseData.message, ...(responseData.data) ? { data: responseData.data } : {}
  });

};
