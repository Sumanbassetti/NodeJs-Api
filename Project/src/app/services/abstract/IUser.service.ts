import { FilterQuery } from "mongoose";
import { ISignInResponse, ISignUpResponse, IUser, IUserSignIn } from "../../../interface/IUser";

export default abstract class IUserService{
    abstract userSignup(user:IUser,file?:Express.Multer.File):Promise<ISignUpResponse>
    abstract userSignIn(user:IUserSignIn):Promise<ISignInResponse>
    abstract findUser(filter: FilterQuery<IUser>):Promise<IUser>
    abstract getUserProfile(token:string):Promise<IUser>
    abstract editUserProfile(token:string,userData:IUser,file?:Express.Multer.File):Promise<IUser>
}