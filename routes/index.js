const User = require("../models/user");
const Shot = require("../models/shot");
const express = require('express');
const router = express.Router();
const passport = require("passport");
const {postRegister,
       postLogin,
       getLogout,
       getRegister,
       getLogin,
      } = require('../controllers');
const {asyncErrorHandler,
       userProfileOwnership} = require('../middleware');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect("/shots");
});


/* GET register. */
router.get('/register', getRegister);

/* POST REGISTER . */
router.post('/register', asyncErrorHandler(postRegister));

/* GET login */
router.get('/login', getLogin);

/* POST login */
router.post('/login', postLogin);

/* get logout */
router.get('/logout', getLogout);


/*  GET forgot-pw */
router.get('/forgot-pw', (req, res, next) => {
  res.send("GET /forgot-pw");
});


/*  PUT forgot-pw */
router.put('/forgot-pw', (req, res, next) => {
  res.send("PUT /forgot-pw");
});


/*  GET reset-pw */
router.get('/reset/:token', (req, res, next) => {
  res.send("GET /reset/:token");
});

/*  PUT reset-pw */
router.put('/reset/:token', (req, res, next) => {
  res.send("GET /reset/:token");
});



module.exports = router;
