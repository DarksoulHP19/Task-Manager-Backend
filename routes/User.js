//
const express = require('express');
const router = express.Router();
const {signup} = require('../controller/Signup')
const {login} = require('../controller/Login')
const {addRoles} = require('../controller/addRoles');
const { auth, isCoordinator } = require('../middleware/auth');
const { manageUsers, deleteUser } = require('../controller/manageUsers');
const { addGroup } = require('../controller/addGroup');
const { checkProgress } = require('../controller/Progress');
const User = require('../model/User');
/**
 * - register
 * - login
 * - forgot password
 * - reset password
 * 
 */


// Route for user login
router.post("/login", login)



// Route for user registration
router.post("/register", signup);

router.get("/getuser", async(req, res) => {
    let user=await User.find();
    res.send(user);
})
// Route for adding roles
router.post("/addRoles", auth ,isCoordinator, addRoles);
// Route for adding group
router.post("/addGroup", auth ,isCoordinator, addGroup);

//route for updating user details
router.put("/manageUsers/:id", auth, manageUsers);

//route for deleting user
router.delete("/deleteUser/:id", auth, deleteUser);

router.get("/checkProgress", checkProgress);

// Export the router for use in the main application
module.exports = router