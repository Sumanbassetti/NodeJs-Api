import { IAuthPaylod, ISignInResponse, ISignUpResponse, IUser, IUserSignIn } from "../../interface/IUser";
import userModel from "../../app/models/user.model";
import {
    BadRequestError,
    ForbiddenError,
    NotFoundError,
    UnAuthorizedError,
} from "../../utils/customError";
import IUserService from "./abstract/IUser.service";
import JWT_Token from "../../utils/JWT-token";
import Encryption from "../../utils/Encryption";
import { FilterQuery } from "mongoose";
import { uploadFile } from "../../utils/FileUpload";

export default class UserService implements IUserService {
    private _tokenService: JWT_Token;
    private _bcryptService: Encryption;
    constructor() {
        this._tokenService = new JWT_Token();
        this._bcryptService = new Encryption();
    }

    /** Find user according to the specific filter query
     * @param {FilterQuery<IUser>} filter filtering query
     * @return {*}  {Promise<IUser>} User object
     * @memberof UserService
     */
    async findUser(filter: FilterQuery<IUser>): Promise<IUser> {
        const user: IUser = (await userModel.findOne(filter)) as IUser;
        if (!user) throw new NotFoundError("User not found");
        return user;
    }

    /** For creating the new user 
     * @param {IUser} user The data for the new user.
     * @param {Express.Multer.File} [file] For the profile picture
     * @return {*}  {Promise<IUser>} The created user
     * @memberof UserService
     */
    async createUser(user: IUser, file?: Express.Multer.File): Promise<IUser> {
        if (user && user.password) user.password = await this._bcryptService.generateHash(user.password);
        if (file) {
            user.profilePicture = await uploadFile(file)
        }
        const newUser = await userModel.create(user);
        if (!newUser) {
            throw new ForbiddenError("User Creation Failed");
        }
        return newUser;
    }

    /** For update an existing user according to the specific query
     * @param {FilterQuery<IUser>} filter Filtering the existing user
     * @param {IUser} userData The user data for update
     * @param {Express.Multer.File} [file] The file to upload profile picture
     * @return {*}  {Promise<IUser>} The updated user object
     * @memberof UserService
     */
    async updateUser(filter: FilterQuery<IUser>, userData: IUser, file?: Express.Multer.File): Promise<IUser> {
        if (file) userData.profilePicture = await uploadFile(file)
        if (userData && userData.password) userData.password = await this._bcryptService.generateHash(userData.password);
        const user: IUser = await userModel.findOneAndUpdate(filter, userData, { new: true }) as IUser
        if (!user)  throw new ForbiddenError("User Updation Failed");
        return user;
    }


    /** For Signup a New User
     * @param {IUser} userData The user data for signup
     * @param {Express.Multer.File} [file] The file to upload profile picture
     * @return {*}  {Promise<ISignUpResponse>} User Data with Token
     * @memberof UserService
     */
    async userSignup(userData: IUser, file?: Express.Multer.File): Promise<ISignUpResponse> {
        const response: ISignUpResponse = {} as ISignUpResponse;
        response.user = await this.createUser(userData, file);
        response.token = await this._tokenService.createToken({
            _id: response.user._id,
        });
        return response;
    }


    /** For signin an existing user
     * @param {IUserSignIn} user User Credential for singin
     * @return {*}  {Promise<ISignInResponse>} User Data with Login Token
     * @memberof UserService
     */
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


    /** Fetch the user profile
     * @param {string} token Login token for identify the user
     * @return {*}  {Promise<IUser>} User profile data
     * @memberof UserService
     */
    async getUserProfile(token: string): Promise<IUser> {
        let user: IUser = {} as IUser;
        const loginToken = token.replace('Bearer ', '')
        const payload: IAuthPaylod = await this._tokenService.verifyToken(loginToken) as IAuthPaylod;
        if (payload) {
            user = await this.findUser({ _id: payload._id })
        }
        return user;
    }


    /** For updating the user profile
     * @param {string} token Login token for identify the user
     * @param {IUser} userData Updated data which want to be updated
     * @param {Express.Multer.File} [file] Profile picture to upload
     * @return {*}  {Promise<IUser>} The updated user object
     * @memberof UserService
     */
    async editUserProfile(token: string, userData: IUser, file?: Express.Multer.File): Promise<IUser> {
        const loginToken = token.replace('Bearer ', '')
        const payload: IAuthPaylod = await this._tokenService.verifyToken(loginToken) as IAuthPaylod;
        let user: IUser = {} as IUser
        if (payload) {
            user = await this.updateUser({ _id: payload._id }, userData, file) as IUser
        }
        return user;
    }
}
