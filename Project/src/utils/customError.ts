import { StatusCodes } from "http-status-codes";

export class Base extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends Base {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class UnAuthorizedError extends Base {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class BadRequestError extends Base {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class ForbiddenError extends Base {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

export class InternalServerError extends Base {
  constructor(message: string) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export class NoContentError extends Base {
  constructor(message: string) {
    super(message, StatusCodes.NO_CONTENT);
  }
}

export class CustomError {
  constructor(error: any, statusCode?: number) {
    if (error.name == "ValiddationError") return new BadRequestError(error);
    else if (error.name == "CastError") return new NotFoundError(error);
    else if (error.name == "ValidationError") return new BadRequestError(error);
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
