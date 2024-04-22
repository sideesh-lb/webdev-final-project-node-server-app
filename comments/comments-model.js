import mongoose from "mongoose";
import CommentSchema from "./comments-schema.js";

const CommentModel = mongoose.model("CommentModel", CommentSchema);

export default CommentModel;