import mongoose from "mongoose";

const User = new mongoose.Schema({
  Email: {type: String},
  Username: {type:String},
  Password: {type: String},
  date: {type: Date, default: Date.now },
});

const NewUser = mongoose.model("UserTable", User);

export default NewUser;