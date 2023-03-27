import express from 'express';
const router = express.Router();
import path from "path";
import fs from "fs"
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
router.use(cookieParser());
import crypto from 'crypto';
import removeItem from "./removeItem.js"


import recipies from './recipe.js'
router.post('/API/search', (req, res) => {
    const itemName = req.body.nameOfRecipe;
    res.json(recipies(itemName));
})


//New Page for forgot password This is the Current tasting page For Tokens login System. Dont touch it is hurting nobody.
router.get("/forgot", verifyToken, (req, res) => {

    res.sendFile(path.resolve() + "/public/login/forgot.html");
})
router.post("/forgot", (req, res) => {
    console.log(req);
    res.redirect("/");
})


import users from './loginfeature.js';// Here we import our read passord files.
const users44 = users();


console.log(users44) //console.logs to prove we are into the system, and shows off every username and password.

function verifyToken(req, res, next) {
    const token = req.cookies.token;// Here we request the cookie from the user
    // console.log(token)
    if (!token) {// here we say if the token is undefined, it will redirect the user the login page.
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, 'secret');// Here we decode our token
        //console.log(decoded)
        req.user = decoded;// here we acces the user
        console.log(req.user)
        console.log(token)
        console.log(req.user.username);
        console.log(decoded.exp)

        if (decoded.exp * 1000 <= Date.now()) { // Check if the token has expired the  it must be multiplied by 1000, beacuse it has to be in secounds. because the start time is from 1970
            return res.redirect('/login');
        }

        next();//If next() is not called, the request will hang and will not proceed to the next middleware function or route handler.
    } catch (err) { // if an error is meat, the program will redirect user to login page.
        res.redirect('/login');
    }
}


router.post("/login", (req, res) => {
    let usernametest = req.body.username;
    
    // GPT: Hash the entered password using the SHA-256 algorithm before checking against stored hash
    let passwordtest = crypto.createHash('sha256').update(req.body.password).digest('hex');
  
    console.log(`Login attempt by: ${usernametest}`);
  
    let user = users44.find(function (user) {
      return user.username === usernametest && user.password === passwordtest;
    });

    if (user) {
      const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });
  
      console.log(`Login successful for: ${user.username}`);
  
      res.cookie('token', token, { httpOnly: true });
  
      // GPT: Return a JSON object with a success message when the user logs in successfully
      return res.status(200).json({ success: 'User logged in successfully' });
    } else {
      console.log(`Login failed for: ${usernametest}`);
      res.redirect("/login");
    }
});


router.get("/API/getUserName", verifyToken, (req, res) => {
    res.json({ "username": req.user.username })

})





router.post("/API/consumeditem", verifyToken, (req, res) => {
    removeItem.consumeItem(req, res);
})


router.post("/API/waisteditem", verifyToken, (req, res) => {
    removeItem.waisteItem(req, res)
})

import helpers from "./helpers.js"

// getting a list route (still neds to be modified for real login system)
router.get("/API/getList", verifyToken, async (req, res) => {
    const filePath = path.resolve() + `/data/USERS/${req.user.username}/items.json`;

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

//!!TO READ!!
router.get("/API/getListGlobalItems", async (req, res) => {
    const filePath = path.resolve() + `/Global-Items/Global-Items.json`;

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

router.get("/API/gettopexp", verifyToken, (req, res) => {
    const filePath = path.resolve() + `/data/USERS/${req.user.username}/items.json`;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            const jsonData = data.toString("utf8");
            helpers.findSmallest(jsonData, res);
            // res.json(JSON.parse(jsonData));
        }
    });

});

// getting a list route (still neds to be modified for real login system)
router.get("/API/getConsumedItems", verifyToken, (req, res) => {
    const filePath = path.resolve() + `/data/USERS/${req.user.username}/consumedItems.json`;

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

// getting a list route (still neds to be modified for real login system)
router.get("/API/getWastedItems", verifyToken, (req, res) => {
    const filePath = path.resolve() + `/data/USERS/${req.user.username}/wastedItems.json`;

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

router.get("/API/getweeklyWaste", verifyToken, (req, res) => {
    const filePath = path.resolve() + `/data/USERS/${req.user.username}/wastedItems.json`;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            const jsonData = JSON.parse(data.toString("utf8"));

            // Get the date from one week ago
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            // Filter the data based on the wastedDate attribute
            const filteredData = jsonData.filter(item => {
                const itemDate = new Date(item.wastedDate);
                return itemDate >= oneWeekAgo;
            });

            res.json(filteredData);
        }
    });
});


router.get("/API/prevous7days", verifyToken, (req, res) => {
    const filePath = path.resolve() + `/data/USERS/${req.user.username}/wastedItems.json`;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            const jsonData = JSON.parse(data.toString("utf8"));

            // Get the date from 14 days ago
            const twoWeeksAgo = new Date();
            twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

            // Get the date from 7 days ago
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            // Filter the data based on the wastedDate attribute
            const filteredData = jsonData.filter(item => {
                const itemDate = new Date(item.wastedDate);
                return itemDate >= twoWeeksAgo && itemDate < oneWeekAgo;
            });

            res.json(filteredData);
        }
    });
});



router.get("/API/getmonthlyWaste", verifyToken, (req, res) => {
    const filePath = path.resolve() + `/data/USERS/${req.user.username}/wastedItems.json`;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            const jsonData = JSON.parse(data.toString("utf8"));

            // Get the date from one week ago
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 30);

            // Filter the data based on the wastedDate attribute
            const filteredData = jsonData.filter(item => {
                const itemDate = new Date(item.wastedDate);
                return itemDate >= oneWeekAgo;
            });

            res.json(filteredData);
        }
    });
});

// write list to file (still neds to be modified for real login system)
router.post("/API/postlist", verifyToken, (req, res) => {
    console.log(req.body);

    // Read the existing data from the JSON file
    const dataPath = path.join(path.resolve() + `/data/USERS/${req.user.username}/items.json`);
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

router.post("/API/edititem", verifyToken, (req, res) => {
    console.log(req.body);

    // Read the existing data from the JSON file
    const dataPath = path.join(path.resolve() + `/data/USERS/${req.user.username}/items.json`);
    let data = [];
    try {
        data = JSON.parse(fs.readFileSync(dataPath));
    } catch (error) { }
    let modifiedjsson = { "location": req.body.location, "name": req.body.name, "expirationDate": req.body.expirationDate, }
    // Add the new data to the array
    data[req.body.index] = modifiedjsson;

    // Write the updated data back to the JSON file
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.redirect("/itemtracking");
});

router.post('/newuser', (req, res) => {
    // Extract the new user data from the request body
    const newUser = {
        username: req.body.username,
        password: crypto.createHash('sha256').update(req.body.password).digest('hex')
    };

    const dataPath = path.join(path.resolve() + "/data/Passwords/users.json");
    let data = {};
    try {
        data = JSON.parse(fs.readFileSync(dataPath));
    } catch (error) { }

    // Check for duplicate usernames
    const duplicate = data.users.find(user => user.username === newUser.username);
    if (duplicate) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    // Add the new data to the array
    data.users.push(newUser);

    // Write the updated data back to the JSON file
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    fs.mkdir(`data/USERS/${newUser.username}`, (err) => {
        if (err) throw err;
    });

    const itemsStandard = '[]';

    console.log(`${newUser.username} directory created.`);

    fs.writeFile(`data/USERS/${newUser.username}/consumedItems.json`, itemsStandard, (err) => {
        if (err) throw err;
        console.log(`consumedItems.json created in ${newUser.username}`);
    });

    fs.writeFile(`data/USERS/${newUser.username}/items.json`, itemsStandard, (err) => {
        if (err) throw err;
        console.log(`items.json created in ${newUser.username}`);
    });

    fs.writeFile(`data/USERS/${newUser.username}/wastedItems.json`, itemsStandard, (err) => {
        if (err) throw err;
        console.log(`wastedItems.json created in ${newUser.username}`);
    });

    // Return a response to the client
    return res.status(200).json({ success: 'User created successfully' });
    //res.redirect("/login");
});



export default router