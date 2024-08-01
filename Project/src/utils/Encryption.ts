import { compare, genSalt, hash } from "bcryptjs";
import environment from "../environments/env.config";
import { BadRequestError, UnAuthorizedError } from "./customError";

export default class Encryption {
    private _hashSalt: number = +environment.HASH_SALT;

    async generateHash(password: string) {
        try {
            const salt: string = await genSalt(this._hashSalt);
            const hashPassword: string = await hash(password, salt);
            return hashPassword;
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }

    async validate(password?: string, hashPassword?: string) {
        let isMatch = false;
        try {
            if (password && hashPassword)
                isMatch = await compare(password, hashPassword);
            else
                throw new BadRequestError(`Enter value properly`)
            return isMatch;
        } catch (error: any) {
            throw new UnAuthorizedError(error.message);
        }
    }

    async checkPasswordPattern(password: string) {
        let isCorrect = false;
        try {
            isCorrect = environment.PASSWORD_PATTERN.test(password);
            return isCorrect;
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }
}