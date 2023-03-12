import express from 'express';
const app = express();
import fs from 'fs';
import csv from 'csv-parser';



// First function will load all username and password into an array



const loginfunction=function(users44){
fs.createReadStream('./Passwords/users.txt')
  .pipe(csv())
  .on('data', (data) => {
    users44.push(data);
  })
  .on('end', () => {
    console.log(users44);
  });

}

export default loginfunction;



