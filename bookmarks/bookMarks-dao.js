import BookmarksModel from "./bookmarks-model.js";
export const addBookmark = async (email,image,title,source,summary,url) => 
    await BookmarksModel.create({
        userEmail:email,
        bannerImage : image,
        title:title,
        source:source,
        summary:summary,
        url:url
    });
    
    export const findBookMarksForUser = async (userEmail) =>
    await BookmarksModel.find({userEmail})

    export const findAllBookMarks = async () =>
    await BookmarksModel.find()

    export const deleteBookMark = async (email,url) =>
    await BookmarksModel.deleteOne({userEmail: email,url:url})