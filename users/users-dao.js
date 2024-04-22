import usersModel from "./users-model.js";

export const createUser = async (user) =>
    await usersModel.create(user)

export const findUserByUsername = async (email) =>
    await usersModel.findOne({email})

export const findUserByCredentials = async (email, password) =>
    await usersModel.findOne({email, password})

export const findAllUsers = async () =>
    await usersModel.find()

export const deleteUser = async (uid) =>
    await usersModel.deleteOne({_id: uid})

export const updateUser = async (email, userUpdates) =>
{
    console.log("in update!");
    await usersModel.updateOne({email},
            {$set:{fname: userUpdates.fname,lname: userUpdates.lname,
                address:userUpdates.address,phoneNumber:userUpdates.phoneNumber,
                dob:userUpdates.dob,gender:userUpdates.gender}});
}

export const addBookMark = async (email,bookMark) =>
{
    console.log("inside bookMark service");
    await usersModel.updateOne({email},
        {$push: { bookMarks: bookMark}});
}
   
 

export const findUserById = (uid) =>
    usersModel.findById(uid, {password: false})