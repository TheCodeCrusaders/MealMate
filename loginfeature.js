
import fs from 'fs';
import csv from 'csv-parser';


// First function will load all username and password into an array

const users=[];

const loginfunction=function(){
fs.createReadStream('./Passwords/users.txt')
  .pipe(csv())
  .on('data', (data) => {
    users.push(data);
  })
  .on('end', () => {
    console.log(users);
  });

}
loginfunction();
export default loginfunction;



