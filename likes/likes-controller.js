import * as likesDao from "./likes-dao.js";
import {countHowManyLikes} from "./likes-dao.js";


const LikesController = (app) => {
    console.log("inside LikesController");
    const userLikesStock = async (req, res) => {
         const uid = req.params.uid
        const sid = req.params.sid

        const newLike = await likesDao.userLikesStock(uid, sid)
        // likes.push(newLike)
        res.json(newLike)
    }

    const userUnlikesStock = async (req, res) => {
        const {uid, sid} = req.params

        const status = await likesDao.userUnlikesStock(uid, sid)

        // likes = likes.filter((l) => l.user !== uid && l.movie !== mid)
        res.send(status)
    }
    const findAllLikes = async (req, res) => {
        try {
            const likes = await likesDao.findAllLikes()
            res.json(likes)
        } catch (error) {
            res.json(error);
        }

    }
    const findStocksLikedByUser = async (req, res) => {
        try {
            const uid = req.params.uid
            const stocks = await likesDao.findStocksLikedByUser(uid)
            res.json(stocks)
        } catch (error) {
            res.json(error)
        }
    }

    const findUsersThatLikeStock = async (req, res) => {

        try {
            const sid = req.params.sid
            const users = await likesDao.findUsersThatLikeStock(sid)
            res.json(users)
        } catch (error) {
            res.json(error)
        }

    }

    const userTogglesStockLikes = async (req, res) => {
        const userId = req.params.uid;
        const sid = req.params.sid;
        console.log("User has toggled like on front-end , the user is :", userId)
        console.log("User has toggled like on front-end, the stock is :", sid)
        let stockLiked = false;
        try {
            const userAlreadyLikedStock = await likesDao
                .findUserLikesStock(userId, sid);
            if (userAlreadyLikedStock) {
                await likesDao.userUnlikesStock(userId, sid);
                stockLiked = false
            } else {
                await likesDao.userLikesStock(userId, sid);
                stockLiked = true
            }
            const howManyLikedSong = await likesDao.countHowManyLikes(sid)
            res.status(200).json({count: howManyLikedSong, userLiked: stockLiked});
        } catch (e) {
            console.log(e);
            res.sendStatus(403);
        }
    }

    const findUserLikesStock = (req, res) => {
        const userId = req.params.uid;
        likesDao.findUserLikesStock(userId, req.params.sid)
            .then(likes => res.json(likes))
            .catch(error => {
                res.json(error)
            })
    }

    const countHowManyLikesForStock = async (req, res) => {
        const stockID = req.params.sid;

        try {
            const response = await likesDao.countHowManyLikes(stockID);
            res.json(response);
        } catch (error) {
            res.json(error);
        }
    }

    const findAllStocksLikedByUser = async (req, res) => {
        const uid = req.params.uid;
        try {
            const likes = await likesDao.findAllStocksLikedByUser(uid);
            const likesNonNullStocks = likes.filter(like => like.stock);
            const stocksFromLikes = likesNonNullStocks.map(like => like.stock);
            console.log("The stocksFromLikes are :", stocksFromLikes);
            res.json(stocksFromLikes);
        } catch (error) {
            res.json(error)
        }

    }

    app.post('/users/likes/:sid', userLikesStock)
    app.delete('/users/unlikes/:sid', userUnlikesStock)
    app.get('/likes', findAllLikes)
    app.get('/users/:uid/likes', findStocksLikedByUser)
    app.get('/stocks/:sid/likes', findUsersThatLikeStock)
    app.put('/users/:uid/likes/:sid', userTogglesStockLikes)
    app.get('/stocks/:sid/likesCount', countHowManyLikesForStock)
    app.get('/users/:uid/likes/:sid', findUserLikesStock)
    app.get('/users/:uid/likedStocks', findAllStocksLikedByUser)
    // app.put(updateLike)

    // /users/undefined/likes/639a8aa37a0972afb22c3c68
}

export default LikesController;