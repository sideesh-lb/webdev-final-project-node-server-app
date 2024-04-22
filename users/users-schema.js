import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    fname:String,
    lname: String,
    password: {type: String, required: true},
    email: { type: String, unique: true },
    address:String,
    phonenumber:String,
    dob:String,
    gender:String,
    bookMarks:Array,
    role: {type: String, enum: ['INDUSTRY', 'TRADER', 'ADMIN']}
}, {collection: 'users'})

export default usersSchema
