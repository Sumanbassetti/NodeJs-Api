import JWT_Token from "../utils/JWT-token";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IAuthPaylod } from "../interface/IUser";
import userModel from "../app/models/user.model";

export async function isLogin(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not authorized' });
        //For verify the token
        const payload = await new JWT_Token().verifyToken(token) as IAuthPaylod;
        if (!payload) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
        // Check if user exists in the database
        const user = await userModel.findOne({_id:payload._id,isActive: true})
        if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User does not exist' });
        return next();
    } catch (error: any) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
    }
}