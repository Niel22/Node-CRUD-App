const User = require("../../models/users");
const fs = require('fs');

class UpdateUser{

    async execute(req){

        try{
            let id = req.params.id;
            let new_image = '';

            const user = await User.findById(id);
            if(req.file){
                new_image = req.file.filename;
                try{

                    fs.unlinkSync('./public/assets/img/uploads/' + user.image);
                }catch(errror){
                    console.log(error.message);
                }
            }else{
                new_image = user.image;
            }

            await User.findByIdAndUpdate(id, {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                image: new_image
            })

            return true;
        }catch(error){
            console.log(error.message);
            return false;
        }
    }
}
module.exports = new UpdateUser();