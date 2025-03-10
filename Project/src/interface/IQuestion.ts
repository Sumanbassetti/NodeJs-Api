import { QuestionType } from "../utils/metaData/utilsEnum";
import { ICategory } from "./ICategory";
import { IBase } from "./ICommon";

export interface IQuestion extends IBase {
  question: string;
  categories: ICategory[] | string[];
  questionType: QuestionType;
  marks: number;
  hints: string;
}
