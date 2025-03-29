const jwt = require('jsonwebtoken');
const User = require('../model/User');

//Middleware to authenticate the user
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: decode._id, 'tokens.token': token});
        if(!user) {
            throw new Error();
        }
        req.user = user;
        next();
    }
    catch(error){
        res.status(401).json({message: "Please authenticate"});
    }


};


// //Middleware to check if the user is mentor
// const mentorMiddleware = (req, res, next) => {
//     if (req.user.role !== 'mentor') {
//         return res.status(403).send({ error: 'Access denied. Only mentors can perform this action.' });
//     }
//     next();
// };

module.exports = { authMiddleware, mentorMiddleware };