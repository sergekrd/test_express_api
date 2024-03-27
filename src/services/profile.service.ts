
import { FileService } from "../commons/image/image";
import prisma from "../commons/utils/prisma.client";
import { DataObject } from "../interfaces/response.data.object";
import { ProfileFullUpdateDto } from "../dto/profile.full.update.dto";
import { ProfilePartlyUpdateDto } from "../dto/profile.partly.update.dto";
import { Prisma, users } from "@prisma/client";
import { CustomError } from "../commons/errors/custom.error";
import { HTTP_STATUS } from "../commons/constants/statuses";
import { prepareProfileInfo } from "../commons/utils/profile.prepare";


export class ProfilesService {

  private fileService = new FileService

  public async getProfileById(id: string): Promise<DataObject> {
    try {
      const profile = await prisma.users.findUnique({ where: { id } })
      if (!profile) throw new CustomError(HTTP_STATUS.EMPTY_RESPONSE, "Пользователь с данным id не найден", { id })
      const output = prepareProfileInfo(profile)
      return { status_code: 200, status: "ok", message: "Пользователь найден", data: { profile:output } };
    } catch (error) {
      throw error
    }

  }

  public async getProfiles(query: any): Promise<DataObject> {
    try {
      let { page, limit, order_by, order_type } = query;
      page = Number(page) > 0 ? 1 : Number(page)
      limit = (Number(limit) || 10)
      limit = limit > 100 ? 100 : limit
      order_type = order_type === "desc" ? "desc" : "asc"
      const fields = Object.keys(prisma.users.fields);
      if (!fields.includes(order_by)) { order_by = "createdAt" }
      const skipped = (page - 1) * limit
      const users = await prisma.users.findMany({ skip: skipped, take: limit, orderBy: { [order_by]: order_type } })
      const output = users.map(user => prepareProfileInfo(user))
      return { status_code: 200, status: "ok", message: `Пользователи найдены, skipped: ${skipped} записей, сортировка по ${order_by}, порядок сортировки: ${order_type === "asc" ? "Увеличение" : "Уменьшение"}`, data: {profiles: output } };
    } catch (error) {
      throw error
    }

  }


  public async updateProfile(id: string, dto: ProfilePartlyUpdateDto | ProfileFullUpdateDto): Promise<DataObject> {
    try {
      const profile = await prisma.users.findUnique({ where: { id } })
      if (!profile) throw new CustomError(HTTP_STATUS.BAD_REQUEST, "Пользователь с данным id не найден",{id})

      const data = JSON.parse(JSON.stringify(dto))
      if (data.image_base64_string) {
        const imageName = await this.fileService.saveImage(data.image_base64_string, id)
        delete data.image_base64_string
        data.image_name = imageName
      }

      const newProfile = await prisma.users.update({ where: { id }, data: data as Prisma.usersUpdateInput })
      const output = prepareProfileInfo(newProfile)
      return { status_code: 200, status: "ok", message: "Пользователь изменен", data: { profile:output } };
    }
    catch (error: any) {
      throw error
    }
  }

  public async updatePartlyProfile(id: string, dto: ProfilePartlyUpdateDto): Promise<DataObject> {
    try {
      const profile = await prisma.users.findUnique({ where: { id } })
      if (!profile) throw new CustomError(HTTP_STATUS.BAD_REQUEST, "Пользователь с данным id не найден",{id})
      const data = JSON.parse(JSON.stringify(dto))
      if (data.image_base64_string) {
        const imageName = await this.fileService.saveImage(data.image_base64_string, id)
        delete data.image_base64_string
        data.image_name = imageName
      }
      const newProfile = await prisma.users.update({ where: { id }, data: data as Prisma.usersUpdateInput })
      const output = prepareProfileInfo(newProfile)
      return { status_code: 200, status: "ok", message: "Пользователь изменен", data: { profile:output } };
    } catch (error) {
      throw error
    }
  }

}
