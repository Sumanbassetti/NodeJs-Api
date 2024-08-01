import { Model, Schema, model, models } from "mongoose";
import { IUser } from "../../interface/IUser";
import { Gender } from "../../utils/metaData/utilsEnum";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      requuired: true,
      unique: true,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: Gender,
    },
    dob: {
      type: Date,
      required: true,
      validate: {
        validator: (value: Date) => value <= new Date(),
        message: "Date of birth must be before or on today.",
      },
    },
    profilePicture: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel: Model<IUser> =
  models.user || model<IUser>("user", userSchema);
export default userModel;
