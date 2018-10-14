const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'MUTE' });
});

/* GET register. */
router.get('/register', (req, res, next) => {
  res.send("works");
});

/* POST REGISTER . */
router.post('/register', (req, res, next) => {
  res.send("works");
});

/* GET login */
router.get('/login', (req, res, next) => {
  res.send("works");
});

/* POST login */
router.post('/login', (req, res, next) => {
  res.send("works");
});

/* get logout */
router.get('/logout', (req, res, next) => {
  res.send("works");
});


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
router.get('/reset-pw', (req, res, next) => {
  res.send("GET /reset-pw/:token");
});





module.exports = router;
