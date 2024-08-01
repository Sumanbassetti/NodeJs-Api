import { ICategory } from "../../interface/ICategory";

export default abstract class ICategoryService{
    abstract getAllCategories():Promise<ICategory[]>
}