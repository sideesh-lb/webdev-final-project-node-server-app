import CommentModel from "./comments-model.js";
import likesModel from "../likes/likes-model.js";
import commentsModel from "./comments-model.js";


export const getComments = async (sid) => {
    const comments = await CommentModel.find({stockID: sid})
        .populate("postedBy")
        .exec()

    if (comments == null) {
        throw new Error("Comments do not exist")
    }

    return comments;
}

export const addComment = async (uid, sid, comment) => {
    const comm = await CommentModel.create({
        comment: comment,
        postedBy: uid,
        stockID: sid
    })
    if (comm == null) {
        throw new Error("Comment does not exist")
    }
    return comm;
}

export const updateComment = async (uid, cid, comment) => {
    const comm = await CommentModel.updateOne(
        {
            postedBy: uid, _id: cid
        },
        {
            $set: {
                comment: comment
            }
        }
    )
    if (comm == null) {
        throw new Error("Comment does not exist")
    }
    console.log("Inside updateComment in Comment Dao",comment, comm)
    return comm;
}

export const deleteComment = async (uid, cid) => {
    const comm = await CommentModel.deleteOne({
        postedBy: uid,
        _id: cid
    })
    if (comm == null) {
        throw new Error("Comment does not exist")
    }

    return comm;
}

export const countHowManyComments = async (sid) =>
    commentsModel.count({stock: sid});
