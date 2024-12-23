const CreateUser = require("../Actions/Users/CreateUser");
const FetchAllUser = require("../Actions/Users/FetchAlUser");
const FetchSingleUser = require('../Actions/Users/FetchSingleUser');
const UpdateUser = require('../Actions/Users/UpdateUser');
const DeleteUser = require('../Actions/Users/DeleteUser');
const fs = require('fs');

class UserController {

  async index(req, res) {
    const users = await FetchAllUser.execute();

    if(users){

      
      return res.render("users/index", {
        title: "Home Page",
        users: users,
      });
    }
    
    return res.render("users/index", {
      title: "Home Page",
      users: '',
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
    
    if(await UpdateUser.execute(req)){
      req.session.message = {
        type: 'success',
        message: "User Details Updated"
      }
      
      return res.redirect('/');
    }
    
    req.session.message = {
      type: 'danger',
      message: "Cannot Update User"
    }
    return res.redirect('/');
  }

  async delete(req, res) {
    
    if(await DeleteUser.execute(req)){

      req.session.message = {
        type: 'success',
        message: "User Deleted"
      }
      return res.redirect('/');
    }

    req.session.message = {
      type: 'danger',
      message: "Problem deleting user"
    }

    return res.redirect('/');
  }
  
}

module.exports = new UserController();
