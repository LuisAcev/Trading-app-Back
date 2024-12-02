import { Schema, model } from "mongoose";

const UserSchema = Schema({
  fullname: { type: String },
  email: { type: String,unique: true },
  password: { type: String },
  cellPhone: { type: Number },
  country:{type:String},
  isLoading: { type: Boolean, default: true },
  img: { type: String },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();

  return user;
};

export const User = model("User", UserSchema);
