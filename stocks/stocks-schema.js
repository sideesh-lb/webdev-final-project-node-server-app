import mongoose from "mongoose";

const stocksSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    symbol: { type: String, required: true },
    likes: { type: Number, default: 0 },
    liked: { type: Boolean, default: false },
  },
  { collection: "stocks" }
);

export default stocksSchema;
