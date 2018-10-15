const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({'dest': 'uploads/'});
const {asyncErrorHandler} = require("../middleware");
const {getShots,
      shotNew,
      shotCreate,
      shotDisplay,
      shotEdit,
      shotUpdate,
      shotDestroy} = require("../controllers/shots");

/* GET posts index /posts. */
router.get('/', asyncErrorHandler(getShots));

/* GET posts new /shots/new */
router.get('/new', shotNew);

/* POST posts CREATE /posts */
router.post('/', upload.array('images', 2), asyncErrorHandler(shotCreate));

/* GET posts :id /posts/:id */
router.get('/:id', asyncErrorHandler(shotDisplay));

/* GET FORM shots :id /shots/:id/edit */
router.get('/:id/edit', asyncErrorHandler(shotEdit));

/* update posts :id /posts/:id */
router.put('/:id', asyncErrorHandler(shotUpdate));

/* delete posts :id /posts/:id */
router.delete('/:id', asyncErrorHandler(shotDestroy));

module.exports = router;