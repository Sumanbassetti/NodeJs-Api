import { IAuthPaylod, ISignInResponse, ISignUpResponse, IUser, IUserSignIn } from "../../interface/IUser";
import userModel from "../../app/models/user.model";
import {
    BadRequestError,
    CustomError,
    ForbiddenError,
    NotFoundError,
    UnAuthorizedError,
} from "../../utils/customError";
import IUserService from "./abstract/IUser.service";
import JWT_Token from "../../utils/JWT-token";
import Encryption from "../../utils/Encryption";
import { FilterQuery } from "mongoose";

export default class UserService implements IUserService {
    private _tokenService: JWT_Token;
    private _bcryptService: Encryption;
    constructor() {
        this._tokenService = new JWT_Token();
        this._bcryptService = new Encryption();
    }
    async findUser(filter: FilterQuery<IUser>): Promise<IUser> {
        const user: IUser = (await userModel.findOne(filter)) as IUser;
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    }
   
    async createUser(user: IUser,file?:Express.Multer.File): Promise<IUser> {
        if (user && user.password) {
            user.password = await this._bcryptService.generateHash(user.password);
        }
        if(file){
            user.profilePicture = file.filename;
        }
        const newUser = await userModel.create(user);
        if (!newUser) {
            throw new ForbiddenError("User Creation Failed");
        }
        return newUser;
    }

    async updateUser(filter:FilterQuery<IUser>, userData: IUser,file?:Express.Multer.File): Promise<IUser> {
        if(file){
            userData.profilePicture = file.filename;
        }
        const user:IUser= await userModel.findOneAndUpdate(filter,userData,{new:true}) as IUser
        if (!user) {
            throw new ForbiddenError("User Updation Failed");
        }
        return user;
    }

    async userSignup(customer: IUser,file?:Express.Multer.File): Promise<ISignUpResponse> {
        const response: ISignUpResponse = {} as ISignUpResponse;
        response.user = await this.createUser(customer,file);
        response.token = await this._tokenService.createToken({
            _id: response.user._id,
        });
        return response;
    }

    async userSignIn(user: IUserSignIn): Promise<ISignInResponse> {
        const responseUser: ISignInResponse = {} as ISignInResponse;
        if (!user.email && !user.password)
            throw new BadRequestError(`Enter all credentials!`);
        responseUser.user = await this.findUser({ email: user.email });
        if (responseUser.user.isActive == false)
            throw new ForbiddenError(`User is blocked!`);
        if (!await this._bcryptService.validate(user.password || "", responseUser.user.password))
            throw new UnAuthorizedError(`Wrong Password!`)
        responseUser.token = await this._tokenService.createToken({ _id: responseUser.user._id });
        return responseUser;
    }

    async getUserProfile(token: string): Promise<IUser> {
        let user: IUser={} as IUser;
        const loginToken=token.replace('Bearer ','')
        const payload:IAuthPaylod = await this._tokenService.verifyToken(loginToken) as IAuthPaylod;
        if(payload){
            user= await this.findUser({_id:payload._id})
        }
        return user;
    }

    async editUserProfile(token:string,userData:IUser,file?:Express.Multer.File): Promise<IUser> {
        const loginToken=token.replace('Bearer ','')
        const payload:IAuthPaylod = await this._tokenService.verifyToken(loginToken) as IAuthPaylod;
        let user:IUser={} as IUser
        if(payload){
            user= await this.updateUser({_id:payload._id},userData,file) as IUser
        }
       return user;
    }
}
