import { response } from "express";
import { assets } from "../externalMarketData/assets.js";
import { AssetsData } from "../models/assetsModel.js";

export const calculatorController = async (req, res = response) => {
  try {
    const dataStocks = await AssetsData.aggregate([
      { $match: { symbol: { $in: assets.dataStocks } } },
      {
        $project: {
          _id: 0,
          symbol: 1,
          value: {
            $let: {
              vars: {
                firstEntry: {
                  $arrayElemAt: [
                    {
                      $objectToArray: {
                        $arrayElemAt: ["$assets.Time Series (Daily)", 0],
                      },
                    },
                    0,
                  ],
                },
              },
              in: {
                $reduce: {
                  input: { $objectToArray: "$$firstEntry.v" },
                  initialValue: null,
                  in: {
                    $cond: [
                      { $eq: ["$$this.k", "4. close"] },
                      "$$this.v",
                      "$$value",
                    ],
                  },
                },
              },
            },
          },
        },
      },
    ]);
    const dataCrypto = await AssetsData.aggregate([
      { $match: { symbol: { $in: assets.dataCrypto } } },
      {
        $project: {
          _id: 0,
          symbol: 1,
          value: {
            $let: {
              vars: {
                firstEntry: {
                  $arrayElemAt: [
                    {
                      $objectToArray: {
                        $arrayElemAt: [
                          "$assets.Time Series (Digital Currency Daily)",
                          0,
                        ],
                      },
                    },
                    0,
                  ],
                },
              },
              in: {
                $reduce: {
                  input: { $objectToArray: "$$firstEntry.v" },
                  initialValue: null,
                  in: {
                    $cond: [
                      { $eq: ["$$this.k", "4. close"] },
                      "$$this.v",
                      "$$value",
                    ],
                  },
                },
              },
            },
          },
        },
      },
    ]);

    const dataForex = await AssetsData.aggregate([
      { $match: { symbol: { $in: assets.dataForex } } },
      {
        $project: {
          _id: 0,
          symbol: 1,
          fx: "fx",
          value: {
            $let: {
              vars: {
                firstEntry: {
                  $arrayElemAt: [
                    {
                      $objectToArray: {
                        $arrayElemAt: ["$assets.data.Time Series FX (Daily)", 0],
                      },
                    },
                    0,
                  ],
                },
              },
              in: {
                $reduce: {
                  input: { $objectToArray: "$$firstEntry.v" },
                  initialValue: null,
                  in: {
                    $cond: [
                      { $eq: ["$$this.k", "4. close"] },
                      "$$this.v",
                      "$$value",
                    ],
                  },
                },
              },
            },
          },
        },
      },
    ]);

    const dataCal = [...dataStocks, ...dataCrypto, ...dataForex];

    res.status(200).json({
      dataCal,
    });
  } catch (error) {
    res.status(401).send(`Error: ${error}`);
  }
};
