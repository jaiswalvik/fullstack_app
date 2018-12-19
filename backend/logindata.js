// /backend/logindata.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const LoginDataSchema = new Schema(
  {
    firstname : String,
    lastname : String,
    email : String,
    password : String,
    username : String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("LoginData", LoginDataSchema);