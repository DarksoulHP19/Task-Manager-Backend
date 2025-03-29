require("dotenv").config();

const User = require("../model/User");

exports.addRoles = async (req, res) => {
    const { email, role } = req.body;
    if (!email || !role) {
        return res.status(400).json({
            success: false,
            message: `Please Fill up All the Required Fields`,
        });
    }
 
    const user = await User.findOne({ email });
        
    if (!user) {
        return res.status(401).json({
            success: false,
            message: `User is not Registered with Us Please SignUp to Continue`,
        });
    }

    user.userRole = role;
    await user.save();

    return res.status(200).json({
        success: true,
        message: `Role added successfully`,
    });
};