const Shot = require("../models/shot");
const Comment = require("../models/comment");

module.exports = {
  async commentCreate(req, res, next) {
    let shot = await Shot.findById(req.params.id).populate("comments").exec();
    // allowing to create only one comment per post 
    // let haveCommented = shot.comments.filter(comment =>{
    //   return comment.author.equals(req.user._id);
    // }).length;
    // if(haveCommented) {
    //   req.session.error = "Sorry you can only create one comment per post";
    //   return res.redirect(`/shots/${shot.id}`);
    // }
  
    req.body.comment.author = req.user._id;
    let comment = await Comment.create(req.body.comment);
    // assign comment to a shot
    shot.comments.push(comment);
    shot.save();
    // eval(require('locus')); 
    //req.session.success = "Comment created successfully";
    if (req.xhr) {
    res.json(comment);  
    } else {
      res.redirect(`/shots/${shot.id}`);
    }
  },
  async commentUpdate(req, res, next) {
   let comment = await Comment.findByIdAndUpdate(req.params.comment_id, {new: true}, req.body.comment);
   //if (req.xhr) {
   res.json(comment);
   //} else {
    //res.redirect(`/shots/${req.params.id}`);
   //}
  },
  async commentDestroy(req, res, next) {
    await Shot.findByIdAndUpdate(req.params.id, {
        $pull: { comments: req.params.comment_id }
    });
    await Comment.findByIdAndDelete(req.params.comment_id);
    //req.session.success = "Comment removed successfully"; 
    res.redirect(`/shots/${req.params.id}`);
  }
 }

