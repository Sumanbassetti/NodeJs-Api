import { ICategory, ICategoryWithQuestionDTO } from "../../interface/ICategory";
import { BadRequestError, ForbiddenError } from "../../utils/customError";
import catgoryModel from "../models/category.model";
import ICategoryService from "./abstract/ICategory.service";

export default class CategoryService implements ICategoryService {


  /**Creates a new category.
   * @param {ICategory} categoryData - The data for the new category.
   * @return {Promise<ICategory>} The created category.
   * @memberof CategoryService
   */
  async createCategory(categoryData: ICategory): Promise<ICategory> {
    if (Object.keys(categoryData).length == 0)
      throw new BadRequestError("Provide category details");
    const category: ICategory = await catgoryModel.create(categoryData);
    if (!category) throw new ForbiddenError("Category creation failed");
    return category;
  }

  /** Fetch All Categories
   * @return {*}  {Promise<ICategory[]>} The list of categories
   * @memberof CategoryService
   */
  async getAllCategories(): Promise<ICategory[]> {
    const categories: ICategory[] = (await catgoryModel.find({})) || [];
    return categories;
  }


  /** Fetch all categories with questions
   * @return {*}  {Promise<ICategoryWithQuestionDTO[]>} The list of categories with questions
   * @memberof CategoryService
   */
  async getAllQuestionByCategory(): Promise<ICategoryWithQuestionDTO[]> {
    const categories =
      (await catgoryModel.aggregate([
        {
          $lookup: {
            from: "questions",
            localField: "_id",
            foreignField: "categories",
            as: "questions",
          },
        },
      ])) || [];
    return categories;
  }
}
