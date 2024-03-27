import { enum_gender } from "@prisma/client";

export interface UserData {
  id?: string;
  first_name?: string;
  last_name?: string;
  password?: string,
  email?: string;
  gender?: enum_gender;
  image_name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
