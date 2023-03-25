//CONSTANT DECLERATIONS
const container = document.querySelector("#container");
const backdrop = document.querySelector("#backdrop");
const additem = document.querySelector("#additem");
const form = document.querySelector("#itemForm");


//VARIABLE DECLERATIONS
let refIndex = NaN;


//EVENTLISTENERS - Page functionality starts here
document.addEventListener("DOMContentLoaded", (e) => {
    fetchData();
})
function fetchData() {
    fetch("/API/getList")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("response was not in the 200 range ")
        })
        .then(data => createTable(data))
    .catch(error => {
        window.location.replace("/login");
    });
}


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


//createItem() function decleration
function createItem(element, index) {
    let div = document.createElement("tr");                         //div = table row
    let name = document.createElement("td");                        //name = table data
    let location = document.createElement("td");                    //location = table data
    let expirationDate = document.createElement("td");              //expirationDate = table data


    name.textContent = element.name;                                //Text content of HTML element name is set equal to the value of HTML element name
    location.textContent = element.location;
    expirationDate.textContent = element.expirationDate;

    let buttonContainer = document.createElement("td");             //buttonContainer = table data
    let waistedButton = document.createElement("button");           //Creates "waisted" button
    waistedButton.textContent = "wasted";                           //sets text content for button
    let consumedButton = document.createElement("button");
    consumedButton.textContent = "consumed";

    waistedButton.addEventListener("click", (e) => {                //Upon click "waistedButton" executed function with parameter (e)
        e.preventDefault();                                         //Prevent default browser behvaiour related to "click" attribute
        let data = {                                                //Initialize a json style array
            "index": index                                          //Uses argument from createItem(element, index)
        };
        fetch("/API/waisteditem", {                                 //fetches promise from /API/waisteditem, which resolves to the "response" object defined inside the endpoint "/API/waisteditems"
            method: "POST",                                         //waistedButton perfroms a post request to the endpoint
            mode: "cors",                                           //Allows computers not hosting the server to make request to "/API/waisteditem"
            cache: "no-cache",                                      //Prevent cached data from interacting with the request, this ensures the response from "/API/waisteditem" is up to date
            credentials: "same-origin",                             //Ensures that the server never sends cookies, cache etc. unless the request is coming from the same origin meaning, the same domain, port etc.
            headers: {
                "Content-Type": "application/json",                 //Specicies content type, we're sending with the POST request

            },
            redirect: "follow",                                     //If the response object contains code to redirect our page, this ensures we follow the redirect
            referrerPolicy: "no-referrer",                          //Does not scan the users browsing history
            body: JSON.stringify(data),                             //"body" is a POST/PUT specific property which specicies the payload send to the server .JSON.stringify converts the "data" variable into .json string
        }).then((response) => {                                     //The resolved promise from fetch(/API/waisteditem) is stored in "response" parameter
            if (response.ok) {                                      //If response given by fetch("/API/waisteditem") is inside [200:299] range,    
                removeItems();                                      //Executes removeItems() function
            }
        })
    })

    consumedButton.addEventListener("click", (e) => {               //READ waistedButton ^^
        e.preventDefault();
        let data = {
            "index": index
        };
        fetch("/API/consumeditem", {
            method: "POST",                 // *GET, POST, PUT, DELETE, etc.
            mode: "cors",                   // no-cors, *cors, same-origin
            cache: "no-cache",              // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin",     // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow",             // manual, *follow, error
            referrerPolicy: "no-referrer",  // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data),     // body data type must match "Content-Type" header
        }).then(response => {
            if (response.ok) {
                removeItems();
            }
        })
    })

    div.appendChild(name);                  //The .appendChild() method adds the HTML element 'name' as a child of the 'div' element, making it part of the hierarchical structure of the DOM tree under the 'div' element - See line 66
    div.appendChild(location);              //^^    
    div.appendChild(expirationDate);        //^^
    buttonContainer.appendChild(waistedButton);
    buttonContainer.appendChild(consumedButton);
    div.appendChild(buttonContainer);
    container.appendChild(div);             //Assigns "div" elements to constant container
    refIndex = index;                       //During the first iteration of the function call refIdex is assigned 1, and so on?
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

function removeItems() {
    document.querySelectorAll("#container>tr").forEach((element) => {
        container.removeChild(element);

    })
    fetchData();
}