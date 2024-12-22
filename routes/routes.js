const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");

// Image upload
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("image");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.render("index", {
      title: "Home Page",
      users: users,
    });
  } catch (error) {
    res.json({ message: error.message, type: "danger" });
  }
});

router.get("/add", (req, res) => {
  res.render("add_users", { title: "Add User" });
});

router.post("/add", upload, async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });
    await user.save();

    req.session.message = {
      type: "success",
      message: "User created Successfully",
    };

    res.redirect("/");
  } catch (error) {
    res.json({ message: error.message, type: "danger" });
  }
});

module.exports = router;
