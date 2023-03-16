import fs from 'fs';
import express from 'express';
const app = express();
import path from "path";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("port", process.env.PORT || 3000);






import recipies from './recipe.js'





/*
import cookieParser from 'cookie-parser';
app.use(cookieParser());


function authenticate(req, res, next) {
    const token = req.cookies.auth_token; // get the token from the cookies
    console.log(token)
    if (!token) {
        console.log('token not found')
      return res.redirect('/login'); // if token is not found, redirect to login page
    }
    try {
      const decoded = jwt.verify(token, 'secret_key'); // verify the token using the secret key
      const userToken = usertokens.find((userToken) => userToken.code === token); // find the user token in the usertokens array
      console.log(userToken)
      if (!userToken) {
        console.log('user token not found')
        return res.redirect('/login'); // if user token is not found, redirect to login page
      }
      if (userToken.expirationTime < new Date()) {
        console.log('user token is expered so get redirected to login page')
        return res.redirect('/login'); // if user token is expired, redirect to login page
      }
      req.user = decoded; // add the user object to the request object
      console.log(decoded);
      next(); // call the next middleware function
    } catch (err) {
        console.log('token verification failed, Redirected to login page')
      return res.redirect('/login'); // if token verification fails, redirect to login page
    }
  }

//New Page for forgot password
app.get("/forgot", authenticate, (req,res)=>{
    //console.log(req.cookies.auth_token);
    res.sendFile(path.resolve() + "/public/html/forgotpassword.html");
})


app.post("/forgot",(req,res)=>{
    console.log(req.cookies.auth_token);
    res.redirect("/forgot");
})



//This is Carl && Shadi´s Dont touch


  


app.get("/login",(req,res)=>{                                   // this function defines what will be send when "/login" url is accesed  
    res.sendFile(path.resolve() + "/public/html/login.html");
app.post('/search', (req, res) => {
    const name = req.body.navn;
    res.json(recipies(name));
    
    
app.get("/dashboard",(req,res)=>{
    res.sendFile(path.resolve() + "/public/html/dashboard.html");

})

app.get("/getList", (req, res) => {
    const filePath = path.resolve() + "/Files to read/Items.json";
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            const jsonData = data.toString("utf8");
            res.json(JSON.parse(jsonData));
        }
    });

});

import jwt from 'jsonwebtoken';
import users from './loginfeature.js';// Here we import our read && csv function
const users44=[];
users(users44);

//console.log(users44)
app.post("/login",(req,res)=>{                                  // This is the post function, this will be activated when ever things that has been include in the form action in the htlm file.
                                                                 // if then its activated this function will launch 
let usernametest =req.body.username; // This gets our username from the front end
let passwordtest=req.body.password; // this gets our passworld from the front end
console.log(usernametest)           // this console what the user tried to use as username
console.log(passwordtest)           // the console what the user tried to use as username
const usertokens=[];
let user = users44.find(function(user) {    // This function will test if the username or 
    return user.username === usernametest && user.password === passwordtest; 
  });
 //   console.log(req);
    if(user){
        
        // here would the authenticaltion token be. 
        const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });
// This 
        res.cookie('auth_token', token);
        

        usertokens.push({name: user.username, code: token, expirationTime: new Date(Date.now() + 60 * 60 * 1000) });
        
        console.log(usertokens)
        res.redirect("/forgot");

    }
    else{
        //res.send('Invalid username or password');
      //  alert("Wrong username or password");
       res.redirect("/login");  
    }
})






*/



import router from './routes.js';


//import *as ass from './loginfeature.js';
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/', router);


app.listen(app.get('port'), function () {
    console.log('app listening at: ' + "http://localhost:" + app.get('port') + "/");
});

