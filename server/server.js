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
import { usersRouter } from "../routes/userRouter.js";

dotenv.config();

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.assetsData = "/api/assetsdata";
    this.users = "/api/users";
    this.calculator = "/api/calculator";
    this.dataBaseConecction();
    this.middleware();
    this.rutes();
  }

  rutes() {
    this.app.use(this.assetsData, getAssets);
    this.app.use(this.users, usersRouter);
    this.app.use(this.calculator, getCalculatorRouter); 
  }
  middleware() {

    this.app.use((req, res, next) => {
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp"); // Solo si es necesario
      next();
    });
    //CORS para proteger las rutas
    
    // this.app.use(cors({
    //   origin: 'http://localhost:3000', // Cambia por tu dominio
    //   credentials: true
    // }));
    this.app.use(cors());
    this.app.use(express.json());
  }
  dataBaseConecction() {
    dbConnection();
  }

  async getExternalMarketData() {
    try {
      await fetchExternalStocksAssetsData(assets.dataStocks);
      await fetchExternalCryptoAssetsData(assets.dataCrypto);
      await fetchExternalForexAssetsData(assets.dataForex);
    } catch (error) {
      console.error("Error getting Data´s market :", error);
    } finally {
      console.log("Next update in 25 hours...");
      setTimeout(() => this.getExternalMarketData(), 25 * 60 * 60 * 1000);
    }
  }

  listen() {
    this.app.listen(this.port, () => console.log(`Port: ${this.port}`));
  }
}
