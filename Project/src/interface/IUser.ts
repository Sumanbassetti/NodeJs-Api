import { Gender } from "../utils/metaData/utilsEnum";
import { IBase } from "./ICommon";

export interface IUser extends IBase{
    name:string;
    email:string;
    password:string;
    phoneNumber:number;
    address: string;
    gender:Gender
    dob:Date;
    profilePicture:string;
    isActive:boolean;
}

export interface ISignUpResponse {
    user: IUser;
    token?: string
}

export interface ISignInResponse extends ISignUpResponse{
}

export interface IUserSignIn{
    email:string;
    password:string
}

export interface IAuthPaylod{
    _id:string;
    email:string;
}