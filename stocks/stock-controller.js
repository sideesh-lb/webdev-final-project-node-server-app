import * as stockDao from "./stocks-dao.js";

export const getStocks = () => stocks;

const StocksController = (app) => {
  const createStock = async (req, res) => {
    console.log("Entering create stock with req: ", req.body);
    const stock = req.body;
    const existingStock = await stockDao.findStockBySymbol(stock.symbol);
    if (existingStock) {
      console.log("Stock ID inside:", existingStock._id);
      res.send(existingStock);
      return;
    }
    stock["likes"] = 0;
    stock["liked"] = false;
    stock["title"] = stock["instrument_name"];
    stock["symbol"] = stock["symbol"];

    //stocks.push(stock)
    const actualStock = await stockDao.createStock(stock);
    console.log("Stock ID outside:", actualStock._id);
    res.send(actualStock);
  };
  const findAllStocks = async (req, res) => {
    const stocksInDatabase = await stockDao.findAllStocks();
    res.send(stocksInDatabase);
  };
  const updateStock = (req, res) => {};
  const deleteStock = async (req, res) => {
    const sid = req.params["sid"];
    const status = await stockDao.deleteStock(sid);
    /*stocks = stocks.filter(
             (m) => m._id !== mid)*/
    res.send(status);
  };

  app.post("/stocks", createStock);
  app.get("/stocks", findAllStocks);
  app.put("/stocks/:sid", updateStock);
  app.delete("/stocks/:sid", deleteStock);
};

export default StocksController;
