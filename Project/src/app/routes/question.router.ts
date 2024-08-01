import { IRouter, Router } from 'express';
import QuestionController from '../controller/question.controller';
const questionRouter:IRouter=Router();

const questionController:QuestionController=new QuestionController();
questionRouter.route('/').post(questionController.importBulkQuestions.bind(questionController))
questionRouter.route('/').get(questionController.getQuestions.bind(questionController))
export default questionRouter