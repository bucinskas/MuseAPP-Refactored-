const User = require("../models/user");
const Shot = require("../models/shot")
const Comment = require("../models/comment")
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: 'dnau0mzjg',
  api_key: '591971121348592',
  api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
  async getAllArtists(req, res, next) {

    let users = await User.find({}); 
    res.render("users/index", {users});
  },
  async getArtist(req, res, next) {
    let user = await User.findById(req.params.id);
    let shots = await Shot.find().where('author').equals(user._id).populate("author").exec(); 
    let foundComments = await Comment.find().where('author').equals(user._id);
    let foundLikes = await Shot.find({likes: user._id});
    res.render("users/show", {user, shots,  comments: foundComments.length, likes: foundLikes.length });
  },
  async getProfileEdit(req, res, next) {
    let user = await User.findById(req.params.id);
    res.render("users/edit", {user});
  },
  async updateProfile(req, res, next) {
    let updateUser = await User.findById(req.params.id);
    
    updateUser.username = req.body.username 
    updateUser.email = req.body.email; 
    updateUser.firstName = req.body.firstName; 
    updateUser.bio = req.body.bio;
    updateUser.location = req.body.location;


    if(req.file){
      // CLOUDINARY
    //cloudinary.config(cloudinaryConf);
  
      // set image location to correct folder on Cloudinary
 
      const public_id = "sl-" + process.env.ENV_ID + "/avatars/" + req.file.filename;
      // delete previous image (if one existed) then upload the new one
      if(updateUser.avatarId){
          await cloudinary.v2.uploader.destroy(updateUser.avatarId);
      }
      
      // Upload the image to Cloudinary and wait for a response
      await cloudinary.v2.uploader.upload(req.file.path, {"width":400,"height":400,"crop":"crop", "gravity": "face", "radius": "max", public_id: public_id}, async function(err, result) {
          if(err) {
              req.session.error = "There was a problem uploading your profile picture, please try again"; 
              return res.redirect("/users/" + updateUser._id + "/edit");
          }
          // add cloudinary url for the image to the newUser
          updateUser.avatar = result.secure_url;
          // add image's public_id to newUser object
          updateUser.avatarId = result.public_id;
          
        });
      }
    updateUser.save()
    req.login(updateUser, function(err) {
      if (err) return next(err)
  
      console.log("After relogin: ");
      console.info(req.user);
    });
    req.session.success = "Your account has been updated";
    res.redirect(`/users/${updateUser.id}/edit`)
  }
}