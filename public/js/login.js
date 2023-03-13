const express = require('express');
const app = express();
//bcrypt incrypts the password by sprinkling it with "salt" (i think it is another word for adding random characters to the password)
const bcrypt = require('bcrypt');

function loginValidation (username, password) {
    //Array af users
    currentUser = [{}];
    //Chcker om brugeren existere
    //Some functionen bruges til at sige, hvis bare en brugere med det username og passsword eksitere, så send giv brugeren lov til at logge ind.
    const checkUser = currentUser.some( (user) =>
    user.username === username && user.password === password);
    //If the user does not exist
    if(!checkUser) {
        console.log(`Username or password is wrong!`)
    //If the user does exist it should post login and redirect the user to the home page
    } else if(checkUser) {
        console.log(`Login was succesfull!`);
        app.post("/login",(req,res)=>{
            console.log(req);
            res.redirect("/");
        })
    }
}

module.export = loginValidation;

