
import { DataObject } from '../../interfaces/response.data.object';
import { Response } from 'express';

export default function sendResponse(res: Response, dataObject: DataObject) {
  return res.status(dataObject.status_code).json({
    status: dataObject.status, message: dataObject.message, ...(dataObject.data) ? { data: dataObject.data } : {}
  });
}

