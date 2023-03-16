import express from 'express';
const app = express();
import fs from 'fs';
import csv from 'csv-parser';



// First function will load all username and password into an array



const loginfunction=function(users44){
  const users = JSON.parse(fs.readFileSync('./Passwords/users.json'));

  users44.push(users)
console.log(users44)
}



export default loginfunction;



