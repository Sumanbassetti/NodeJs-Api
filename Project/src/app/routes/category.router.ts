import { IRouter, Router } from 'express';
import CategoryController from '../controller/category.controller';
import asyncWrapper from '../../middlewares/AsyncWrapper';
import { isLogin } from '../../middlewares/AuthValidator';
const categoryRouter:IRouter=Router();

const categoryController:CategoryController=new CategoryController();
// For creating a new category
categoryRouter.route('/').post(isLogin,asyncWrapper(categoryController.createCategory.bind(categoryController)))
// For fetching all categories
categoryRouter.route('/').get(isLogin,asyncWrapper(categoryController.getAllCategories.bind(categoryController)))
//For fetching all categories with questions
categoryRouter.route('/getquestionsbycategory').get(isLogin,asyncWrapper(categoryController.getAllQuestionsByCategory.bind(categoryController)))
export default categoryRouter