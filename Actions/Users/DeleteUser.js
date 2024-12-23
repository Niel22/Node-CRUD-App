const User = require('../../models/users');

class DeleteUser{

    async execute(req){

        try{

            let id = req.params.id;
            
            const user = await User.findByIdAndDelete(id);

            return true;
        }catch(error){
            console.log(error.message);
            return false;
        }

    }
}

module.exports = new DeleteUser();