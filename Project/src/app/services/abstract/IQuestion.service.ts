import { IQuestion } from "../../interface/IQuestion";

export default abstract class IQuestionService {
    abstract getQuestions(): Promise<IQuestion[]>;
    abstract importQuestions(): Promise<IQuestion[]>;
}