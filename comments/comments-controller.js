import * as commentDao from "./comments-dao.js";
import * as likesDao from "../likes/likes-dao.js";
const CommentsController = (app) => {

    const getComments = async (req, res) => {
        try {
            const comments = await commentDao.getComments(req.params.sid);
            res.status(200).json(comments);
        } catch (err) {
            res.status(403)
                .error({
                    error: err
                })
        }
    }

    const addComments = async (req, res) => {
        const uid = req.params.uid;
        const sid = req.params.sid;
        try {
            console.log("Inside Add Comments : uid :", uid)
            console.log("Inside Add Comments : sid :", sid)
            const comment = await commentDao.addComment(uid, sid, req.body.comment)
            res.status(200).json(comment)
        } catch (err) {
            res.status(403).json({error: err});
        }
    }

    const updateComment = async (req, res) => {
        const uid = req.params.uid;
        const cid = req.params.cid;
        try {
            const comment = await commentDao.updateComment(uid, cid, req.body.comment)
            res.status(200).json(comment)
        } catch (err) {
            res.status(403).json({
                error : err
            })
        }
    }

    const deleteComment = async (req, res) => {
        const uid = req.params.uid;
        const cid = req.params.cid;
        try {
            const comment = await commentDao.deleteComment(uid,cid);
            res.status(200).json(comment)
        } catch (err) {
            res.status(403).json({
                error: err
            })
        }
    }

    const countHowManyCommentsForStock = async (req, res) => {
        const sid = req.params.sid;
        try {
            const response = await commentDao.countHowManyComments(sid);
            res.json(response)
        } catch (error) {
            res.error(error);
        }
    }

    app.get("/comments/:sid", getComments)
    app.post("/comments/:uid/stocks/:sid", addComments)
    app.put("/comments/:uid/comment/:cid", updateComment)
    app.delete("/comments/:uid/comment/:cid", deleteComment)
    app.get('/comments/:sid/commentsCount', countHowManyCommentsForStock)
}

export default CommentsController;