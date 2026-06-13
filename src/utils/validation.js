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

module.exports ={
    validateSignupData,
}