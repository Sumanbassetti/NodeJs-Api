import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ISignInResponse, ISignUpResponse, IUser } from "../../interface/IUser";
import IUserService from "../services/abstract/IUser.service";
import UserService from "../services/user.service";
import { asyncHandler } from "../../middlewares/AsyncWrapper";

export default class UserController {
  private _userService: IUserService;
  constructor() {
    this._userService = new UserService();
  }
  async userSignup(request: Request, response: Response) {
    const signupResponse: ISignUpResponse = await asyncHandler(
      this._userService.userSignup.bind(this._userService),
      [request.body, request.file]
    );
    response.status(StatusCodes.OK).send(signupResponse);
  }
  async userSignIn(request: Request, response: Response) {
    const singInResponse: ISignInResponse = await asyncHandler(
      this._userService.userSignIn.bind(this._userService),
      [request.body]
    );
    response.status(StatusCodes.OK).send(singInResponse);
  }

  async getUserProfile(request: Request, response: Response) {
    const userProfile: IUser = await asyncHandler(
      this._userService.getUserProfile.bind(this._userService),
      [request.header("Authorization")]
    );
    response.status(StatusCodes.OK).send(userProfile);
  }
  async updateUserProfile(request: Request, response: Response) {
    const userProfile: IUser = await asyncHandler(
      this._userService.editUserProfile.bind(this._userService),
      [request.header("Authorization"), request.body,request.file]
    );
    response.status(StatusCodes.ACCEPTED).send(userProfile);
  }
}
