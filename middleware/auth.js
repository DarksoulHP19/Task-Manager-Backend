const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../model/User");

//auth
exports.auth = async (req, res, next) => {
    try{
        console.log("token--------------- : ")

        //extract token
        const token =  req.body.token || req.header("Authorization").replace("Bearer ", "");
        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }
        
        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log("token1",token)
            console.log("token decode:",decode);
            
            const user1= await user.findOne({email:decode.email});
            req.user = user1;
            req.body.user = user;
            console.log("user1",user1)
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:`Something went wrong while validating the token ${error.message}`,
        });
    }
}

//isIntern
exports.isIntern = async (req, res, next) => {
 try{
        if(req.user.userRole !== "Intern") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Interns only',
            });
        }
        next();
 }
 catch(error) {
    return res.status(500).json({
        success:false,
        message:'User role cannot be verified, please try again'
    })
 }
}


//isMentor
exports.isMentor = async (req, res, next) => {
    try{
           if(req.user.userRole !== "Mentor") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Mentor only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }


//isCoordinator
exports.isCoordinator = async (req, res, next) => {
    console.log("req.user.userRole",req.user.userRole)
    try{
           if(req.user.userRole != "Coordinator") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Coordinator only',
                   data:req.user
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }