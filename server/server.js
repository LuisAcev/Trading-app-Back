import express from "express";
import dotenv from "dotenv";
import { fetchExternalAssetsData } from "../externalMarketData/fetchExternalAssetData.js";
import { assetes } from "../externalMarketData/assets.js";
import { dbConnection } from "../dataBase/config.js";
import { getAssets } from "../routes/getassets.js";

assetes;

dotenv.config();

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.assetsData = "/api/assetsdata";
    this.dataBaseConecction();
    this.rutes();
  }

  rutes() {
    this.app.use(this.assetsData,getAssets);
  }

  dataBaseConecction() {
    dbConnection();
  }

  getExternalMarketData() {
    fetchExternalAssetsData(assetes.data, "1");
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Port: ${this.port}`)
    );
  }
}
