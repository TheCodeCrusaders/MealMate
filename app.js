import fs from 'fs';
import express from 'express';
const app = express();
import path from "path";

app.use(express.static("public"));
app.set("port", process.env.PORT || 3000);

app.get("/",(req,res)=>{
    res.sendFile(path.resolve() + "/public/html/index.html");
})

app.get("/dashboard",(req,res)=>{
    res.sendFile(path.resolve() + "/public/html/dashboard.html");
})

app.get("/login",(req,res)=>{
    res.sendFile(path.resolve() + "/public/html/login.html");
})

app.post("/login",(req,res)=>{
    console.log(req);
    res.redirect("/");
})

//New Page for forgot password
app.get("/forgot",(req,res)=>{
    res.sendFile(path.resolve() + "/public/html/forgotpassword.html");
})
app.post("/forgot",(req,res)=>{
    console.log(req);
    res.redirect("/");
})

//New page for sign up
app.get("/login",(req,res)=>{
    res.sendFile(path.resolve() + "/public/html/login.html");
})
app.post("/login",(req,res)=>{
    console.log(req);
    res.redirect("/");
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









