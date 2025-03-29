require("dotenv").config();
const User = require("../model/User");

//update User details

exports.manageUsers = async (req, res) => {
    try{
        const userId = req.params.id;
        const updatedData = req.body.editingUser;
        await delete updatedData._id;
        console.log("savecd", updatedData)
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true });

        if(!updatedUser){
            console.log("hello",updatedData)
            return res.status(404).send({message:'User not found'});
        }
        res.status(200).send({message:'User Updated Successfully',updatedUser});


    }
    catch(error){
        res.status(500).send({message:'Error Updating user', error});
    }
}

// delete user
exports.deleteUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser){
            return res.status(404).send({message:'User not found'});
        }
        res.status(200).send({message:'User Deleted Successfully'});
    }
    catch(error){
        res.status(500).send({message:'Error Deleting user', error});
    }
}
