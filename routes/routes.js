const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");
const fs = require("fs");

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

// edit user
router.get("/edit/:id", async (req, res) => {
  try {
    let id = req.params.id;

    const user = await User.findById(id);

    res.render("edit_user", {
      title: "Edit User",
      user: user,
    });
  } catch (error) {
    req.session.message = {
      message: "User Not Found",
      type: "danger",
    };

    res.render("errors/_404", { title: "Page Not Found" });
  }
});

// update user
router.post("/update/:id", upload, async (req, res) => {
  try {
    let id = req.params.id;
    let new_image = "";

    const user = await User.findById(id);

    if (req.file) {
      new_image = req.file.filename;

      try {
        fs.unlinkSync("./uploads/" + user.image);
      } catch (error) {
        console.log(error);
      }
    } else {
      new_image = user.image;
    }

    await User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: new_image,
    });

    req.session.message = {
      type: "success",
      message: "User updated",
    };

    res.redirect("/");
  } catch (error) {
    req.session.message = {
      type: "danger",
      message: "User not found",
    };

    res.redirect("/");
  }
});

//delete
router.get('/delete/:id', async (req, res) => {
  try{

    let id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    
      if(user && user.image != ''){
        try{
          fs.unlinkSync('./uploads/'+ user.image);
        }catch(error){
          console.log(error);
        }
      }

    req.session.message = {
      type: 'success',
      message: 'User deleted'
    }

    res.redirect('/');
  }catch(error){
    req.session.message = {
      type: 'danger',
      message: 'User not found'
    }

    res.redirect('/');
  }

});

module.exports = router;
