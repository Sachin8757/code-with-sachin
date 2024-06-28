const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/thecoder");

mongoose.connect("mongodb+srv://sachin:8757887103@shopdata.shpwbu2.mongodb.net/?retryWrites=true&w=majority&appName=thecoder");

const userschema = mongoose.Schema({
  usename:String,
  fullname:String,
  password:String,
  phoneno:String,
  email:String,
  batch:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"batch"

  }]
})
userschema.plugin(plm);
 module.exports = mongoose.model("users",userschema);