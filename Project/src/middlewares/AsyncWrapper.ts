import { NextFunction, Request, Response } from "express";
import errorHandler from "./ErrorHandler";
import { CustomError } from "../utils/customError";
/**
 * A type validator for async wrapper middleware
 */
type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

type AsyncFncHandler = (...params: any) => Promise<any>;
/**
 * A middleware that handle all the asynchronous function
 * @param handler an asynchronous function
 * @returns the final result to the client
 */
export default function asyncWrapper(handler: AsyncHandler) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      errorHandler(req, res, error);
    }
  };
}

/**
 * A middleware function to handle asynchronous operations with centralized error handling.
 * @param {AsyncFncHandler} handler - The asynchronous function to be executed.
 * @param {any} args - The arguments to be passed to the asynchronous function.
 * @returns {Promise<any>} - The result of the asynchronous function execution.
 * @throws {CustomError} - Throws a custom error if the asynchronous function execution fails.
 */

export async function asyncHandler(
  handler: AsyncFncHandler,
  args: any
): Promise<any> {
  try {
    return await handler(...args);
  } catch (error: any) {
    throw new CustomError(error, error.statusCode);
  }
}
