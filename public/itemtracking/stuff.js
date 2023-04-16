//CONSTANT DECLERATIONS
const container = document.querySelector("#container");     //Select the first HTML element matching the CSS #container element
const backdrop = document.querySelector("#backdrop");
const additem = document.querySelector("#additem");
const form = document.querySelector("#itemForm");
const new_private_item = document.querySelector("#New_private_Item")

//VARIABLE DECLERATIONS
let refIndex = undefined;


//Upon page being loaded, fetches the currently logged in user's personal items list, by calling fetchData()
document.addEventListener("DOMContentLoaded", (e) => {
    // Fetches the private Porterty item list.
    //fetchData();
    //fetchGlobalItems(); //!!TO READ!!
    //fetchDataGlobalItems()
  
    OnStartfetchDataOnce()

})

//EVENTLISTENERS - Page functionality starts here
//This is where the autocomplete function starts <------ Carl Note
//!!TO READ!!
form.name.addEventListener("input", async (e) => {                          //Anon function with parameter (e) is made asynchronisis to allow using "await"
    const inputItemName = e.target.value;                                   //Value entered into form.name is assigned inputItemName
    const isItemValid = await itemExists(inputItemName);                    //"await" pauses execution until itemExists() Promise resolves, then the code continues without blocking other tasks.

    const autocompleteList = document.querySelector("#autocomplete-list");  //autocompleteList is assigned first HTML-elmenent 'id' mathching autocomplete-list

    // Remove all child nodes from the autocompleteList                     ////|HTML childen = Every <> inside of <html>, e.g <body> is a child |HTML child node = any <> inside of a HTML child, e.g <html><body><p></body></html>, <p> is a child node to <body>|
    while (autocompleteList.firstChild) {                                   //While autocompleteList has a child note === true
        autocompleteList.removeChild(autocompleteList.firstChild);          //While true, the .removeChild node removes the first child node in the autocompleteList
    }
    new_private_item.classList.toggle("visible");
    if (isItemValid === false) {                                            //"await" in line 23 lets itemExists run in the background, effectively reaching the if statement, while the promised is being resolved                                
        form.name.style.borderColor = "red";                                //private itemlist displayed with red
        new_private_item.style.display = "block";
        
    }

    else {
        form.name.style.borderColor = "green";                              //keep private itemlist hidden
        new_private_item.style.display = "none";
    }

    if (inputItemName.length > 0) {                                          
        const PProperties = private_user_Item_property_data;
        const globalItems = global_item_data;

       
        const matching_PProperties = PProperties.filter(item =>
            item.name.toLowerCase().startsWith(inputItemName.toLowerCase())
        );

  
        const matching_globalItems = globalItems.filter(item =>
            item.name.toLowerCase().startsWith(inputItemName.toLowerCase())
        );

        const matchingItems = matching_globalItems.concat(matching_PProperties);

        matchingItems.forEach(item => {                             //shows all the items that match the search bar.
            const itemDiv = document.createElement("div");
            itemDiv.textContent = item.name;
            itemDiv.addEventListener("click", () => {               //remove the autocomplete list on click
                form.name.value = item.name;
                form.name.style.borderColor = "green";
                new_private_item.style.display = "none";
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
    if (refIndex === undefined) {


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



// Here 2 functions are declared, they are both API Fetches 

//This function just get the users item list data. not importent  Called the wrong name, should be called [fetch_users_item_list]  <------ Carl Note
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
        .then((data) => {
            createTable(data)
        })                        //The "data" parameter stores the parsed JSON data from the resolved Promise (from response.json()). .then() executes the createTable() function with "data" as input
        .catch((error) => {                                       //If any error occurs in the Promise chain, this .catch() block is executed
            window.location.replace("/login");                    //Upon error, user is redirected to /login endpoint
        });

}
//This function just get the global item list data. not importent  <------ Carl Note
//!!TO READ!!

function fetchDataGlobalItems() {
    fetch("/API/getListGlobalItems")        //fetch() returns a promise, which resolves to a "response" object. The response it contains, is specified whiten /API/getList. In this case it's the items.json for the user currently logged in, which is stored in "response"
        .then((response) => {               //The resolved promise, which is now stored in "response", is used as parameter for an anonymous function in the .then method
            if (response.ok) {              //.ok method checks if the reponse is whiten [200:299] status-code range, if true execute body of if statement
                return response.json();     //.json() method parses "response" object for json data, the parsed data is then considered a promise, thus we need a new .then method to handle it's resolvement
            }
            throw new Error("response was not in the 200 range ") //Throw statement signal an error has occured. It signals .catch method to overtake the code, once throw has run it's course. Constructor statement "new Error()" stores information about the error
        })
        .then((data) => {
           // createTable(data)   Fixet af Carl
        })                        //The "data" parameter stores the parsed JSON data from the resolved Promise (from response.json()). .then() executes the createTable() function with "data" as input
        .catch((error) => {                                       //If any error occurs in the Promise chain, this .catch() block is executed
            alert("An error occured");                            //Upon error, user is redirected to /login endpoint
        });
}




//createItem() function decleration
function createItem(element, index) {                           
    let tr = document.createElement("tr");                  //declare tablerow and add table data
    let name = document.createElement("td");
    let location = document.createElement("td");
    let expirationDate = document.createElement("td");
    let daysLeft = document.createElement("td");

    let currentDate = new Date();                       //date
    let timeLeft = new Date(Date.parse(element.expirationDate) - currentDate);  
    daysLeft.textContent = `${Math.ceil(timeLeft / (1000 * 60 * 60 * 24))}`     //set textcontent to show the time left before the expirey date

    let editButton = document.createElement("button");      
    editButton.textContent = "Edit";

    let buttonContainer = document.createElement("td");
    let waistedButton = document.createElement("button");
    waistedButton.textContent = "waisted";

    let consumedButton = document.createElement("button");
    consumedButton.textContent = "consumed";

    let propertiesButton = document.createElement("button");
    propertiesButton.textContent = "Properties";

    editButton.addEventListener("click", (e) => {       //shows the addItem menu with the current data. refIndex is used to indicate which tablerow we are currently working with.
        refIndex = index;
        form.location.selected = element.location;
        form.name.value = element.name;
        form.expirationDate.value = element.expirationDate;
        addNewItem();
    })

    waistedButton.addEventListener("click", (e) => {       //adds onclick properties to waisted button. following will occur when the button is pressed
        e.preventDefault();         // prevents the default behavior of the button
        e.stopPropagation();        //The stopPropagation() method of the Event interface prevents further propagation of the current event in the capturing and bubbling phases.
        let data = {
            "index": index
        };
        fetch("/API/waisteditem", {             // sends a POST request to the /API/waisteditem endpoint, which in result will add the posted item to the personal waistedItems.json
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
        fetch("/API/consumeditem", {                // sends a POST request to the /API/waisteditem endpoint, which in result will add the posted item to the personal consumedItems.json
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


    //code properties button here
    let hiddenrow_container = document.createElement("tr");         //declare the row_container to insert our properties
    
    hiddenrow_container.style.display= "none" //hide the container

    propertiesButton.addEventListener("click", () => {          //adds a onclick function to the propertiesbButton. Function will display or hide the properties of the item in the tablerow
        //console.log("The button do stuff")
        if (hiddenrow_container.style.display === "none") {
          hiddenrow_container.style.display = "table-row";
        } else {
          hiddenrow_container.style.display = "none";
        }
      });

      
    let nameofitem=element.name;
    let propname="name";
 
    
    let item = global_item_data.find(obj => obj.name === nameofitem);   //get the item from the globalitemlist 
    
    if (item){//console.log(item.name)                  //if statement is used if the item is in the globalItemList
        for(let props in item){                         //props is the index used to to run through each property of the item.
            if(props==="name"){continue;}               
            else{
                let prop_containtainer=document.createElement("tr")     //declare the HTML elements to insert in to teh hiddenrow_container
                let property_name=document.createElement("td") 
                let property_value=document.createElement("td")
                property_name.textContent=props;                        //give values and textcontent to the declared elements
                property_value.textContent=item[props]
                prop_containtainer.appendChild(property_name)
                prop_containtainer.appendChild(property_value)
                hiddenrow_container.appendChild(prop_containtainer)     //append hiddenrowcontainer
            }
        }
    }
    //private_user_Item_property_data
    //console.log(private_user_Item_property_data)

    if(!item){                  //if statement is used if the item is NOT in the globalItemList
        let item2=private_user_Item_property_data.find(obj =>obj.name===nameofitem)         //get the new item properties from the private itemlist.
        if(item2){
            for(let props in item2){
                if(props==="name"){continue;}
            else{
                let prop_containtainer=document.createElement("tr")         //declare the HTML elements to insert in to teh hiddenrow_container
                let property_name=document.createElement("td") 
                let property_value=document.createElement("td")
                property_name.textContent=props;                            //give values and textcontent to the declared elements
                property_value.textContent=item2[props]
                prop_containtainer.appendChild(property_name)
                prop_containtainer.appendChild(property_value)
                hiddenrow_container.appendChild(prop_containtainer)         //append hiddenrowcontainer
                }
            }
        }
    }
    

    

    name.textContent = element.name;                                        //put the known values in there respectable tabledatas
    location.textContent = element.location;
    expirationDate.textContent = element.expirationDate;

    name.append(editButton);                                                //add editbutton next to the name.
    tr.appendChild(name);                                                   //append all the tabledatas to the tablerow
    tr.appendChild(location);
    tr.appendChild(expirationDate);
    tr.appendChild(daysLeft);
    buttonContainer.appendChild(waistedButton);                             //add the buttons to the buttoncontainer tabledata
    buttonContainer.appendChild(consumedButton);
    buttonContainer.appendChild(propertiesButton);
    tr.appendChild(buttonContainer);                                        //add the buttoncontainer to the tablerow
    container.appendChild(tr);                                              //add tablerow with all information to container.

    //append hiddenrow here
    container.appendChild(hiddenrow_container);
    
}

//This is where the add item function start, its activated when the button additem is pressed. All it does is desplaying the hidden input block.   <------ Carl Note
//addNewItem() function decleration
function addNewItem() {
    form.classList.toggle("visible");    // Makes the block visible
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
    refIndex = undefined;
})

function createTable(data) {            //create whole table function. 
    data.forEach((element, index) => {  //foreach item in the list create an item
        createItem(element, index)      //create a row for iteminformation
    });

}

//removeItems() function decleration
function removeItems() {            //removes the whole table
    document.querySelectorAll("#container>tr").forEach((element) => {
        container.removeChild(element);
    })
    fetchData();        //adds back the list to the page after the item has been removed from getlist
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
    const globalItems = global_item_data;
    const privateUserItems = private_user_Item_property_data;
  
  // Check if the item exists in either of the JSON files
  const itemExistsInGlobal = globalItems.some(item => item.name.toLowerCase() === itemName.toLowerCase());
  const itemExistsInPrivateUser = privateUserItems.some(item => item.name.toLowerCase() === itemName.toLowerCase());
  
    return itemExistsInGlobal || itemExistsInPrivateUser;  // Returns true or false based on bolian logic. Remeber DTG
}



// let global_item_data;

// //Carls COOL API CALL
// let private_user_Item_property_data;
// function OnStartfetchDataOnce() {

//     fetch("/API/GetPrivateProtertyList")            //fetch private item list
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error("response was not in the 200 range ")
//     })
//     .then((data) => {
//       private_user_Item_property_data = data;
//       return fetch("/API/getListGlobalItems"); // Return the second fetch request
//     })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error("response was not in the 200 range ")
//     })
//     .then((data) => {
//       global_item_data = data;
//       return fetch("/API/getList"); // Return the third fetch request
//     })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error("response was not in the 200 range ")
//     })
//     .then((data) => createTable(data))
//     .catch((error) => {
//       alert("An error occured");
//     });
// }


// function updatePrivatePlist(){              //function that gets the new private item property list. Function is called later
//     fetch("/API/GetPrivateProtertyList")        
//         .then((response) => {               
//             if (response.ok) {              
//                 return response.json();    
//             }
//             throw new Error("response was not in the 200 range ") 
//         })
//         .then((data) => {
//             private_user_Item_property_data = data
//             // Adds the private persons items to the private_user_Item_property_data, which is used for later (erlier in code)
//         })                        
//         .catch((error) => {                                       
//             alert("An error occured");                            
//         });

// }


// const  Pprivate_button=document.getElementById("privateitem_submit")        //getElementId from HTML index
// const  kaloriers=document.getElementById("Calories")
// const  Protein=document.getElementById("Protein")
// const  CO2=document.getElementById("CO2")
// const  Carbonhydrate=document.getElementById("Carbonhydrate")
// const  Fat=document.getElementById("Fat")

// Pprivate_button.addEventListener('click' ,()=>{
//     let ppropertydata = {                           //get the inputs from user to put into Private_properties
//         "name": form.name.value,
//         "location": form.location.value,
//         "calories per 100gram": kaloriers.value,
//         "co2 per 1kg": CO2.value,
//         "protein pr 100 gram": Protein.value,
//         "carbohydrate pr 100 gram": Carbonhydrate.value,
//         "fat pr 100 gram": Fat.value,
//       };

// fetch("/API/Private_properties", {      //post ppropertydata to the Private_properties list
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(ppropertydata) 
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log("Response from server:", data);
//     })
//     .catch(error => {
//       console.error("Error sending POST request:", error);
//     });

//     updatePrivatePlist()
// })



