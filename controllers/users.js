const User = require("../models/user");
const Shot = require("../models/shot")
const Comment = require("../models/comment")


module.exports = {
  async getArtist(req, res, next) {
    let user = await User.findById(req.params.id);
    let shots = await Shot.find().where('author').equals(user._id).populate("author").exec(); 
    let foundComments = await Comment.find().where('author').equals(user._id);
    let foundLikes = await Shot.find({likes: user._id});
    res.render("users/show", {user, shots,  comments: foundComments.length, likes: foundLikes.length });
  },
//   async displayProfile(req, res, next) {
//     let user = await User.findById(req.params.id);
//     res.render("profile/index", {user});
//   },
  async getProfileEdit(req, res, next) {
    let user = await User.findById(req.params.id);
    res.render("users/edit", {user});
  },
  async updateProfile(req, res, next) {
    let updateUser = await User.findById(req.params.id);
    //eval(require('locus'));
    var changeFlag = false; //only update if a change has been made
    if(req.body.username !== updateUser.username) {  
    updateUser.username = req.body.username; changeFlag = true; } 
    updateUser.email = req.body.email; 
    updateUser.firstName = req.body.firstName; 
    if(req.body.bio !== updateUser.bio) {  
    updateUser.bio = req.body.bio; changeFlag = true; }
    
    updateUser.save()
    req.login(updateUser, function(err) {
      if (err) return next(err)
  
      console.log("After relogin: ");
      console.info(req.user);
    });
    req.session.success = "Your account has been updated";
    res.redirect(`/users/${updateUser.id}`)
  }
}