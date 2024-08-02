import { IBase } from "./ICommon";
import { IQuestion } from "./IQuestion";

export interface ICategory extends IBase{
    name:string;
    description:string;
}

export interface ICategoryWithQuestionDTO extends ICategory{
    questions:IQuestion[]
}