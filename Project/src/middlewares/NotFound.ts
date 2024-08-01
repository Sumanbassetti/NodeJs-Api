import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default function notFound(req: Request, res: Response) {
    const statusCode = StatusCodes.NOT_FOUND;
    const message = `${req.method} ${req.originalUrl} doesn't exist!`;
    res.status(statusCode).json({ message: message });
}