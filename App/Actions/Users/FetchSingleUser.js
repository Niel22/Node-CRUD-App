const User = require("../../models/users");

class FetchSingleUser {
  async execute(id) {
    try {
      const user = await User.findById(id);

        return user;
    } catch (err) {
        console.log(err.message);
      return false;
    }
  }
}

module.exports = new FetchSingleUser();