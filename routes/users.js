const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({'dest': 'uploads/'});



const {asyncErrorHandler,
      userProfileOwnership} = require("../middleware");

const { getArtist,
        getAllArtists,
        updateProfile,
        getProfileEdit
  } = require("../controllers/users");
  



// get USER PROFILES DISPLAY

router.get('/:id', getArtist); 


router.get("/", asyncErrorHandler(getAllArtists));

/* get PROFILE */
// prepopulated form 
//router.get('/profile/:id', userProfileOwnership, displayProfile);


/* get form to edit PROFILE/:user_id */
router.get('/:id/edit', userProfileOwnership, getProfileEdit);


/* PUT PROFILE/:user_id */
router.put('/:id', userProfileOwnership, upload.single('image'), asyncErrorHandler(updateProfile));






  module.exports = router;