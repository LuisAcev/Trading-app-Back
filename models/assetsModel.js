import { Schema, model } from "mongoose";

const AssetsModel = Schema({
  assets: { type: Array },
});

AssetsModel.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return data;
};
export const AssetsData = model("AssetsData",AssetsModel);