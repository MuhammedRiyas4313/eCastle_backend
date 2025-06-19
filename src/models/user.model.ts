import { ROLES_TYPE } from "common/constant.common";
import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: ROLES_TYPE;
  createdAt: Date;
  updatedAt: Date;
}

const usersSchema = new Schema<IUser>(
  {
    name: String,
    email: String,
    password: String,
    role: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = model<IUser>("users", usersSchema);
