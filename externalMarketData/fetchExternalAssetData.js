import { AssetsData } from "../models/assetsModel.js";

export const fetchExternalAssetsData = async (asset, period) => {
  const promises = asset.map(async (assetItem) => {
    const url = `https://api.polygon.io/v2/aggs/ticker/${assetItem}/range/${period}/minute/2023-01-09/2024-11-10?adjusted=true&sort=asc&apiKey=${process.env.API_KEY_POLYGON}`;

    try {
      const responseData = await fetch(url);
      const data = await responseData.json();
      const dataAssets = new AssetsData({ assets: data });
      await AssetsData.deleteMany({});
      dataAssets.save();
    } catch (error) {
      console.log(error);
    }
  });

  await Promise.all(promises);
};
