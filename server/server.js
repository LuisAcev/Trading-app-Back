import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { assets } from "../externalMarketData/assets.js";
import { dbConnection } from "../dataBase/config.js";
import { getAssets } from "../routes/getassets.js";
import { getCalculatorRouter } from "../routes/getCalculatorInfo.js";
import { fetchExternalStocksAssetsData } from "../externalMarketData/fetchExternalStockData.js";
import { fetchExternalCryptoAssetsData } from "../externalMarketData/fetchExternalCryptoData.js";
import { fetchExternalForexAssetsData } from "../externalMarketData/fetchExternalForexData.js";

dotenv.config();

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.assetsData = "/api/assetsdata";
    this.calculator = "/api/calculator";
    this.dataBaseConecction();
    this.middleware();
    this.rutes();
  }

  rutes() {
    this.app.use(this.assetsData, getAssets);
    this.app.use(this.calculator, getCalculatorRouter);
  }
  middleware() {
    //CORS para proteger las rutas
    this.app.use(cors());
  }
  dataBaseConecction() {
    dbConnection();
  }

  async getExternalMarketData() {
    await fetchExternalStocksAssetsData(assets.dataStocks);
    await fetchExternalCryptoAssetsData( assets.dataCrypto);
    await fetchExternalForexAssetsData( assets.dataForex);
  }

  listen() {
    this.app.listen(this.port, () => console.log(`Port: ${this.port}`));
  }
}
