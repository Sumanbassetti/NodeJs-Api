import { compare, genSalt, hash } from "bcryptjs";
import environment from "../environments/env.config";
import { BadRequestError, UnAuthorizedError } from "./customError";

export default class Encryption {
  private _hashSalt: number = +environment.HASH_SALT;

  /** For hasing the password
   * @param {string} password The input password
   * @return {*}  The hash password
   * @memberof Encryption
   */
  async generateHash(password: string):Promise<string> {
    try {
      const salt: string = await genSalt(this._hashSalt);
      const hashPassword: string = await hash(password, salt);
      return hashPassword;
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  /** For validate the hashed password 
   * @param {string} [password] The input password
   * @param {string} [hashPassword] The Hashed or encrypted password
   * @return {*} If Matched then return true
   * @memberof Encryption
   */
  async validate(password: string, hashPassword: string):Promise<boolean> {
    let isMatch = false;
    try {
      if (password && hashPassword)
        isMatch = await compare(password, hashPassword);
      else throw new BadRequestError(`Enter value properly`);
      return isMatch;
    } catch (error: any) {
      throw new UnAuthorizedError(error.message);
    }
  }
}
