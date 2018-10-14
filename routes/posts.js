const express = require('express');
const router = express.Router();

/* GET posts index /posts. */
router.get('/', (req, res, next) => {
    res.send("CREATE /posts/index");
  });

/* GET posts new /posts/new */
router.get('/new', (req, res, next) => {
    res.send("/posts/new");
  });

/* POST posts CREATE /posts */
router.post('/', (req, res, next) => {
    res.redirect("CREATE /posts");
  });

/* GET posts :id /posts/:id */
router.get('/:id', (req, res, next) => {
    res.send("SHOW posts/:id");
  });

/* PUT posts :id /posts/:id/edit */
router.get('/:id/edit', (req, res, next) => {
    res.send("show /:id/edit");
  });

/* update posts :id /posts/:id */
router.get('/:id', (req, res, next) => {
    res.send("works");
  });

/* delete posts :id /posts/:id */
router.delete('/:id', (req, res, next) => {
  res.send("works");
})  

module.exports = router;