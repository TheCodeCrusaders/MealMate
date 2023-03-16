import fs from 'fs';
import express from 'express';
const app = express();
import path from "path";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("port", process.env.PORT || 3000);


app.get("/search",(req,res)=>{
    res.sendFile(path.resolve() + "/public/html/search.html");
})



import recipies from './recipe.js'




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

app.listen(app.get('port'), function () {
    console.log('app listening at: ' + "http://localhost:" + app.get('port') + "/");
});

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

