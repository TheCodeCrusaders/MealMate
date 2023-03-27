//CONSTANT DECLERATIONS
const container = document.querySelector("#container");     //Select the first HTML element matching the CSS #container element
const backdrop = document.querySelector("#backdrop");
const additem = document.querySelector("#additem");
const form = document.querySelector("#itemForm");


//VARIABLE DECLERATIONS
let refIndex = NaN;


//Upon page being loaded, fetches the currently logged in user's personal items list, by calling fetchData()
document.addEventListener("DOMContentLoaded", (e) => {
    fetchData();
    fetchGlobalItems(); //!!TO READ!!
})

//EVENTLISTENERS - Page functionality starts here

//!!TO READ!!
form.name.addEventListener("input", async (e) => {                          //Anon functin with parameter (e) is made asynchronisis to allow using "await"
    const inputItemName = e.target.value;                                   //Value entered into form.name is assigned inputItemName
    const isItemValid = await itemExists(inputItemName);                    //"await" pauses execution until itemExists() Promise resolves, then the code continues without blocking other tasks.

    const autocompleteList = document.querySelector("#autocomplete-list");  //autocompleteList is assigned first HTML-elmenent 'id' mathching autocomplete-list

    // Remove all child nodes from the autocompleteList                     ////|HTML childen = Every <> inside of <html>, e.g <body> is a child |HTML child node = any <> inside of a HTML child, e.g <html><body><p></body></html>, <p> is a child node to <body>|
    while (autocompleteList.firstChild) {                                   //While autocompleteList has a child note === true
        autocompleteList.removeChild(autocompleteList.firstChild);          //While true, the .removeChild node removes the first child node in the autocompleteList
    }

    if (isItemValid === false) {                                            //"await" in line 23 lets itemExists run in the background, effectively reaching the if statement, while the promised is being resolved                                
        form.name.style.borderColor = "red";
    }

    else {
        form.name.style.borderColor = "";
    }

    if (inputItemName.length > 0) {
        const globalItems = await fetchGlobalItems();
        const matchingItems = globalItems.filter(item =>
            item.name.toLowerCase().startsWith(inputItemName.toLowerCase())
        );

        matchingItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.textContent = item.name;
            itemDiv.addEventListener("click", () => {
                form.name.value = item.name;
                form.name.style.borderColor = "";

                // Remove all child nodes from the autocompleteList after selecting an item
                while (autocompleteList.firstChild) {
                    autocompleteList.removeChild(autocompleteList.firstChild);
                }
            });
            autocompleteList.appendChild(itemDiv);
        });
    }
});


form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (refIndex == NaN) {


        let data = {
            "location": form.location.value,
            "name": form.name.value,
            "expirationDate": form.expirationDate.value
        };
        fetch("/API/postlist", {
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
        });
    }
    else {
        let data = {
            "location": form.location.value,
            "name": form.name.value,
            "expirationDate": form.expirationDate.value,
            "index": refIndex
        };
        fetch("/API/edititem", {
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
        });
    }
    form.location.selected = "Fridge";
    form.name.value = "";
    form.expirationDate.value = "";
    removeItems();

    addNewItem();
})


//FUNCTION DECLERATIONS:
//FetchData function decleration
function fetchData() {
    fetch("/API/getList")                   //fetch() returns a promise, which resolves to a "response" object. The response it contains, is specified whiten /API/getList. In this case it's the items.json for the user currently logged in, which is stored in "response"
        .then((response) => {               //The resolved promise, which is now stored in "response", is used as parameter for an anonymous function in the .then method
            if (response.ok) {              //.ok method checks if the reponse is whiten [200:299] status-code range, if true execute body of if statement
                return response.json();     //.json() method parses "response" object for json data, the parsed data is then considered a promise, thus we need a new .then method to handle it's resolvement
            }
            throw new Error("response was not in the 200 range ") //Throw statement signal an error has occured. It signals .catch method to overtake the code, once throw has run it's course. Constructor statement "new Error()" stores information about the error
        })
        .then((data) => createTable(data))                        //The "data" parameter stores the parsed JSON data from the resolved Promise (from response.json()). .then() executes the createTable() function with "data" as input
        .catch((error) => {                                       //If any error occurs in the Promise chain, this .catch() block is executed
            window.location.replace("/login");                    //Upon error, user is redirected to /login endpoint
        });
}

//!!TO READ!!
function fetchDataGlobalItems() {
    fetch("/API/getListGlobalItems")        //fetch() returns a promise, which resolves to a "response" object. The response it contains, is specified whiten /API/getList. In this case it's the items.json for the user currently logged in, which is stored in "response"
        .then((response) => {               //The resolved promise, which is now stored in "response", is used as parameter for an anonymous function in the .then method
            if (response.ok) {              //.ok method checks if the reponse is whiten [200:299] status-code range, if true execute body of if statement
                return response.json();     //.json() method parses "response" object for json data, the parsed data is then considered a promise, thus we need a new .then method to handle it's resolvement
            }
            throw new Error("response was not in the 200 range ") //Throw statement signal an error has occured. It signals .catch method to overtake the code, once throw has run it's course. Constructor statement "new Error()" stores information about the error
        })
        .then((data) => createTable(data))                        //The "data" parameter stores the parsed JSON data from the resolved Promise (from response.json()). .then() executes the createTable() function with "data" as input
        .catch((error) => {                                       //If any error occurs in the Promise chain, this .catch() block is executed
            alert("An error occured");                            //Upon error, user is redirected to /login endpoint
        });
}


//createItem() function decleration
function createItem(element, index) {
    let tr = document.createElement("tr");
    let name = document.createElement("td");
    let location = document.createElement("td");
    let expirationDate = document.createElement("td");
    let daysLeft = document.createElement("td");


    name.textContent = element.name;
    location.textContent = element.location;
    expirationDate.textContent = element.expirationDate;


    let currentDate = new Date();
    let timeLeft = new Date(Date.parse(element.expirationDate) - currentDate);
    daysLeft.textContent = `${Math.ceil(timeLeft / (1000 * 60 * 60 * 24))}`

    let buttonContainer = document.createElement("td");
    let waistedButton = document.createElement("button");
    waistedButton.textContent = "waisted";

    let consumedButton = document.createElement("button");
    consumedButton.textContent = "consumed";

    tr.addEventListener("click", (e) => {
        refIndex = index;
        form.location.selected = element.location;
        form.name.value = element.name;
        form.expirationDate.value = element.expirationDate;
        addNewItem();
    })

    waistedButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        let data = {
            "index": index
        };
        fetch("/API/waisteditem", {
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
        }).then(response => {
            if (response.ok) {
                removeItems();
            }

        })

    })

    consumedButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        let data = {
            "index": index
        };
        fetch("/API/consumeditem", {
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
        }).then(response => {
            if (response.ok) {
                removeItems();
            }

        })

    })

    tr.appendChild(name);
    tr.appendChild(location);
    tr.appendChild(expirationDate);
    tr.appendChild(daysLeft);
    buttonContainer.appendChild(waistedButton);
    buttonContainer.appendChild(consumedButton);
    tr.appendChild(buttonContainer);
    container.appendChild(tr);
    refIndex = index;
}


//addNewItem() function decleration
function addNewItem() {
    form.classList.toggle("visible");
    if (backdrop.style.display === "block") {
        backdrop.style.display = "none";
    }
    else {
        backdrop.style.display = "block";
    }
}
additem.addEventListener("click", (e) => {
    addNewItem();
})
backdrop.addEventListener("click", (e) => {
    addNewItem();
    refIndex = NaN;
})

function createTable(data) {
    data.forEach((element, index) => {
        createItem(element, index)
    });

}

//removeItems() function decleration
function removeItems() {
    document.querySelectorAll("#container>tr").forEach((element) => {
        container.removeChild(element);

    })
    fetchData();
}

//GPT TEST:

//!!TO READ!!
// Step 1: Fetch the Global-items.json file
async function fetchGlobalItems() {
    const response = await fetch('/API/getListGlobalItems');
    const data = await response.json();
    return data;
}

//!!TO READ!!
// Step 2: Create a function to check if the item exists in the file
async function itemExists(itemName) {
    const globalItems = await fetchGlobalItems();
    return globalItems.some(item => item.name.toLowerCase() === itemName.toLowerCase());
}
