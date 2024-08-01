import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes"
import ICategoryService from "../services/abstract/ICategory.service";
import CategoryService from "../services/category.service";
import { ICategory } from "../../interface/ICategory";
ICategoryService;
export default class CategoryController{
    private _categoryService: ICategoryService;
    constructor(){
        this._categoryService = new CategoryService();
    }
    async getAllCategories(request:Request, response:Response){
        try {
            const categories:ICategory[] = await this._categoryService.getAllCategories();
            response.status(StatusCodes.OK).json({data:categories});
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
        }
    }
}