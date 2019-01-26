const Shot = require("../models/shot");
const Comment = require("../models/comment");
const User = require("../models/user");

module.exports = {
  async commentCreate(req, res, next) {
    if (!req.body.comment.body) {
      return res.status(500).json({'bodyError': 'Comment must be filled out.'});
    }
    let shot = await Shot.findById(req.params.id);
   // ONLY ONE COMMENT PER POST
    // let haveCommented = shot.comments.filter(comment =>{
    //   return comment.author.equals(req.user._id);
    // }).length;
    // if(haveCommented) {
    //   req.session.error = "Sorry you can only create one comment per post";
    //   return res.redirect(`/shots/${shot.id}`);
    // }
    req.body.comment.author = req.user._id;
    //req.body.comment.body = req.sanitize(req.body.comment.body);
    let comment = await Comment.create(req.body.comment);
    // assign comment to a shot
    await shot.comments.push(comment._id);
    await shot.save();
    let author = req.user;
    res.status(200).json({shot: shot, comment: comment, author: author});
  },
  async commentUpdate(req, res, next) {
   let comment = await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, {new: true});
   let shot = await Shot.findById(req.params.id);
   let author = req.user;
   res.status(200).json({shot: shot, comment: comment, author: author});
  },
  async commentDestroy(req, res, next) {
    await Shot.findByIdAndUpdate(req.params.id, {
        $pull: { comments: req.params.comment_id }
    });
    await Comment.findByIdAndRemove(req.params.comment_id);
    // let comment = await Comment.findById(req.params.comment_id);
    // await comment.remove();
    //req.session.success = "Comment removed successfully"; 
    res.status(200).json({message: 'Comment deleted successfully'});
   // res.redirect(`/shots/${req.params.id}`);
  }
 }

