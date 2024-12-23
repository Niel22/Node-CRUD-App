const CreateUser = require("../Actions/Users/CreateUser");
const FetchAllUser = require("../Actions/Users/FetchAlUser");
const FetchSingleUser = require('../Actions/Users/FetchSingleUser');
const fs = require('fs');

class UserController {
  async index(req, res) {
    const users = await FetchAllUser.execute();

    return res.render("users/index", {
      title: "Home Page",
      users: users,
    });
  }

  async create(req, res) {
    res.render("users/add_users", { title: "Add User" });
  }

  async store(req, res) {
    if (await CreateUser.execute(req)) {
      req.session.message = {
        type: "success",
        message: "User created Successfully",
      };

      return res.redirect("/");
    }
    
    req.session.message = {
      type: "danger",
      message: "Problem occured while trying to create user",
    };

    return res.redirect("back");
  }

  async edit(req, res) {
    const user = await FetchSingleUser.execute(req.params.id);

    if (user) {
      return res.render("users/edit_user", {
        title: "Edit User",
        user: user,
      });
    }

    req.session.message = {
      type: "danger",
      message: "User not found",
    };
    return res.redirect("/");
  }

  async update(req, res) {
    try {
      let id = req.params.id;
      let new_image = "";

      const user = await User.findById(id);

      if (req.file) {
        new_image = req.file.filename;

        try {
          fs.unlinkSync("./public/assets/img/uploads" + user.image);
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
  }

  async delete(req, res) {
    try {
      let id = req.params.id;
      const user = await User.findByIdAndDelete(id);

      if (user && user.image != "") {
        try {
          fs.unlinkSync("./public/assets/img/uploads/" + user.image);
        } catch (error) {
          console.log(error);
        }
      }

      req.session.message = {
        type: "success",
        message: "User deleted",
      };

      res.redirect("/");
    } catch (error) {
      req.session.message = {
        type: "danger",
        message: "User not found",
      };

      res.redirect("/");
    }
  }
}

module.exports = new UserController();
