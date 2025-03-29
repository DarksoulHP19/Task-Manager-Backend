const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../model/User");
exports.signup = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
            fullName,email,password            
		} = req.body;
		// Check if All Details are there or not
		if (
			!fullName ||
            !email ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Please Fill up All the Required Fields",
            });
        }
		

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }


		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in mongodb
		const user = await User.create({
			fullName,
            email,
            password: hashedPassword,
            userRole: "User"
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});

	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};
