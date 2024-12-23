const User = require('../../models/users');

class FetchAllUser{

    async execute(){
        try{
            const users = await User.find();
            
            return users;
        }catch(error){
            console.log(error.message);
            return false;
        }
    }
}

module.exports = new FetchAllUser();