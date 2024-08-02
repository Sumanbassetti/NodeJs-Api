import { Model, Schema, model, models } from "mongoose";
import { QuestionType } from "../../utils/metaData/utilsEnum";
import { IQuestion } from "../../interface/IQuestion";

const questionSchema: Schema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: "category",
      required: true,
    },
    questionType: {
      type: String,
      enum: QuestionType,
    },
    marks: {
      type: Number,
      required: true,
    },
    hints: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const questionModel: Model<IQuestion> =
  models.question || model<IQuestion>("question", questionSchema);
export default questionModel;
