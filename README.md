-created a cluster on mongodb official website and (mongo altas);
-installed mongoose library;
-connect application to the database<"Connection url"/devTinder;
-called connectDB function and connect to database before starting application on 7777;
-created a UserSchema and usermodel;
-created post/signup api tp add data iin the database
-pushed some documents using API call form postman;
-error handling using try , catch 
-js object vs json 
-add the express.json
-make your signup API dynamic to recieve data from the end user
user.findOne with duplicate email id so which one will returned
-API- Feed API -GET/feed -get all the users from the database
-api - bget user by id
-created a delete user api
-difference between patch and put
-api - updated a user by patch
-try to learn mongo db documentation
-explored data sanitization and schema validation features in Mongoose. These features help enforce data integrity, improve data consistency, and add extra layers of validation to ensure that the data saved in MongoDB adheres to specific rules.

## Schema Types in Mongoose
Mongoose provides various schema types and properties that can be used to enforce data validation and sanitization. Key properties include:

### 1. `required` Ensures that a field must be provided before a document is saved.
### 2. `unique`
- Specifies that the value in the field must be unique across the collection.
### 3. `default`
- Sets a default value for a field if no value is provided.
```javascript
about: {
        type: String,
        `default: "Dev is in search for someone here"`
    }
```

### 4. `lowercase`
- Converts the string value to lowercase before storing it in the database.
### 5. `trim`
- Removes leading and trailing whitespace from a string before saving it
### 8. `validate`
- Allows for custom validation logic to be applied to a field. This can include custom functions for more complex validation needs.
## 9. `timestamps`
- Automatically adds `createdAt` and `updatedAt` fields to the schema, tracking when the document was created and last modified.

--add API level validation on patch req and signup post api
--DATA VALIDATION :> add api validation for each field 
--Intalled validator by npm i validator
-- explored validator library function and use validator function for password & email

--## Benefits of Using Validator.js
- **Improved Data Integrity**: Ensures only valid data is stored in the database.
- **Enhanced Security**: Prevents common vulnerabilities caused by invalid inputs.
- **Ease of Use**: Simple methods for complex validations reduce development time.
- **Standard Compliance**: Ensures data adheres to industry standards (e.g., email formatting, URL structure)


## Conclusion
Using `validator.js` enhances the robustness of input validation in the DevTinder app. It simplifies the process of ensuring data consistency and security, particularly for critical fields like email, photo URLs, and passwords.

--NEVER trust req.body
-validate data in Signup API 
-Install bcrypt package
--Create PasswordHash using bcrypt.hash & save the user with  bcrypted password
-install cookie-parser
--just sended the dummy cookie to user 
--created GET / profile Api and check if you get cookie back
--install jsonwebtoken  
-- in login api,after email and password validation, created a JWT token and send it to the user in cookies
--read the cookiees inside your profile API and find the logged in user
--userAuth middlewared write
-- added the userAuth middleware to profile api and a new ConnectionRequest API
--set the expiry of jwt token and cookies 