import * as userDao from "./users-dao.js";

let currentUser = null;

const UsersController = (app) => {
  const findAllUsers = async (req, res) => {
    const users = await userDao.findAllUsers();
    res.json(users);
  };
  const createUser = async (req, res) => {
    const newUser = req.body;
    const actualUser = await userDao.createUser(newUser);
    res.json(actualUser);
  };
  const updateUser = async(req,res) => {
    console.log("in update");
    const updatedUser= req.body.user;
   
    const existingUser = await userDao.findUserByUsername(updatedUser.email);
    if(existingUser)
    {
      await userDao.updateUser(updatedUser.email,updatedUser)
      res.status(201).send({message:"Updated User",updatedUser:updatedUser});
    }
    else 
    res.send({message:"No User"});

  };

  const addBookmark = async(req,res)=>{
    console.log("inside bookMark controller");
    const email= req.body.email;
    const bookMark= req.body.bookMark;
   
    const existingUser = await userDao.findUserByUsername(email);
    if(existingUser)
    {
      await userDao.addBookMark(email,bookMark)
      res.status(201).send({message:"Added Bookmark"});
    }
    else 
    res.send({message:"No User"});
  };

  const deleteUser = async (req, res) => {
    const userToDelete = req.params.uid;
    const status = await userDao.deleteUser(userToDelete);
    res.json(200);
  };

  const register = async (req, res) => {
    console.log("in register");
    const user = req.body;
    const existingUser = await userDao.findUserByUsername(user.email);
    if (existingUser) {
      res.send({ message: "Duplicate Email" });
      return;
    }
    const currentUser = await userDao.createUser(user);
    // req.session['currentUser'] = currentUser

    res.status(200).send({ message: "Success", userDetail: currentUser });
  };

  const login = async (req, res) => {
    const credentials = req.body;
    const existingUser = await userDao.findUserByCredentials(
      credentials.email,
      credentials.password
    );
    if (existingUser) {
      console.log("Inside Login : Existing user is :", existingUser)
      req.session['profile'] = existingUser;
      res.status(200).send({ message: "Logged In", userDetail: existingUser });
      return;
    } else
      res.send({
        message: "E-mail and Password combination is not valid!",
        userDetail: existingUser,
      });
  };

  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    console.log("The current user session is :", req.session)
    if (req.session["profile"]) {
      res.send(req.session["profile"]);
    } else {
      //console.log("Inside the else. Request is :", req)
      res.sendStatus(403);
    }
  };

  const findUserById = async (req, res) => {
    const uid = req.params.uid;
    const user = await userDao.findUserById(uid);
    if (user) {
      res.json(user);
      return;
    }
    console.log("Find userById request failed")
    res.sendStatus(403);
  };

  app.get("/users", findAllUsers);
  app.get("/users/:uid", findUserById);
  app.post("/users", createUser);
  app.put("/users/update", updateUser);
  app.put("/users/addBookmark", addBookmark);
  app.delete("/users/:uid", deleteUser);

  app.post("/sign-up", register);
  app.post("/login", login);
  app.post("/logout", logout);
  app.post("/profile", profile);
};

export default UsersController;
