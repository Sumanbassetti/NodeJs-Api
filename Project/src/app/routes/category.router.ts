import { IRouter, Router } from 'express';
import CategoryController from '../controller/category.controller';
const categoryRouter:IRouter=Router();

const categoryController:CategoryController=new CategoryController();
categoryRouter.route('/').get(categoryController.getAllCategories.bind(categoryController))
export default categoryRouter