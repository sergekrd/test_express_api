import { HTTP_STATUS } from '../../commons/constants/statuses';
import { CustomError } from '../../commons/errors/custom.error';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

export class FileService {
  public saveImage(base64String: string, userId: string): string {

    try {
      const imageType = this.getMimeType(base64String)
      const buffer = this.base64ToBuffer(base64String)
      this.checkFileSize(buffer)
      const imageName = `${userId}.${imageType}`
      this.saveFile(buffer, imageName)
      return imageName
    } catch (error) { throw error }

  }

  private async saveFile(imageBuffer: Buffer, fileName: string) {
    try {
      const uploadsDirectory = path.join(process.cwd(), 'uploads');
      if (!existsSync(uploadsDirectory)) {
        mkdirSync(uploadsDirectory, { recursive: true });
      }
      const fullFilePath = path.join(uploadsDirectory, fileName);
      writeFileSync(fullFilePath, imageBuffer);
    } catch (error) {
      throw error;
    }
  }

  public base64ToBuffer(base64String: string): Buffer {
    return Buffer.from(base64String, 'base64');;
  }

  private checkFileSize(buffer: ArrayBuffer) {
    const limitInMb = 10
    const limitInBytes = limitInMb * 1024 * 1024
    const size = buffer.byteLength
    if (size > limitInBytes) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, "Размер файла не может превышать 10 МБ")
    }
  }

  private getMimeType(base64: string): string | undefined {
    const signatures: { [key: string]: string } = {
      iVBORw0KGgo: "image/png",
      "/9j/": "image/jpg",
    };
    for (const sign in signatures) {
      if (base64.startsWith(sign)) return signatures[sign].split("/")[1]
    };
    throw new CustomError(HTTP_STATUS.BAD_REQUEST, "Не верный формат файла")
  };

}
