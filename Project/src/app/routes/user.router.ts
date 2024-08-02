import { IRouter, Router } from 'express';
import UserController from "../controller/user.controller";
import asyncWrapper from '../../middlewares/AsyncWrapper';
import { isLogin } from '../../middlewares/AuthValidator';
import MulterConfig from '../../middlewares/Multer';
const userRouter:IRouter=Router();

const userController:UserController=new UserController();
const multerHanlder:MulterConfig=new MulterConfig();
//For sign up a new user
userRouter.route('/signup').post(multerHanlder.upload,asyncWrapper(userController.userSignup.bind(userController)))
// For singin an existing user
userRouter.route('/signin').post(asyncWrapper(userController.userSignIn.bind(userController)))
// Get the profile using the login token
userRouter.route('/profile').get(isLogin,asyncWrapper(userController.getUserProfile.bind(userController)))
//Update profile using the login token
userRouter.route('/edit-profile').patch(isLogin,multerHanlder.upload,asyncWrapper(userController.updateUserProfile.bind(userController)))
export default userRouter