const multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/img/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
});

module.exports = upload;