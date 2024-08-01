import mongoose from "mongoose";
import environment from "../environments/env.config";
import Logger from "../utils/Logger";

export default  class Database{
    private logger: Logger;
    constructor(){
        this.logger = new Logger('Mongodb')
    }
    private connectionUrl: string=''
    async connectDb(){
        try {
            this.connectionUrl = environment.MONGO_DB_URL;
            mongoose.set('strictQuery', false);
            await mongoose.connect(this.connectionUrl);
            this.logger.success(`Connection established!`);
        } catch (error) {
            this.logger.error(`Unable to established connection!\n${error}`);
        }
    }
}