const express = require('express');
const router = express.Router();
const passport = require("passport");
const {postRegister,
       postLogin,
       getLogout} = require('../controllers');
const {asyncErrorHandler} = require('../middleware');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'MUTE' });
});

/* GET register. */
router.get('/register', (req, res, next) => {
  res.send("works");
});

/* POST REGISTER . */
router.post('/register', asyncErrorHandler(postRegister));


/* GET login */
router.get('/login', (req, res, next) => {
  res.send("login");
});

/* POST login */
router.post('/login', postLogin);

/* get logout */
router.get('/logout', getLogout);


/* get PROFILE */
router.get('/profile', (req, res, next) => {
  res.send("works");
});


/* PUT PROFILE/:user_id */
router.put('/profile/:user_id', (req, res, next) => {
  res.send("PUT /profile/:user_id");
});


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
