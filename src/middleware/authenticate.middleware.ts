import { HTTP_STATUS } from '../commons/constants/statuses';
import { CustomError } from '../commons/errors/custom.error';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'] as string;
  if (!authHeader) throw new CustomError(HTTP_STATUS.FORBIDDEN, 'Нет токена в заголовке авторизации');
  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    throw new CustomError(HTTP_STATUS.UNAUTHORIZED, 'Неверный формат токена')
  }
  const token = tokenParts[1];
  const secret = process.env.JWT_SECRET_KEY
  jwt.verify(token, secret, function (err: any, decoded: any) {
    if (err) throw new CustomError(HTTP_STATUS.SERVER_ERROR, 'Ошибка авторизации');
    (req as any).userId = decoded.id;
    next();
  });
}

export default verifyToken;
