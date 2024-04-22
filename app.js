import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import cors from "cors";
import LikesController from "./likes/likes-controller.js";
import UsersController from "./users/users-controller.js";
import StocksController from "./stocks/stock-controller.js";
import CommentsController from "./comments/comments-controller.js";
import BookMarksController from "./bookmarks/bookmarks-controller.js";
import "dotenv/config";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

const FRONTEND_URL_NETLIFY = 'https://main--sideesh-webdev.netlify.app/';
const FRONTEND_URL = 'http://localhost:3000/';
const FRONT_END_STRING = FRONTEND_URL_NETLIFY || FRONTEND_URL;

mongoose
  .connect(
    "mongodb+srv://sideesh:pavitasree@cluster-kanbas.x2jtkqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Kanbas",
    {dbName: 'webdevFinalProject'}
  )
  .catch((error) => {
    console.log("Error thrown while trying to connect to db", error);
    throw error;
  });


const sessionOptions = {
secret: "sidkey",
resave: false,
saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
sessionOptions.proxy = true;
sessionOptions.cookie = {
  sameSite: "none",
  secure: true,
};
}
const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: FRONT_END_STRING
}));

app.use(session(sessionOptions));

StocksController(app);
LikesController(app);
UsersController(app);
CommentsController(app);
BookMarksController(app);
app.listen(process.env.PORT || 4000);
console.log("Listening at 4000");
