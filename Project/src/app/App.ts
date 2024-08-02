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
    //For app configuration
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
        //For initilize the main route
        this._app.use("/api/v1", appRouter);
        this._app.use(notFound);
        this._app.use(errorHandler);
    }

    //For every success request 
    private skipSuccess(req: express.Request, res: express.Response): boolean {
        return res.statusCode < StatusCodes.BAD_REQUEST;
    }
    
    //For every error request
    private skipError(req: express.Request, res: express.Response): boolean {
        return res.statusCode >= StatusCodes.BAD_REQUEST;
    }
 
}
