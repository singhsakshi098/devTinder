require("dotenv").config();

const express =require("express");

const connectDB= require("./src/config/database");
const app = express();
const User=require("./models/user");

app.use(express.json());

app.post("/signup",async (req,res) => {
    
  // creating a new instance of the user model
    const user =new User(req.body);

    try{
    await user.save();
    res.send("user added successfully");
    } catch (err){
        res.status(400).send("Error saving the user:" + err.message);
    }
    

});

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


  
