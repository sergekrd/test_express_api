import logger from '../commons/utils/logger';
import { CustomError } from '../commons/errors/custom.error';
import { Request, Response, NextFunction } from 'express';


export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {

  if (err instanceof CustomError) {
    err as CustomError
    logger.error( err.data, err.json_stack,)
    res.status(err.status_code).json({
      status: 'error',
      message: err.message
    });
  }
  else {
    logger.error(err.stack)
    res.status(500).json({
      status: 'error',
      message: 'Internal error'
    });
  }

}
