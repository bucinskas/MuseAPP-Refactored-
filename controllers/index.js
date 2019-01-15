const User = require("../models/user");
const Shot = require("../models/shot");
const passport = require('passport');



module.exports = {
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

