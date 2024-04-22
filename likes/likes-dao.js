import likesModel from "./likes-model.js";

export const userLikesStock = async (uid, sid) => {
    return await likesModel.create({user: uid, stock: sid})
}
export const userUnlikesStock = async(uid, sid) => {
    return await likesModel.deleteOne({user: uid, stock: sid})
}
export const findStocksLikedByUser = async(uid) => {
    return await likesModel
        .find({user: uid}, {user: false})
        .populate('stock', 'title')
        .exec()
}
export const findUsersThatLikeStock = async(mid) => {
    return await likesModel.find({stock: mid}, {stock: false})
        .populate('user', 'username')
        .exec()
}
export const findAllLikes = async () =>
    await likesModel.find()

export const findUserLikesStock = async (uid, sid) =>
    likesModel.findOne(
        {stock: sid, likedBy: uid});

export const countHowManyLikes = async (sid) =>
    likesModel.count({stock: sid});

export const findAllStocksLikedByUser = async (uid) => {
    const likedStocks = likesModel.find({likedBy: uid}).exec();
    console.log("The liked stocks => " + likedStocks);
    return likedStocks;
}
