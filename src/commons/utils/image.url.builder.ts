export const buildImageName = (image_name: string) => `http://${process.env.HOST}:${process.env.PORT}/uploads/${image_name}`
