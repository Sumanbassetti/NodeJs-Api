import { Model, Schema, model, models } from "mongoose";
import { ICategory } from "../../interface/ICategory";

const categorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const catgoryModel: Model<ICategory> =
  models.category || model<ICategory>("category", categorySchema);
export default catgoryModel;
