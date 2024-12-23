const express = require("express");
const router = express.Router();
const upload = require('../middleware/imageUpload');
const UserController = require('../controllers/UserController');


router.get("/", UserController.index);

router.get("/add", UserController.create);

router.post("/add", upload.single('image'), UserController.store);

// edit user
router.get("/edit/:id", UserController.edit);

// update user
router.post("/update/:id", upload.single('image'), UserController.update);

//delete
router.get('/delete/:id', UserController.delete);

module.exports = router;
