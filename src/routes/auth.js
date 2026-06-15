const express = require('express');
const authRouter = express.Router();
const {validateSignupData } = require("../utils/validation");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


authRouter.post("/signup",async (req,res) => {
     try{

    //validation of data 
    validateSignupData(req);
    const {firstName , lastName , emailId, password} = req.body;

    //Encrypt the password
    const  passwordHash = await bcrypt.hash(password,10);
    
 
    
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

authRouter.post("/login", async(req,res) => {
    try{
        const {emailId , password } = req.body;

        const user =  await User.findOne({emailId: emailId});
        if (!user) {
            throw new Error("User not found");
        }

        const ispasswordValid =await user.validatepassword(password)
        if(ispasswordValid) {

            //Create a JWT token 
            const token = await user.getjwt();
           

            //Add the token to cookie and send the response back to the user
            res.cookie("token", token, {
            expires: new Date(Date.now() +8 * 3600000000),
            });
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






module.exports = authRouter;