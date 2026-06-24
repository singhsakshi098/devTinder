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
    },

    photoUrl: {
    type: String,
    default: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAwQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADUQAAICAQEGBAQEBQUAAAAAAAABAgMEEQUUITFBkRIiUVQyYXHBE2KBsVJy0fDxFSMkNEL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APrYAKgAAAAAAAAAebLIVwc7JKMV1YHoEVkbZhHVY9bm/wCKfBHHLamXJ8JqP8sUBYTBXo7TzI8re8UdNO2Z6pX1Jr1hwfYCZBqx8irJh4qZqS6rk0bQAAAAAAAAAAAAAAAAAAAAAAAYbSTbeiSA1ZN8Mepzs4LourZXsrKtybPFY+HSK5I97QynlXtpvwR4QXy9TlKgAAAAA91WTqmp1zcZLk0T+z86OVHwyWlq5r1+aK6e6bJU2RnW9JReqAtYNWPdHIphbDlJcvRm0igAAAAAAAAAAAAAAAAAAHFta78HDko/FY/CvudpD7fn56YdEnLT6/4YESACoAAAAAAAAltg3eeyiXXzx/Z/YmCubLn4M6r5vR/qWMlUAAAAAAAAAAAAAAAAAAAhNvL/AJFT/J9ybIrb1etdVi6Np/r/AIAhgAaQABAAAAAAdGz1rm0/zosxX9jw8edGXSCcn+y/csAqgAIAAAAAAAAAAAAAAAABpy6d4xp1dWuH1NwAqTTTaa0aMErtjCcW8muOqfxpdPmRRQAAQAAAyYOvZ+HLKtXi4VL4n9gqS2LQ66JWtcbWtNfREiYS0WnJeiMkAAAAAAAAAAAAAAAAAAAAAA01Wj5PmQ+dst6uzF5dYf0Jg1ztqr42WwgvzSSAq0ouDcZRcWujME9flbOtWlzhZpy8ren6nFZ/pjfllevpx/cqYjhqd0Y7M180r39VoduNfsyppwaUujlFt92DHHh7Mtv0lZ4q6ur6v6E5VVCmCrrioxXI8wyKLfgthJ/KS17G0igAAAAAAAAAAAAAAAAAAAfXkRmbtWFT8FCU5rnLmkB33W10w8ds1CPqyNyNsrjHHrb/ADT/AKEVbZO2Xitk5S9WzwVHRdm5NvxWyS9FwRz9ddePqAAAAAAANF14m6nKvpf+3bJfLXU0gCVo2xNNLIqUl/FDgSePk05C1qmm+seqKuZi3BpxbTXVcwLaCHwtrNNQy3w5Ka+5LxalFST1T4poisgAAAAAAAAAAP71BGbZy3XDd4PSUl536L0A0bT2g7W6aH5FwlJdfoRY+QKAACAAAAAAAAAAAAADJ2bPzpYj8Mm3U3xj6fQ4ggq2QlGcVKMk01qmuqPRB7HzPw7PwJteCT8vyfoThAAAAAAAAB5snGuuU5corVlWusldbOyfOT1J7a83DBmlzk1HQrwgAAqAAAAAAAAAAAAAAAAAAAyuD19CzYV+8Ytdr+JrzfXqVgmdgz8ULa9f/WunpqKqVBhGSAAAAAA13VV2w8NsFNLjozQsHF0/69fYAQZ3LF9vX2G5Yvt6+wBQ3LF9vX2G5Yvt6+wADcsX29fYbli+3r7AANyxfb19huWL7evsAA3LF9vX2G5Yvt6+wADcsX29fYbli+3r7AANyxfb19huWL7evsAA3LF9vX2G5Yvt6+wADcsX29fY200U0qUqa4wb56GAKNwAIAAA/9k="
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