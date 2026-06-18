require("dotenv").config();
const express =require("express");
const connectDB= require("./src/config/database");
const app = express();
const cookieParser =require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const appRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");
const requestRouter = require("./src/routes/request")
const userRouter = require("./src/routes/user")


app.use("/", appRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);




connectDB().then(() => {
    console.log("Database connected sucessfully");
    app.listen(7777, () => {
    console.log("server is running at port 7777");
});
})

.catch(err => {
    console.log("database cannot be connected!!!");
    console.log(err); 

});


  
