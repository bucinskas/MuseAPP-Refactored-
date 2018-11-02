// const User = require("../models/user");
// const Shot = require("../models/shot");
const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({'dest': 'uploads/'});
const passport = require("passport");
const {postRegister,
       postLogin,
       getLogout,
       displayAllArtists,
       getRegister,
       getLogin,
       getArtist,
       updateUser
      } = require('../controllers');
const {asyncErrorHandler} = require('../middleware');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect("/shots");
});

/* GET register. */
router.get('/register', getRegister);

/* POST REGISTER . */
router.post('/register', upload.single('avatar'), asyncErrorHandler(postRegister));

/* GET login */
router.get('/login', getLogin);

/* POST login */
router.post('/login', postLogin);

/* get logout */
router.get('/logout', getLogout);

// get ALL ARTISTS DISPPLAY 
router.get('/artists', displayAllArtists);

// get USER PROFILES DISPLAY

router.get('/users/:id', getArtist); 

/* get PROFILE */
// prepopulated form 
router.get('/profile', (req, res, next) => {
  res.send("works");
});

/* PUT PROFILE/:user_id */
router.put('/profile/:user_id', updateUser);


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
