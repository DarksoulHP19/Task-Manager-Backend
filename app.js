const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
require("dotenv").config();
const userRouter = require("./routes/User");
const groupRouter = require("./routes/Group");
const taskRouter = require("./routes/Task");

const {dbConnection}=require("./config/database");
dbConnection();

app.use(cors());
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",userRouter);
app.use("/api/v1",groupRouter);
app.use("/api/v1",taskRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
app.get("/",(req,res)=>{
    return res.json({
        sucess:true,
    message:"your server is running up and running..."
    })
})