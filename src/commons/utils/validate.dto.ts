import { validate } from "class-validator";
import { Request, Response } from 'express';
import sendResponse from "./send.response";
import { HTTP_STATUS } from "../../commons/constants/statuses";
import { CustomError } from "../../commons/errors/custom.error";

export async function validateDto(dtoClass: any, req: Request, res: Response): Promise<Response<any, Record<string, any>> | any> {
  const dto = new dtoClass(req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    const errorMessages = errors.map(error => { return { [error.property]: Object.values(error.constraints) } })
    throw new CustomError(HTTP_STATUS.BAD_REQUEST, errorMessages, { body: req.body })
  }
  else {
    return dto
  }

}
