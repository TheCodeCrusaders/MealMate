

const form = document.querySelector("#searchForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {
        "nameOfRecipe": document.querySelector("#search").value,
    };
    fetch("/API/search", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(result => result.json())
        .then(jsonData => listCreation(jsonData))
})

//Makes a list with the recipe names
//Takes the value item in
function listCreation(item) {
    console.log(item);
    //It wil then return the result of all the needed recipies
    const resultList = document.getElementById('resultList');
    resultList.textContent = '';
    //Loops through all the needed recipies
    item.forEach(element => {
        //Creates new list element
        const listItem = document.createElement('ul');
        //Creates a text node that holds the recipe name
        const recipeName = document.createTextNode(element.nameOfRecipe);
        //Add the text node to the list element
        listItem.appendChild(recipeName);
        element.ingredients.forEach(el => {
            const listIngrident = document.createElement('li');
            const recipeingridients = document.createTextNode(`${el.ingredient} amount: ${el.amount}`);
            listIngrident.appendChild(recipeingridients);
            listItem.appendChild(listIngrident);
        });
        //INPUT: Would be nice if you could set the instructions to the left
        element.instructions.forEach(el => {
            const listinstructions = document.createElement('li');
            const instructionsText = document.createTextNode(el.inst);
            console.log(el.inst);
            listinstructions.appendChild(instructionsText);
            listItem.appendChild(listinstructions);
        });
        
        //Add the list element to the list
        resultList.appendChild(listItem);
    });
}

const listItems = document.querySelector('.list');

function showOrHide(e) {
    //If the clicked element is a <ul>
    if (e.target.tagName === 'UL') {
        //Convert it to array form
        const childList = Array.from(e.target.querySelectorAll('li'));
        //Loops through all the list items and shows them
        for (const lists of childList) {
            lists.style.display = e.type === 'click' ? 'block' : 'none';
        }
    }
}

listItems.addEventListener('click', showOrHide);
listItems.addEventListener('dblclick', showOrHide);