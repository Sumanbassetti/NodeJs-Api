import { SchemaTimestampsConfig,Document } from "mongoose";
export interface IBase extends Document, SchemaTimestampsConfig {
}