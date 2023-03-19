import fs from 'fs';
import path from 'path';

//Variable to store the recipies for later use
const results = [];

//Saves all the recipies in a variable
const recipeFile = JSON.parse(fs.readFileSync(path.resolve()+ '/listofrecipes.json'));
function listOfRecipies(name) {
    try {
        results.length = 0;
        //Goes through all the recipies and checks if a recipe name or ingredient matches up with the searched variable
        for (const recipe of recipeFile) {
            //toLowerCase Makes all the names in the file lower case
            if (recipe.nameOfRecipe.toLowerCase().includes(name.toLowerCase()) || 
                recipe.ingredients.some(ingredienser => 
                    ingredienser.ingredient.toLowerCase().includes(name.toLowerCase()))
                ) {
                    //If the recipe or ingrediens existit does it will then push it into the result array
                    results.push(recipe);
            }
        }
        return results;
    } catch (error) {
        console.log(error);
        return [];
    }
}


//Exports the function to app.js
export default listOfRecipies;