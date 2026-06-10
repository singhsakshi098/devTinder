const mongoose =require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String,
        minLength:2,
        maxLength:50
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        validate(value) {
        if (!validator.isEmail(value)) {
         throw new Error("Invalid Email :" + value)
        }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value) {
        if (!validator.isStrongPassword(value)) {
         throw new Error("Enter a strong password :" + value)
        }
        }
    },
    age:{
        type:Number,
        min:18,

    },
    gender:{
        type:String,
        validate(value) {
            if(["male" , "female" , "others"].indexOf(value) === -1){
                throw new Error ("Gender is not valid");
            }

        }
    },
    about:{
        type:String,
        default: "this is a default about of the user",
    },
    skills:{
        type:[String],
    }

},

{
"timestamps": true,
}
);



module.exports = mongoose.model("user",userSchema);