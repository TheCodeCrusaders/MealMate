import express from 'express';
const app = express();
import path from "path";

app.use(express.static("public"));
app.set("port", process.env.PORT || 3000);

app.get("/",(req,res)=>{
    res.sendFile(path.resolve() + "/public/html/index.html");
})
app.get("/login",(req,res)=>{
    res.sendFile(path.resolve() + "/public/html/login.html");
})
app.post("/login",(req,res)=>{
    console.log(req);
    res.redirect("/");
})
app.listen(app.get('port'), function () {
    console.log('app listening at: ' + "http://localhost:" + app.get('port') + "/");
});









