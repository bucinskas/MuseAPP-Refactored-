const User = require("../models/user");
const Shot = require("../models/shot");
const passport = require('passport');
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: 'dnau0mzjg',
  api_key: '591971121348592',
  api_secret: process.env.CLOUDINARY_SECRET
});


module.exports = {
  async displayAllArtists(req, res, next) {
    let users = await User.find({}); 
    res.render("artists", {users});
  },
  getRegister(req,res, next) {
      res.render("register");
  },
  getLogin(req, res, next) {
      res.render("login");
  },
  async postRegister(req, res, next) {
    const newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        email: req.body.email,
        bio: req.body.bio,
        location: req.body.location
    });
    await User.register(newUser, req.body.password);
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/register'
     })(req, res, next); // need to call a higher order function on passport.authenticate
  },
  postLogin(req, res, next) {
    passport.authenticate('local', {
     successRedirect: '/',
     failureRedirect: '/login',
    })(req, res, next); // need to call a higher order function on passport.authenticate
  },
  getLogout(req, res, next) {
    req.logout();
    res.redirect('/');
  }
}

