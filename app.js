import express from 'express';
const app = express();

import path from "path";

//import *as ass from './loginfeature.js';
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("port", process.env.PORT || 3000);

app.get("/",(req,res)=>{
    res.sendFile(path.resolve() + "/public/html/index.html");
})



//New Page for forgot password
app.get("/forgot",(req,res)=>{
    res.sendFile(path.resolve() + "/public/html/forgotpassword.html");
})
app.post("/forgot",(req,res)=>{
    console.log(req);
    res.redirect("/");
})












//This is Carl && Shadi´s Dont touch
app.get("/login",(req,res)=>{                                   // this function defines what will be send when "/login" url is accesed  
    res.sendFile(path.resolve() + "/public/html/login.html");
})



import users from './loginfeature.js';// Here we import our read && csv function
const users44=[];
users(users44);

//console.log(users44)


//
app.post("/login",(req,res)=>{                                  // This is the post function, this will be activated when ever things that has been include in the form action in the htlm file.
                                                                 // if then its activated this function will launch 
let usernametest =req.body.username;
let passwordtest=req.body.password;
console.log(usernametest)
console.log(passwordtest)

let user = users44.find(function(user) {
    return user.username === usernametest && user.password === passwordtest;
  });

 //   console.log(req);
    if(user){
        res.redirect("/");
    }
    else{
       res.redirect("/login");  
    }
       
    
})


app.listen(app.get('port'), function () {
    console.log('app listening at: ' + "http://localhost:" + app.get('port') + "/");
});









