const Comment = require("../models/comment"); 
const Shot = require("../models/shot"); 



module.exports = {
    asyncErrorHandler: (fn) => 
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
              .catch(next);
        },
    isCommentAuthor: async (req, res, next) => {
      let comment = await Comment.findById(req.params.comment_id);
      if(comment.author.equals(req.user._id)) {
          return next(); 
      }
      req.session.error = "You don't have permission to do that";
      return res.redirect("/shots");
    },
    isShotAuthor: async(req, res, next) => {
      let shot = await Shot.findById(req.params.id);
      if(shot.author.equals(req.user._id)) {
          return next();
      } 
      req.session.error = "You don't have permission to do that";
      return res.redirect("/shots")
    },
    isLoggedIn: async (req, res, next) => {
        if(req.isAuthenticated()) {
          return next();
        }
        req.session.error = "You need to be logged in to do that. Please create your account or log in and try again";
        res.redirect("/login");
    },
        
    
  }