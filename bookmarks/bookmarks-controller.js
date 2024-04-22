import * as bookMarksDao from "./bookMarks-dao.js";
const BookMarksController = (app) => {
    
    const createBookMark = async (req, res) => {
        console.log("adding bookmark");
        const newBookMark = req.body;
        const bookMark = await bookMarksDao.addBookmark(
            newBookMark.userEmail,
            newBookMark.bannerImage,
            newBookMark.title,
            newBookMark.source,
            newBookMark.summary,
            newBookMark.url
        );
        res.send({message:"bookMark Added!"});
      };



const getBookMarks = async (req, res) => {
    console.log("getbookMarksForuser");
    const email = req.body.userEmail;
    const bookMarks = await bookMarksDao.findBookMarksForUser(email);
    if (bookMarks) {
    res.status(200).send({bookMarksForUser:bookMarks});
      return;
    }
    
    res.sendStatus(404);
  };

  const getAllBookMarks = async (req, res) => {
    
    const bookMarks = await bookMarksDao.findAllBookMarks();
    if (bookMarks) {
    res.status(200).send({bookMarks});
      return;
    }
    res.sendStatus(404);
  };

  const deleteBookMark = async(req,res) =>{
    
    const userEmail = req.body.userEmail;
    const url = req.body.url;
    console.log(userEmail,url)
    const status =  await bookMarksDao.deleteBookMark(userEmail, url);
    res.send({message:"bookMark Deleted!"});
  }

app.post("/addBookMark", createBookMark);
app.post("/getBookMarks", getBookMarks);
app.post("/deleteBookMark", deleteBookMark);
app.get("/getAllBookMarks", getAllBookMarks);

};
export default BookMarksController;



