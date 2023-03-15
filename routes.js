import express from 'express';
const router = express.Router();
import path from "path";
import fs from "fs"



router.get("/", (req, res) => {
    res.sendFile(path.resolve() + "/public/html/index.html");
})


//New Page for forgot password
router.get("/forgot", (req, res) => {
    res.sendFile(path.resolve() + "/public/html/forgotpassword.html");
})


//New page for sign up
router.get("/login", (req, res) => {
    res.sendFile(path.resolve() + "/public/html/login.html");
})

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




// item tracking route
router.get("/itemtracking", (req, res) => {
    res.sendFile(path.resolve() + "/public/itemtracking/index.html");
})

// getting a list route (still neds to be modified for real login system)
router.get("/getList", (req, res) => {
    const filePath = path.resolve() + "/USERS/Diego/items.json";

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