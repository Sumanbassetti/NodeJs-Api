import { NextFunction, Request, Response } from "express";
import multer from "multer";
const { StatusCodes } = require("http-status-codes");
const storage = multer.memoryStorage();
export default class MulterConfig {
    private config: any;
    constructor(){
        this.config=multer({
            storage: storage,
            limits: {
                fileSize: 2 * 1000000
            },
            fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
                const fileType = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword", "image/png", "image/jpeg", "application/pdf"];
                if (!fileType.includes(file.mimetype))
                    return cb(new Error(`${file.mimetype} File is not allowed!`), false);
                else
                    return cb(null, true);
            },
        }).single("file");
    }
   

    public handler = async (req: Request, res: Response, next: NextFunction) => {
        await this.config(req, res, (err: any) => {
            if (err instanceof multer.MulterError)
                return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
            else if (err)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
            next();
        });
    }
}