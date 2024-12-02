import { response } from "express";
import { AssetsData } from "../models/assetsModel.js";
import {
  candelCharts,
  lineCharts,
  volumenChart,
} from "../helpers/chartsTransform.js";
import { assets } from "../externalMarketData/assets.js";

export const assetsController = async (req, res = response) => {
  const chartType = req.params.charts;
  const assetType = req.params.asset;

  const validChartTypes = ["candle", "line"];
  const validAssetsTypes = [
    ...assets.dataCrypto,
    ...assets.dataForex,
    ...assets.dataStocks,
  ];
  if (
    !validChartTypes.includes(chartType) ||
    !validAssetsTypes.includes(assetType.toUpperCase())
  ) {
    return res.status(400).json({ error: "Invalid chart type" });
  }

  const dataAssets = await AssetsData.aggregate([
    { $match: { symbol: assetType.toUpperCase() } },
    {
      $project: {
        symbol: 1,
        data: {
          $objectToArray: {
            $arrayElemAt: [
              {
                $switch: {
                  branches: [
                    {
                      case: { $in: ["$symbol", assets.dataStocks] },
                      then: "$assets.Time Series (Daily)",
                    },
                    {
                      case: { $in: ["$symbol", assets.dataForex] },
                      then: "$assets.data.Time Series FX (Daily)",
                    },
                    {
                      case: { $in: ["$symbol", assets.dataCrypto] },
                      then: "$assets.Time Series (Digital Currency Daily)",
                    },
                  ],
                  default: null,
                },
              },
              0,
            ],
          },
        },
        _id: 0,
      },
    },
    {
      $unwind: "$data", // Deshacer el array para poder ordenar sus elementos
    },
    {
      $sort: {
        "data.k": 1, // Ordenar por la fecha 'k' en orden ascendente
      },
    },
    {
      $group: {
        _id: "$symbol", // Agrupar los datos nuevamente por 'symbol'
        data: { $push: "$data" }, // Volver a agrupar los datos ordenados
      },
    },
  ]);
  
  const sortedData = dataAssets[0].data

  switch (chartType) {
    case "candle":
      const dataCandle = {
        ticker: dataAssets[0].symbol,
        candelCharts: candelCharts(sortedData),
        volumenChart: volumenChart(sortedData),
      };

      return res.status(200).json({
        dataCandle,
      });

    case "line":
      const datalinea = {
        ticker: dataAssets[0].symbol,
        lineCharts: lineCharts(sortedData),
        volumenChart: volumenChart(sortedData),
      };

      return res.status(200).json({
        datalinea,
      });

    default:
      return res.status(400).json({ error: "Invalid chart type" });
  }
};
