import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes"
import IQuestionService from "../services/abstract/IQuestion.service";
import QuestionService from "../services/question.service";
import { IQuestion } from "../../interface/IQuestion";
import { asyncHandler } from "../../middlewares/AsyncWrapper";

export default class QuestionController{
    private _questionService: IQuestionService;
    constructor(){
        this._questionService = new QuestionService();
    }

    /**
     *
     *
     * @param {Request} request
     * @param {Response} response
     * @memberof QuestionController
     */
    async getQuestions(request:Request, response:Response){
        const questions:IQuestion[] = await asyncHandler(this._questionService.getQuestions.bind(this),[]);
        response.status(StatusCodes.OK).json({data:questions});
    }
    /**
     *
     *
     * @param {Request} request
     * @param {Response} response
     * @memberof QuestionController
     */
    async importBulkQuestions(request:Request, response:Response){
        const questions:IQuestion[] = await asyncHandler(this._questionService.importQuestions.bind(this._questionService),[request.file]);;
        response.status(StatusCodes.OK).json({data:questions});
    }
}