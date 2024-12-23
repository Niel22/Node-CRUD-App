const User = require('../../models/users');

class CreateUser{

    async execute(req){

        try{
            const user = await new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                image: req.file.filename
            }).save();
            
            return true;
        }catch(error){
            console.log(error.message);
            return false;
        }
    }
}

module.exports = new CreateUser();