require("dotenv").config();
const express =require("express");
const connectDB= require("./src/config/database");
const app = express();
const User=require("./models/user");
const {validateSignupData } = require("./src/utils/validation");
const bcrypt = require("bcrypt");
const cookieParser =require("cookie-parser");
const jwt = require("jsonwebtoken");


app.use(express.json());
app.use(cookieParser());

app.post("/signup",async (req,res) => {
     try{

    //validation of data 
    validateSignupData(req);
    const {firstName , lastName , emailId, password} = req.body;

    //Encrypt the password
    const  passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash);
 
    
  // creating a new instance of the user model
    const user =new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
        
    });

  
    await user.save();
    res.send("user added successfully");
    } catch (err){
        res.status(400).send("Error saving the user:" + err.message);
    }
    

});

app.post("/login", async(req,res) => {
    try{
        const {emailId , password } = req.body;

        const user =  await User.findOne({emailId: emailId});
        if (!user) {
            throw new Error("User not found");
        }

        const ispasswordValid =await bcrypt.compare(password , user.password);
        if(ispasswordValid) {

            //Create a JWT token 
            const token = await jwt.sign({_id: user._id}, "DEVtinder2009");
            console.log(token);

            //Add the token to cookie and send the response back to the user
            res.cookie("token", token);
            res.send("Login sucessfull!!");
        }
        else{ 
            throw new Error ("password is incorrect");
        }
    }
    catch (err){
        res.status(400).send("Error:" + err.message);
    }

});

app.get("/profile", async (req,res) =>{
    try{
    const cookies = req.cookies;

    const { token } = cookies;

    if(!token){
        throw new Error("Invalid Token");
    }

    const decodedMessage = await jwt.verify(token , "DEVtinder2009");

    const { _id} = decodedMessage;
    console.log("Logged in user is :" + _id);

    const user = await User.findById(_id);
    if(!user) {
        throw new Error("user not found");
    }
    res.send(user);
}

   catch (err){
    res.status(400).send("Error: " + err.message);

   }
    res.send("Reading Cookie");
    
})

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
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    

    try {
              const ALLOWED_UPDATES = [
          "about",
          "gender",
          "skills",
          "firstName",
          "lastName",
          "age"
      ];

      const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

      if (!isUpdateAllowed) {
          throw new Error("Update Not Allowed")
      }
      if(data?.skills.length>10){
        throw new Error("skills should be less than 10");
      }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { 
        returnDocument: "after",
        runValidators:true
     });
        console.log(user)
        res.send("User updated successfully")

    } catch (err) {
        res.status(400).send("Updation failed"+ err.message);
    }
})



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


  
