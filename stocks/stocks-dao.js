import moviesModel from "./stocks-model.js";
import stocksModel from "./stocks-model.js";

export const findAllStocks = async () => {
  const stocks = await stocksModel.find();
  return stocks;
};

export const findStockBySymbol = async (symbol) => {
  const stock = await stocksModel.findOne({ symbol });
  return stock;
};

export const createStock = async (stock) => {
  const actualInsertedStock = await moviesModel.create(stock);
  return actualInsertedStock;
};
export const deleteStock = async (sid) => {
  const status = await moviesModel.deleteOne({ _id: sid });
  return status;
};
export const updateMovie = () => {};
