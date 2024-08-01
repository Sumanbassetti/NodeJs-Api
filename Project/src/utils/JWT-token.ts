import { sign, verify } from "jsonwebtoken";
import environment from "../environments/env.config";
import { BadRequestError, ForbiddenError } from "./customError";


export default class JWT_Token {
    private _tokenKey: string = environment.SECRET_KEY;
    private _tokenLife: number = environment.JWT_LIFE;

    async createToken(data: any) {        
        try {
            const token =sign(data, this._tokenKey, {
                expiresIn: this._tokenLife,
            });
            return token;
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }

    async verifyToken(token: string) {
        let isVerified = {};
        try {
            isVerified =verify(token, this._tokenKey);
            return isVerified;
        } catch (error: any) {
            throw new ForbiddenError(error.message);
        }
    }
}