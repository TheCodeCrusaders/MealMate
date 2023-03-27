import path from 'path';
import fs from 'fs';

const recipies = JSON.parse(fs.readFileSync(path.resolve() + '/listofrecipes.json'));
let itemArray = [];

function listRecipies(items) {
    try {
        itemArray.push(items);
        console.log(itemArray);
        if (items == 'reset') {
            itemArray.splice(0);
        }
        let recipiesSaved = [];
        for(const theRecipe of recipies) {
            if (theRecipe.ingredients && theRecipe.ingredients.some(searchFor =>
                itemArray.some(item => searchFor.ingredient.toLowerCase().includes(item)))) {
                recipiesSaved.push(theRecipe);
            }
        }
       
        let recipieSorted = sortRecipes(recipiesSaved, itemArray);
        return recipieSorted;
    } catch (error) {
        console.log(error);
    }
}


function sortRecipes(recipeList, arrayOfItems){
    for(let i = 0; i < recipeList.length; i++) {
        let rankingSystem = 0;
        for(let j = 0; j < arrayOfItems.length; j++) {
            if (recipeList[i].ingredients.some(item => item.ingredient.includes(arrayOfItems[j]))) {
                rankingSystem++;
            }
        }
        recipeList[i].rankingSystem = rankingSystem;
        console.log(`${recipeList[i].nameOfRecipe}: ${recipeList.rankingSystem}`);
    }
    let sorted = recipeList.sort((a, b) => b.rankingSystem - a.rankingSystem)
    return sorted;
}

export default listRecipies;