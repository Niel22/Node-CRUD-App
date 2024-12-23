const User = require('../../models/users');

class FetchAllUser{

    async execute(){

        const users = await User.find();

        return users;
    }
}

module.exports = new FetchAllUser();