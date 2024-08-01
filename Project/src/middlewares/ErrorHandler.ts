import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default function errorHandler(req: Request, res: Response, err: any) {
    const customError: CustomError = {
        name: err.name,
        message: err.message || err || `Something went wrong!! Please try again later!`,
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    };
    return res.status(customError.statusCode).json({ message: customError.message });
}

export interface CustomError {
    name: string,
    message: string,
    statusCode: number
}