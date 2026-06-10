require("dotenv").config();

const express =require("express");

const connectDB= require("./src/config/database");
const app = express();
const User=require("./models/user");

app.use(express.json());

//GET user by email
app.get("/user", async (req,res) =>{
    const userEmail = req.body.emailId;


    try{
    const users=await User.find({emailId: userEmail})
    if(users.length===0) {
        res.status(400).send("User not found");

    }
    else{
         res.send(users);
    }
    
    } catch (err){
        res.status(400).send("something went wrong");
    }
});

// Feed API - get all the users form the database
app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({})
        if (users.length === 0) {
            res.send("No user found")
        } else {
            console.log(users);
            res.send(users)
        }
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }

})


//user API to find the single user by by email
app.get("/user", async (req, res) => {
        //getting user from body
        const userEmail = req.body.emailId;
        try {
            const users = await User.findOne({ emailId: userEmail })
            if (users.length === 0) {
                res.status(400).send("User not found")
            } else {

                // console.log(users)
                res.send(users)
            }
        }
        catch (err) {
            res.status(400).send("Something went wrong")
        }
})

//delete user API - deleting a user by its id
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        const users = await User.findByIdAndDelete(userId);
        res.send("User deleted Successfully")

    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

// patch user API - updating the data of user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try {
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "before" });
        console.log(user)
        res.send("User updated successfully")

    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})


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


  
