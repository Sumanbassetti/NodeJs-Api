import { IRouter, Router } from 'express';
import UserController from "../controller/user.controller";
import asyncWrapper from '../../middlewares/AsyncWrapper';
import { isLogin } from '../../middlewares/AuthValidator';
import { upload } from '../../utils/FileUpload';
const userRouter:IRouter=Router();

const userController:UserController=new UserController();
userRouter.route('/signup').post(upload.single('profilePicture'),asyncWrapper(userController.userSignup.bind(userController)))
userRouter.route('/signin').post(asyncWrapper(userController.userSignIn.bind(userController)))
userRouter.route('/profile').get(isLogin,asyncWrapper(userController.getUserProfile.bind(userController)))
userRouter.route('/edit-profile').patch(isLogin,upload.single('profilePicture'),asyncWrapper(userController.updateUserProfile.bind(userController)))
export default userRouter