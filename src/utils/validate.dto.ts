import { validate } from "class-validator";
import { Request, Response } from 'express';

export async function validateDto(dtoClass: any, req: Request, res: Response): Promise<Response<any, Record<string, any>> | any> {
  const dto = new dtoClass(req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    const errorMessages = errors.map(error => Object.values(error.constraints));
    res.status(400).json({ errors: errorMessages });
  }
  else {
    return dto
  }

}
