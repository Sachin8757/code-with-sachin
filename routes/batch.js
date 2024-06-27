const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    name:String,
    DateAt: {
        type: Date,
        default:Date.now
    },

});
 module.exports = mongoose.model("orders",userschema);