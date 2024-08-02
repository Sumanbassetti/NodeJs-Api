import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * A middleware function to handle errors and send appropriate responses to the client.
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object used to send the response to the client.
 * @param {any} err - The error object containing details about the error that occurred.
 * @returns {Response} - The response object with the error message and status code.
 */
export default function errorHandler(req: Request, res: Response, err: any) {
  const customError: CustomError = {
    name: err.name,
    message:
      err.message || err || `Something went wrong!! Please try again later!`,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
}

export interface CustomError {
  name: string;
  message: string;
  statusCode: number;
}
