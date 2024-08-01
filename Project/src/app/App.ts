import cors from "cors";
import * as express from "express";
import * as http from "http";
import { StatusCodes } from "http-status-codes";
import logger from "morgan";
import errorHandler from "../middlewares/ErrorHandler";
import notFound from "../middlewares/NotFound";
import { ErrorStream, SuccessStream } from "../utils/Logger";
import appRouter from "./routes/app.router";

export default class App {
    protected _app: express.Express;
    protected _successStream: SuccessStream;
    protected _errorStream: ErrorStream;
    public server: http.Server;

    constructor() {
        this._app = express.default();
        this._successStream = new SuccessStream();
        this._errorStream = new ErrorStream();
        this.appConfig();
        this.server = http.createServer(this._app);
    }
    private appConfig(): void {
        this._app.use(
            logger("combined", {
                skip: this.skipError,
                stream: this._successStream,
            })
        );
        this._app.use(
            logger("combined", {
                skip: this.skipSuccess,
                stream: this._errorStream,
            })
        );
        this._app.use(express.json());
        this._app.use(cors());
        this._app.use("/api/v1", appRouter);
        this._app.use(notFound);
        this._app.use(errorHandler);
    }

    /**
     * The function returns a boolean value indicating whether the response status code is less than
     * BAD_REQUEST.
     * @param req - express.Request is an object that represents the HTTP request that was sent by the
     * client to the server.
     * @param res - The "res" parameter is an instance of the Express Response object, which is used to
     * send a response back to the client who made the request.
     * @returns A boolean value is being returned. The function checks if the response status code is
     * less than the HTTP status code for a bad request (400) and returns true if it is, indicating that
     * the request was successful and can be skipped.
     */
    private skipSuccess(req: express.Request, res: express.Response): boolean {
        return res.statusCode < StatusCodes.BAD_REQUEST;
    }
    
    /**
     * The function returns a boolean value indicating whether the response status code is a bad request
     * or not.
     * @param req - express.Request is an object that represents the HTTP request that was sent by the
     * client to the server.
     * @param res - The `res` parameter is an instance of the `express.Response` class, which represents
     * the HTTP response that will be sent back to the client.
     * @returns The function `skipError` is returning a boolean value. It checks if the response status
     * code is greater than or equal to the `BAD_REQUEST` status code (which is typically 400), and
     * returns `true` if it is, indicating that the error should be skipped. Otherwise, it returns
     * `false`.
     */
    private skipError(req: express.Request, res: express.Response): boolean {
        return res.statusCode >= StatusCodes.BAD_REQUEST;
    }
 
}
