const form = document.querySelector("#searchForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {
        "navn": document.querySelector("#search").value
    };
    console.log(data)
    fetch("/search", {
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





//Makes a list with only the recipe names only

function listCreation(item) {
    console.log(item);
    //Takes the value item in
    //It wil then return the result of all the needed recipies
    const resultList = document.getElementById('resultList');
    //Loops through all the needed recipies
    item.forEach(element => {
        //Creates new list element
        const listItem = document.createElement('ul');
        //Creates a text node that holds the recipe name
        const recipeName = document.createTextNode(element.navn);
        //Add the text node to the list element
        listItem.appendChild(recipeName);
        element.ingredienser.forEach(el => {
            const listIngrident = document.createElement('li');
            const recipeingridients = document.createTextNode(el.ingrediens);
            listIngrident.appendChild(recipeingridients);
            listItem.appendChild(listIngrident);
        })
        //Add the list element to the list
        resultList.appendChild(listItem);
    });
}