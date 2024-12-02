import { AssetsData } from "../models/assetsModel.js";

export const fetchExternalCryptoAssetsData = async (asset) => {
  const promises = asset.map(async (assetItem) => {
    const simbol1 = assetItem.slice(0, 3);
    const simbol2 = assetItem.slice(3, 6);
    const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${simbol1}&market=${simbol2}&apikey=${process.env.AAPI_KEY_ALPHA}`;

    try {
      const responseData = await fetch(url);
      const data = await responseData.json();
      const dataAssets = new AssetsData({ symbol: assetItem, assets: data });
      dataAssets.save();
    } catch (error) {
      console.log(error);
    }
  });

  await Promise.all(promises);
};
