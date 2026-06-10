const mongoose =require('mongoose');

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
        lowercase: true
    },
    password:{
        type:String,
        required:true,
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