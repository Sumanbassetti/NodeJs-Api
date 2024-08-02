import { IRouter, Router } from 'express';
import QuestionController from '../controller/question.controller';
import asyncWrapper from '../../middlewares/AsyncWrapper';
import MulterConfig from '../../middlewares/Multer';
import { isLogin } from '../../middlewares/AuthValidator';
const questionRouter:IRouter=Router();

const questionController:QuestionController=new QuestionController();
//Multer middleware 
const multerHanlder:MulterConfig=new MulterConfig();
//For importing bulk questions
questionRouter.route('/').post(isLogin,multerHanlder.upload,asyncWrapper(questionController.importBulkQuestions.bind(questionController)))
//For fetch list of questions
questionRouter.route('/').get(isLogin,asyncWrapper(questionController.getQuestions.bind(questionController)))
export default questionRouter