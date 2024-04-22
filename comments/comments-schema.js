/**
 * @file Implements mongoose schema to map to a MongoDB Comments collection,
 * defines shape of the documents in comment
 */
import mongoose, { Schema } from "mongoose";


const CommentSchema = new mongoose.Schema(
    {
        stockID: {
            type: String,
        },
        comment: {
            type: String,
            required: true,
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "UserModel",
        },
        postedOn: {
            type: Date,
            default: Date.now,
        },
    },
        { collection: "comments" }
);

export default CommentSchema;
