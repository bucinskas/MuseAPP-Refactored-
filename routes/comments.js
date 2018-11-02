const express = require('express');
const router = express.Router({mergeParams: true});
const {asyncErrorHandler,
       isCommentAuthor,
        isLoggedIn } = require('../middleware');
const {
  commentCreate,
  commentUpdate,
  commentDestroy
} = require("../controllers/comments");


/* POST comments CREATE /posts/:id/comments */
router.post('/', isLoggedIn, asyncErrorHandler(commentCreate));

/* UPDATE comments :id /comments/:comment_id */
router.put('/:comment_id', isLoggedIn, isCommentAuthor, asyncErrorHandler(commentUpdate));

/* delete comments :id /posts/:comment_id */
router.delete('/:comment_id', isLoggedIn, isCommentAuthor, asyncErrorHandler(commentDestroy));  

module.exports = router;     