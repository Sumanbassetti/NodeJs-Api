import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes"
import IQuestionService from "../services/abstract/IQuestion.service";
import QuestionService from "../services/question.service";
import { IQuestion } from "../../interface/IQuestion";

export default class QuestionController{
    private _questionService: IQuestionService;
    constructor(){
        this._questionService = new QuestionService();
    }
    async getQuestions(request:Request, response:Response){
        try {
            const questions:IQuestion[] = await this._questionService.getQuestions();
            response.status(StatusCodes.OK).json({data:questions});
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
        }
    }
    async importBulkQuestions(request:Request, response:Response){
        try {
            const questions:IQuestion[] = await this._questionService.importQuestions();
            response.status(StatusCodes.OK).json({data:questions});
        } catch (error) {
            response.json({error})
        }
    }
}