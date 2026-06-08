const express =require("express");

const connectDB= require("./src/config/database");
const app = express();

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
  
