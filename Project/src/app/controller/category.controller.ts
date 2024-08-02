import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ICategoryService from "../services/abstract/ICategory.service";
import CategoryService from "../services/category.service";
import { ICategory, ICategoryWithQuestionDTO } from "../../interface/ICategory";
import { asyncHandler } from "../../middlewares/AsyncWrapper";
ICategoryService;
export default class CategoryController {
  private _categoryService: ICategoryService;
  constructor() {
    this._categoryService = new CategoryService();
  }

  /**
   *
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof CategoryController
   */
  async createCategory(request: Request, response: Response) {
    const category: ICategory = await asyncHandler(
      this._categoryService.createCategory.bind(this._categoryService),
      [request.body]
    );
    response.status(StatusCodes.OK).send(category);
  }
  /**
   *
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof CategoryController
   */
  async getAllCategories(request: Request, response: Response) {
    const categories: ICategory[] = await asyncHandler(
      this._categoryService.getAllCategories.bind(this._categoryService),
      []
    );
    response
      .status(StatusCodes.OK)
      .json({ count: categories.length, category: categories });
  }
  /**
   *
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof CategoryController
   */
  async getAllQuestionsByCategory(request: Request, response: Response) {
    const categories: ICategoryWithQuestionDTO[] = await asyncHandler(
      this._categoryService.getAllQuestionByCategory.bind(
        this._categoryService
      ),
      []
    );
    response.status(StatusCodes.OK).send(categories);
  }
}
