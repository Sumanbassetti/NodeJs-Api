import { StatusCodes } from "http-status-codes";

//For Base Error
export class Base extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

//For NotFound Error
export class NotFoundError extends Base {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

//For Unautorized error
export class UnAuthorizedError extends Base {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

//For Bad Reuest Error
export class BadRequestError extends Base {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

//For Forbidden Error
export class ForbiddenError extends Base {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

//For Internal Server Error 
export class InternalServerError extends Base {
  constructor(message: string) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
//For No Content Error
export class NoContentError extends Base {
  constructor(message: string) {
    super(message, StatusCodes.NO_CONTENT);
  }
}

//For Custome Error
export class CustomError {
  constructor(error: any, statusCode?: number) {
   if (error.name == "ValidationError") return new BadRequestError(error);
    else if (error.name == "CastError") return new NotFoundError(error);
    else if (error.code && error.code === 11000)
      return new BadRequestError(`Duplicate value entered for ${Object.keys(error.keyValue)} field!`);
    else if (error.name == "MongoError") return new InternalServerError(error);
    else if (error.name == "UnauthorizedError")
      return new UnAuthorizedError(error);
    else if (error.name == "ForbiddenError") return new ForbiddenError(error);
    else
      return new Base(
        error.message,
        statusCode || StatusCodes.INTERNAL_SERVER_ERROR
      );
  }
}
