import { UserData } from "../../interfaces/user.interface"
import { users } from "@prisma/client"
import { buildImageName } from "./image.url.builder"

export const prepareProfileInfo = (data: users): UserData => {
  return {
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    gender: data.gender,
    image_name: data.image_name ? buildImageName(data.image_name) : null,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}
