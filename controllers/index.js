const User = require("../models/user");
const Shot = require("../models/shot");
const passport = require('passport');
const Joi = require('joi');

const registerSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(7)
    .max(30)
    .required()
    .error(
      new Error(
        'Username muse be alphanumeric and be between 7 and 30 characters'
      )
    ),
    firstName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .min(3)
    .max(15)
    .required()
    .error(
      new Error(
        'Your first name must contain only letters'
      )
    ),
    password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required()
    .error(
      new Error(
        'Password cannot be empty'
      )
    ),
});


module.exports = {
  getRegister(req,res, next) {
      res.render("register");
  },
  getLogin(req, res, next) {
      res.render("login");
  },
  async postRegister(req, res, next) {
    const result = await Joi.validate(req.body, registerSchema);
    if (result.error) {
      req.session.error = result.error.message;
      res.redirect('/register');

    }

    const userEmail = await User.findOne({
      email: req.body.email
    });

    if (userEmail) {
      req.session.error = 'This email address is already in use.'
      res.redirect('/register');
     return;
    }


    const userName = await User.findOne({
      username: req.body.username
    });

    if (userName) {
      req.session.error = 'This username is already in use.';
      res.redirect('/register');
      return;
    }

    const newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      email: req.body.email,
      bio: req.body.bio,
      location: req.body.location
      });
    
      User.register(newUser, req.body.password);
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/register',
        failureFlash: true
       })(req, res, next); // need to call a higher order function on passport.authenticate
  },
  postLogin(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (!user) { 
        req.session.error = "Incorrect username or password. Please try again."
        res.redirect('back');
        return;
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');

      });
    })(req, res, next);// need to call a higher order function on passport.authenticate
  },
  getLogout(req, res, next) {
    req.logout();
    res.redirect('/');
  }
}

