
const multer = require('multer');

// Set file name
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + "-" + (Math.floor(Math.random()*90000) + 10000));
  }
});

// Restrict file types
const imageFilter = function (req, file, callback) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/i)) {
        req.fileValidationError = 'Only image files (.jpg .jpeg .png .webp) are allowed';
        return callback(null, false);
    }
    callback(null, true);
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 10485760 }, //10MB (error handled in app.js)
    fileFilter: imageFilter
});

// ==========================
// MODULE.EXPORTS
// ==========================
module.exports = upload;