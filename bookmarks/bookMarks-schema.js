/**
 * @file Implements mongoose schema to map to a MongoDB Comments collection,
 * defines shape of the documents in comment
 */
import mongoose, { Schema } from "mongoose";


const BookmarksSchema = new mongoose.Schema(
    {
     userEmail:String,
     bannerImage:String,
     title:String,
     source:String,
     summary:String,
     url:String
    },
        { collection: "bookMarks" }
);

export default BookmarksSchema;