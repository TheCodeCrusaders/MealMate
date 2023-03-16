import fs from 'fs';
import path from 'path';

//Variable to store the recipies for later use
const results = [];

//Saves all the recipies in a variable
const recipeFile = JSON.parse(fs.readFileSync(path.resolve()+ '/data.json'));
function listOfRecipies(name) {
    try {
        //Goes through all the recipies and checks if a recipe name or ingredient matches up with the searched variable
        for (const recipe of recipeFile) {
            //toLowerCase Makes all the names in the file lower case
            if (recipe.navn.toLowerCase().includes(name.toLowerCase()) || 
                recipe.ingredienser.some(ingredient => 
                    ingredient.ingrediens.toLowerCase().includes(name.toLowerCase()))
                ) {
                    //If the recipe or ingrediens existit does it will then push it into the result array
                    results.push(recipe);
            }
            console.log(results);
        }
        return results;
    } catch (error) {
        console.log(error);
    }
}


//Exports the function to app.js
export default listOfRecipies;