import { config } from "dotenv";
config({})
const environment=require(`./${process.env.NODE_ENV||"development"}.env`)
export default environment