import { ProfileGetInputDto } from "@dto/profile.get.dto";
import prisma from "../utils/prisma.client";


export class ProfilesService {
  private select = { id: true, first_name: true, last_name: true, email: true, image_url: true, createdAt: true, updatedAt: true }
  public async getProfileWithId(dto: ProfileGetInputDto) {
    const profile = await prisma.users.findUnique({ where: { id: dto.id }, select: this.select })
    if (!profile) return { status_code: 204, status: "ok", message: "Пользователь с данным id не найден" }
    else {
      return { status_code: 200, status: "ok", message: "Пользователь найден", data: { profile } };
    }
  }

  public async getProfiles(query: any) {
    let { page, limit, order_by, order_type } = query;
    page = page > 0 ? 1 : page
    limit = (limit || 10)
    limit = limit > 100 ? 100 : limit
    order_type = order_type === "desc" ? "desc" : "asc"
    const fields = Object.keys(prisma.users.fields);
    if (!fields.includes(order_by)) { order_by = "createdAt" }
    const skipped = (page - 1) * limit
    const users = await prisma.users.findMany({ skip: skipped, take: limit, orderBy: { [order_by]: order_type }, select: this.select })
    return { status_code: 200, status: "ok", message: `Пользователи найдены, skipped: ${skipped} записей, сортировка по ${order_by}, порядок сортировки: ${order_type === "asc" ? "Увеличение" : "Уменьшение"}`, data: { users } };
  }

}
