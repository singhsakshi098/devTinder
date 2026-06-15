const validator =require('validator');

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password} = req.body;

    if(!firstName.length || !lastName.length ) {
        throw new Error("All fields are required");
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error("Invalid email address");
    }
    else if(!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }

};

const validateEditProfileUpData = (req) => {
    const allowedEditFields = ["firstName" , "lastName" , "emailId", "photoUrl" , "gender" ,"age" , "about", "skills"

    ];
    const isEditAllowed = Object.keys(req.body).every(field => 
      allowedEditFields.includes(field)
    );
    return isEditAllowed ;
};



module.exports ={
    validateSignupData,
    validateEditProfileUpData,
}