const mongoose =require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
    {
    firstName:{
        type:String,
        required:true,
        index:true,
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
        enum: {
            values: ["male", "female", "other"],
            message: '{VALUE} is not a valid gender type'

        },
    //     validate(value) {
    //         if(["male" , "female" , "others"].indexOf(value) === -1){
    //             throw new Error ("Gender is not valid");
    //         }

    //     }
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

userSchema.index({firstName:1});
userSchema.index({gender:1});


// for jwt
    userSchema.methods.getjwt = async function () {
    const user = this;
    const token = await jwt.sign({ _id: this._id }, "DEVtinder2009", { expiresIn: "1d" })

    return token;
}

// for password validation
userSchema.methods.validatepassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isValidpassword = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isValidpassword;

}




module.exports = mongoose.model("user",userSchema);