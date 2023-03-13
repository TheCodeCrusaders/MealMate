import express from 'express';
const router = express.Router();
import path from "path";
import fs from "fs"

router.get("/itemtracking", (req, res) => {
    res.sendFile(path.resolve() + "/public/itemtracking/index.html");
})

router.get("/", (req, res) => {
    res.sendFile(path.resolve() + "/public/html/index.html");
})
router.get("/login", (req, res) => {
    res.sendFile(path.resolve() + "/public/html/login.html");
})
router.post("/login", (req, res) => {
    console.log(req);
    res.redirect("/");
})

//New Page for forgot password
router.get("/forgot", (req, res) => {
    res.sendFile(path.resolve() + "/public/html/forgotpassword.html");
})
router.post("/forgot", (req, res) => {
    console.log(req);
    res.redirect("/");
})

//New page for sign up
router.get("/login", (req, res) => {
    res.sendFile(path.resolve() + "/public/html/login.html");
})
router.post("/login", (req, res) => {
    console.log(req);
    res.redirect("/");
})

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