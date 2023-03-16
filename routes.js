import express from 'express';
const router = express.Router();
import path from "path";
import fs from "fs"


import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
router.use(cookieParser());






import recipies from './recipe.js'
router.post('/API/search', (req, res) => {
    const name = req.body.navn;
    res.json(recipies(name));
})





/*
import users from './loginfeature.js';// Here we import our read && csv function
const users44 = [];
users(users44);

router.post("/login", (req, res) => {                                  // This is the post function, this will be activated when ever things that has been include in the form action in the htlm file.
    // if then its activated this function will launch 
    let usernametest = req.body.username;
    let passwordtest = req.body.password;
    console.log(usernametest)
    console.log(passwordtest)

    let user = users44.find(function (user) {
        return user.username === usernametest && user.password === passwordtest;
    });
    //   console.log(req);
    if (user) {
        res.redirect("/");
    }
    else {
        //res.send('Invalid username or password');
        //  alert("Wrong username or password");
        res.redirect("/login");
    }
})
*/
//Here new things start







//import *as ass from './loginfeature.js';





//New Page for forgot password
router.get("/forgot",verifyToken,(req,res)=>{

    res.sendFile(path.resolve() + "/public/html/forgotpassword.html");
})
router.post("/forgot",(req,res)=>{
    console.log(req);
    res.redirect("/");
})






//This is Carl && Shadi´s Dont touch
router.get("/login",(req,res)=>{                                   // this function defines what will be send when "/login" url is accesed  
    res.sendFile(path.resolve() + "/public/html/login.html");
})



import users from './loginfeature.js';// Here we import our read && csv function
const users44=[];
users(users44);

//console.log(users44)

function verifyToken(req, res, next) {
    const token = req.cookies.token;
    
    if (!token) {
      return res.redirect('/login');
    }
    
    try {
      const decoded = jwt.verify(token, 'secret');
      req.user = decoded;
      console.log(token)
      console.log(req.user.username);
      next();
    } catch (err) {
      res.redirect('/login');
    }
  }

router.post("/login",(req,res)=>{                                  
    let usernametest =req.body.username; 
    let passwordtest=req.body.password; 

    let user = users44.find(function(user) {    
        return user.username === usernametest && user.password === passwordtest; 
    });
    
    if(user){
        // Generate an authentication token
        const token = jwt.sign({ username: user.username }, 'secret');
        console.log(user.username);
        // Set the token as a cookie on the client's browser
        res.cookie('token', token, { httpOnly: true });
        
        res.redirect("/forgot");
    }
    else{
        res.redirect("/login");  
    }
})
















// getting a list route (still neds to be modified for real login system)
router.get("/API/getList", (req, res) => {
    console.log(req.query.name);
    const filePath = path.resolve() + `/USERS/${req.query.name}/items.json`;

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


// write list to file (still neds to be modified for real login system)
router.post("/postlist", (req, res) => {
    console.log(req.body);

    // Read the existing data from the JSON file
    const dataPath = path.join(path.resolve() + "/USERS/Diego/items.json");
    let data = [];
    try {
        data = JSON.parse(fs.readFileSync(dataPath));
    } catch (error) { }

    // Add the new data to the array
    data.push(req.body);

    // Write the updated data back to the JSON file
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.redirect("/itemtracking");
});

export default router