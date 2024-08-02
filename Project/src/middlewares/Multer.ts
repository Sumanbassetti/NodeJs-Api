import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { StatusCodes } from "http-status-codes";
import { Constants } from "../utils/metaData/Const";

const storage = multer.memoryStorage();

class MulterConfig {
  private config: multer.Multer;

  constructor() {
    //For multer configuration
    this.config = multer({
      storage: storage,
      limits: {
        fileSize: Constants.MaximumFileSize, //For the max file size
      },
      fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
        const fileType = Constants.UploadFileType;
        //Checking the file type
        if (!fileType.includes(file.mimetype))
          return cb(new Error(`${file.mimetype} File is not allowed!`), false);
        else return cb(null, true);
      },
    });
  }

  /**
   * Middleware to handle single file upload using multer.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The next middleware function in the Express stack.
   * @returns {void}
   */
  public upload = (req: Request, res: Response, next: NextFunction) => {
    this.config.single("file")(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: err.message });
      } else if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: err.message });
      }
      next();
    });
  };
}

export default MulterConfig;
