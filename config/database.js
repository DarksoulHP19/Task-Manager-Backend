const mongoose=require("mongoose");
require("dotenv").config();

exports.dbConnection=()=>{
    console.log("...")
    mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    // If the connection is successful, log a success message
    .then(() => console.log("DB CONNECTION SUCCESS"))
    // If there are issues connecting to the database, log an error message and exit the process
    .catch((err) => {
        console.log("DB CONNECTION ISSUES");
        console.error(err.message);
        process.exit(1);
    });
};