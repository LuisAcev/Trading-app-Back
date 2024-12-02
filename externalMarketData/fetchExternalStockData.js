import { AssetsData } from "../models/assetsModel.js";

export const fetchExternalStocksAssetsData = async (asset) => {
  const promises = asset.map(async (assetItem) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${assetItem}&outputsize=full&apikey=${process.env.AAPI_KEY_ALPHA}`;

    try {
      const responseData = await fetch(url);
      const data = await responseData.json();
      const dataAssets = new AssetsData({ symbol: assetItem, assets: data });
      await AssetsData.deleteMany({});
      dataAssets.save();
    } catch (error) {
      console.log(error);
    }
  });

  await Promise.all(promises); 
};
