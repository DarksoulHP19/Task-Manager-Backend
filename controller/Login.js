// Login controller for authenticating users
require("dotenv").config();
const jwt = require('jsonwebtoken');

const User = require("../model/User");
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;
		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}
		console.log(email,password)
		// Find user with provided email
		const user = await User.findOne({ email });

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id, role: user.userRole },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user: {
					...user.toObject(),
					userRole: user.userRole || "User" // Ensure userRole is included
				},
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
}


// exports. login = async (req, res) => {

// 	const { email, password } = req.body;
//     try {
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) {
//             return res.status(401).json({ success: false, message: "Invalid credentials" });
//         }

//         const token = jwt.sign({ userId: user._id }, "!@#$%^&*()", { expiresIn: '365d' });

//         return res.status(200).json({
//             success: true,
//             message: `Welcome ${user.Name}`,
//             token,
//             user: {
//                 id: user._id,
//                 fullName: user.fullName,
//                 email: user.email,
//             },
//         });

//     } catch (error) {
//         return res.status(500).json({ success: false, message: "An error occurred", error: error.message });
//     }


// };