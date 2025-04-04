const { default: mongoose } = require("mongoose");

const TaskSchema=new mongoose.Schema({

// task_id will be auto generated by mongodb

   
    groupId:{
        type:String
    },

    groupMentor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },


// task description
// taskDescription:{
//     type:String,
//     require:true
// },


    groupMembers:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User",
        require:true
    }],

    tasks : [{
        description:{
            type:String,
            require:true
        },
        is_completed :{
            type:Boolean,
            default:false
        },
    }]
})


module.exports=mongoose.model("Task",TaskSchema);