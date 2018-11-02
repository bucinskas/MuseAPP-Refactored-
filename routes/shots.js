const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({'dest': 'uploads/'});
const {asyncErrorHandler,
      isLoggedIn,
      isShotAuthor} = require("../middleware");

const {getShots,
      shotNew,
      shotCreate,
      shotDisplay,
      shotEdit,
      shotUpdate,
      shotDestroy
    } = require("../controllers/shots");


const shotLike = require("./like");

/* GET shots index /shots. */
router.get('/', asyncErrorHandler(getShots));

/* GET shots new /shots/new */
router.get('/new', isLoggedIn, shotNew);

/* POST shots CREATE /posts */
router.post('/', isLoggedIn, upload.single('image'), asyncErrorHandler(shotCreate));

/* GET shots :id /shots/:id */
router.get('/:id', asyncErrorHandler(shotDisplay));

/* GET FORM shots :id /shots/:id/edit */
router.get('/:id/edit', isShotAuthor, asyncErrorHandler(shotEdit));

/* PUT shots :id /shots/:id */
router.put('/:id', isShotAuthor, upload.array('images', 2), asyncErrorHandler(shotUpdate));

/* delete shots :id /posts/:id */
router.delete('/:id', isShotAuthor, asyncErrorHandler(shotDestroy));

// shot like 

router.get('/:shotId/:id/like', shotLike); 

module.exports = router;