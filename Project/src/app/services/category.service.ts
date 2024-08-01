import { ICategory } from "../../interface/ICategory";
import ICategoryService from "./abstract/ICategory.service";

export default class CategoryService implements ICategoryService{
    getAllCategories(): Promise<ICategory[]> {
        throw new Error("Method not implemented.");
    }
}