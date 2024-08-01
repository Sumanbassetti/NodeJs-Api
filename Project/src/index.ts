import environment from './environments/env.config';
import Database from './database/dbConnection';
import Logger from './utils/Logger';
import App from './app/App';

async function runApplication(){
    const logger: Logger = new Logger(`App`);
    try {
        const dbConnection :Database=new Database();
        await dbConnection.connectDb()
        const app: App = new App();
        app.server.listen(environment.PORT,()=>{
            logger.info(`${environment.API_ENV} Server is running on http://127.0.0.1:${environment.PORT}`);
        })
    } catch (error:any) {
        logger.error(`Unable to start server\n${error.message}`);
        process.exit(1);
    }
   
}
runApplication();