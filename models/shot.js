const mongoose = require("mongoose");
const Comment = require("./comment");

const shotSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    category: String,
    author: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
    ]
  });

// remove comments associated to a shot 
  shotSchema.pre('remove', async function () {
    await Comment.remove({
      _id: {
        $in: this.comments  
      }
    });
  });
  

// pre-hook middleware to populate author in post show route
shotSchema.pre('findOne', function(next) {
  this.populate('author');
  next();
});

module.exports = mongoose.model("Shot", shotSchema);