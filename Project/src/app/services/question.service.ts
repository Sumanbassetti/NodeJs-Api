import { ICategory } from "../../interface/ICategory";
import { IQuestion } from "../../interface/IQuestion";
import readDataFromCSV from "../../utils/CSVFileRead";
import questionModel from "../models/question.model";
import IQuestionService from "./abstract/IQuestion.service";

export default class QuestionService implements IQuestionService {

  /** Fetch all questions
   * @return {*}  {Promise<IQuestion[]>} the list of questions
   * @memberof QuestionService
   */
  async getQuestions(): Promise<IQuestion[]> {
    const questiones: IQuestion[] = (await questionModel.find({}).populate({
      path: 'categories',
      select: "name description "
    })) || [];
    return questiones;
  }

  /** Import bulk questions from csv file
   * @param {Express.Multer.File} file The file for import the questions
   * @return {*}  {Promise<IQuestion[]>} The list of imported questions
   * @memberof QuestionService
   */
  async importQuestions(file: Express.Multer.File): Promise<IQuestion[]> {
    let questions: IQuestion[] = await readDataFromCSV(file) || [];
    questions.forEach(question => {
      if (typeof question.categories === 'string') {
        question.categories = JSON.parse(question.categories) as ICategory[];
      } else if (Array.isArray(question.categories) && question.categories.length > 0 && typeof question.categories[0] === 'string') {
        question.categories = (question.categories as string[]).map(cat => JSON.parse(cat)) as ICategory[];
      }
    });
    questions = await questionModel.create(questions);
    return questions
  }
}
