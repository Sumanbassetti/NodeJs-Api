import path from "path";
import fs from "fs";
import { BadRequestError } from "./customError";
import { Constants } from "./metaData/Const";

export const uploadFile = async (
  file: Express.Multer.File
): Promise<string> => {
  if (!file) {
    throw new BadRequestError("Provide proper details");
  }
  const uploadDir = Constants.UploadFilePath;
  const filePath = path.join(
    uploadDir,
    path.basename(file.originalname, path.extname(file.originalname)) +
      "_" +
      Date.now() +
      path.extname(file.originalname)
  );

  // Check if the uploads directory exists, create if not
  if (!fs.existsSync(uploadDir)) {
    await fs.promises.mkdir(uploadDir, { recursive: true });
  }
  // Write file to the uploads directory
  await fs.promises.writeFile(filePath, file.buffer);
  return filePath;
};
