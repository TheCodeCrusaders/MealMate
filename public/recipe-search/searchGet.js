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

function listCreation(recipies) {
    console.log(recipies)
    const allList = document.getElementById('resultList');
    allList.textContent = '';
    recipies.forEach(ULelement => {
        recipieListOrder = document.createElement('ul');
        recipieListOrder.textContent = ULelement.nameOfRecipe;
        ULelement.ingredients.forEach(LIelement => {
            listIngredients = document.createElement('li');
            listIngredients.textContent = `${LIelement.ingredient} amount: ${LIelement.amount}`
            recipieListOrder.appendChild(listIngredients);
        });
        ULelement.instructions.forEach(instelement => {
            listInstructions = document.createElement('li');
            listInstructions.textContent = instelement.inst;
            recipieListOrder.appendChild(listInstructions)
        });
        allList.appendChild(recipieListOrder);
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