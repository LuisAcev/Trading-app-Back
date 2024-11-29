import { response } from "express";
import { AssetsData } from "../models/assetsModel.js";
import {
  candelCharts,
  lineCharts,
  volumenChart,
} from "../helpers/chartsTransform.js";
import { generateJWT } from "../helpers/generateJWT.js";

export const assetsController = async (req, res = response) => {
  const chartType = req.params.charts;

  const validChartTypes = ["candle", "line"];
  if (!validChartTypes.includes(chartType)) {
    return res.status(400).json({ error: "Invalid chart type" });
  }
  const data = await AssetsData.find({});

  // let token;
  // try {
  //   token = await generateJWT({ data: process.env.SECRET_WORD });
    
  // } catch (err) {
  //   console.error("Error:", err);
  //   return res.status(500).json({ error: "Internal Server Error" });
  // }

  // if (!data || data.length === 0) {
  //   return res.status(404).json({ error: "No data found" });
  // }

  switch (chartType) {
    case "candle":
      const dataCandle = data.map((item) => {
        return {
          ticker: item.assets[0].ticker,
          candelCharts: candelCharts(item.assets[0].results),
          volumenChart: volumenChart(item.assets[0].results),
        };
      });
      data;
      res.status(200).json({
        dataCandle,
      });
      break;

    case "line":
      const datalinea = data.map((item) => {
        return {
          ticker: item.assets[0].ticker,
          lineCharts: lineCharts(item.assets[0].results),
          volumenChart: volumenChart(item.assets[0].results),
        };
      });
      data;
      res.status(200).json({
        datalinea,
      });
      break;
    default:
      return res.status(400).json({ error: "Invalid chart type" });
  }
};
