import { ICategory, ICategoryWithQuestionDTO } from "../../../interface/ICategory";

export default abstract class ICategoryService {
  abstract createCategory(categoryData: ICategory): Promise<ICategory>;
  abstract getAllCategories(): Promise<ICategory[]>;
  abstract getAllQuestionByCategory():Promise<ICategoryWithQuestionDTO[]>
}
