const mongoose = require("mongoose");

const shotSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    category: String,
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String,
      avatar: String
    },
    createdAt: {type: Date, default: Date.now},
    comments: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      }
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    counter: {type: Number, default: 0}
  });
  
module.exports = mongoose.model("Shot", shotSchema);