const express = require('express');
const requestRouter = express.Router();
const User = require("../../models/user");
const { userAuth } = require("../../middlewares/auth");

requestRouter.post("/sendConnectionRequest",userAuth, async (req , res) => {
    const user = req.user;
    //Sending a connection request

    console.log("sending a connection request");

    res.send(user.firstName +" "+  "is sending the connection Request ");
});

module.exports =requestRouter;