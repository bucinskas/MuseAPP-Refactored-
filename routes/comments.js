const express = require('express');
const router = express.Router({mergeParams: true});

/* GET comments index /posts/:id/comments. */
router.get('/', (req, res, next) => {
    res.send("CREATE /posts/index");
  });

/* POST comments CREATE /posts/:id/comments */
router.post('/', (req, res, next) => {
    res.redirect("CREATE /posts");
  });

/* GET comments edit /posts/:id/:comment_id/edit */
router.get('/:id/edit', (req, res, next) => {
    res.send("show /:id/edit");
  });

/* PUT comments :id /comments/:comment_id */
router.get('/:id', (req, res, next) => {
    res.send("works");
  });

/* delete comments :id /posts/:comment_id */
router.delete('/:id', (req, res, next) => {
  res.send("works");
})  

module.exports = router;