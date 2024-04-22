import mongoose from "mongoose";
import stockSchema from "./stocks-schema.js";

const stocksModel = mongoose.model('StocksModel', stockSchema)

export default stocksModel