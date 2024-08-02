import { sign, verify } from "jsonwebtoken";
import environment from "../environments/env.config";
import { BadRequestError, ForbiddenError } from "./customError";

export default class JWT_Token {
  private _tokenKey: string = environment.SECRET_KEY;
  private _tokenLife: number = environment.JWT_LIFE;

  /** For creating the jwt token
   * @param {*} data For payload data
   * @return {*} The created token
   * @memberof JWT_Token
   */
  async createToken(data: any):Promise<string> {
    try {
      const token = sign(data, this._tokenKey, {
        expiresIn: this._tokenLife,
      });
      return token;
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  /** For Verify Token
   * @param {string} token Requested Token
   * @return {*} If verified true return payload 
   * @memberof JWT_Token
   */
  async verifyToken<T>(token: string): Promise<T> {
    let payload: T;
    try {
      payload = verify(token, this._tokenKey) as T;
      return payload;
    } catch (error: any) {
      throw new ForbiddenError(error.message);
    }
  }
}
