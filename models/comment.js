const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  body: String,
  createdAt: {type: Date, default: Date.now},
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
    //avatar: String 
  
});



module.exports = mongoose.model("Comment", commentSchema);

