const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const dataDir = __dirname + '/data';
const shoppingListFile = dataDir + '/shoppingList.json';

// Read the shopping list from the JSON file
function getShoppingList() {
  if (!fs.existsSync(shoppingListFile)) {
    fs.writeFileSync(shoppingListFile, '[]');
  }
  const shoppingListData = fs.readFileSync(shoppingListFile, 'utf8');
  return JSON.parse(shoppingListData);
}

// Write the shopping list to the JSON file
function saveShoppingList(shoppingList) {
  fs.writeFileSync(shoppingListFile, JSON.stringify(shoppingList));
}


