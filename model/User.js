// Schema for User

const { default: mongoose } = require("mongoose");
const Task = require("./Task");

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
        trim:true
    },

    email:{
        type:String,
        require:true,
        trim:true
    },

    password:{
        type:String,
        require:true,
    },
    userRole:{
        type:String,
        enum:["Coordinator","Intern","Mentor","User"],
        require:false,
    },

    // if mentor and coordinator so then it will be none .
    tasksArr:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
        require:false
    }],
})


module.exports=mongoose.model("User",userSchema);