import mongoose from "mongoose";
import BookmarkSchema from "./bookMarks-schema.js";

const BookmarkModel = mongoose.model("BookmarkModel", BookmarkSchema);

export default BookmarkModel;