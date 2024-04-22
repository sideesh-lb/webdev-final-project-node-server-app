import mongoose from "mongoose";

const likesSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    stock: {type: mongoose.Schema.Types.ObjectId, ref: 'StocksModel'},
}, {collection: 'likes'})
export default likesSchema