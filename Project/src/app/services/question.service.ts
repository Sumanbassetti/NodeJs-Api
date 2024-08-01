import { IQuestion } from "../../interface/IQuestion";
import IQuestionService from "./abstract/IQuestion.service";

export default class QuestionService implements IQuestionService {
    getQuestions(): Promise<IQuestion[]> {
        throw new Error("Method not implemented.");
    }
    importQuestions(): Promise<IQuestion[]> {
        throw new Error("Method not implemented.");
    }
    
}