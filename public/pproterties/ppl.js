////CONST. DECLERATIONS:////
const container = document.querySelector("#container");




////VAR. DECLERATIONS:////

//- Belongs to | Func 1) | Func 2).
let private_user_Item_property_data;

//- Belongs to | Func 2).

//HTML - "New Item" - Button
let create_new_item = document.createElement("button")
create_new_item.textContent = "New Item"

//HTML - "Name of item" - Input bar
let name_of_new_item = document.createElement("input")
name_of_new_item.placeholder = "name of item"




////FUNC. DECLERATIONS:////

//Func 1).
function OnStartfetchDataOnce() {
  fetch("/API/GetPrivateProtertyList")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("response was not in the 200 range ")
    })
    .then((data) => {
      private_user_Item_property_data = data
      createTable(data)
    })
    .catch((error) => {
      alert("An error occured");
    });
}

// Func 2).
function createNewItemLogic() {
  let name = name_of_new_item.value; // HTML input value for item name
  let item = private_user_Item_property_data.find(obj => obj.name === name); // .find() goes through the array "private_user_Item_property_data" and finds the first element with a name property matching var name

  if (item) { // If the item exists
    name_of_new_item.value = "Already in the system!!";
  } else {
    // Creates an object "ppropertydata" with property "name" storing input value for item name
    let ppropertydata = {
      "name": name
    };

    // POST request
    fetch("/API/pp_new_item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // POST body is the JSON string format of ppropertydata
      body: JSON.stringify(ppropertydata)
    })
      .then(response => { // response = fetched data from /API/pp_new_item
        if (!response.ok) { // If response is not within the 200 range
          throw new Error("Network response was not ok");

        } else {
          // response.json() converts the response body to a JavaScript object | "return" is needed to pass response.json() to the next ".then" block
          return response.json();
        }
      })
      .then(data => {
        console.log("Response from server:", data);
      })
      .catch(error => {
        console.error("Error sending POST request:", error);
      });
  }
  // Reloads the page
  location.reload();
}




//EVENTLISTENERS
//Event 1). - Upon all HTML being loaded
document.addEventListener("DOMContentLoaded", (e) => {
  OnStartfetchDataOnce()  //Func 1).
})

//Event 2). - Upon click of "New item"
create_new_item.addEventListener("click", createNewItemLogic);


//SHADI START HER
container.appendChild(create_new_item)
container.appendChild(name_of_new_item)

function createTable(data) {
  data.forEach((element, index) => {
    createItem(element, index)
  });
}

function createItem(element, index) {
  //Part 1      This part will create the first seen not expanded tr rows.

  //Tr is our row where we will put things in
  let tr = document.createElement("tr");
  let name = document.createElement("td");
  name.textContent = element.name;

  // ButtonContainer will be a container box where our function for the button will be stored
  let buttonContainer = document.createElement("td");
  let expand = document.createElement("button");
  expand.textContent = "Se more & edit"
  
  let Delete_item = document.createElement("button");
  Delete_item.textContent = "Delete Item"

  buttonContainer.appendChild(expand);
  buttonContainer.appendChild(Delete_item);

  Delete_item.addEventListener("click", () => {

    let data_To_server = {
      name: element.name
    }
    fetch("/API/ppDeleteitem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data_To_server)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("Response from server:", data);
      })
      .catch(error => {
        console.error("Error sending POST request:", error);
      });

    tr.parentNode.removeChild(tr);
  })

  expand.addEventListener("click", () => {
    if (hiddenRow.style.display === "none") {
      hiddenRow.style.display = "table-row";
      expand.textContent = "Hide Details";
    } else {
      hiddenRow.style.display = "none";
      expand.textContent = "Se more & edit";
    }
  });

  let hiddenRow = document.createElement("tr");
  let textbox1 = document.createElement("text")
  textbox1.style.fontSize = "20px"
  textbox1.textContent = "Properties"
  hiddenRow.appendChild(textbox1)

  let create_prop_button = document.createElement("button")
  create_prop_button.textContent = "Add Properties";

  create_prop_button.addEventListener("click", () => {
    let newproperty = document.createElement("input")
    let newvalue = document.createElement("input")
    newproperty.placeholder = "Propertie name";
    newvalue.placeholder = "Value"
    let containerForNewItem = document.createElement("tr")
    containerForNewItem.appendChild(newproperty)
    containerForNewItem.appendChild(newvalue)
    let delete_prop = document.createElement("button")
    delete_prop.textContent = "Delete";
    delete_prop.addEventListener("click", () => {

      containerForNewItem.parentNode.removeChild(containerForNewItem);
    });


    let savebutton = document.createElement("button")
    savebutton.textContent = "Save Changes" /// <------------ ufærdig feutere med at gemme den nye item


    savebutton.addEventListener("click", () => {



      let closestr = savebutton.closest("tr");
      let inputs = closestr.querySelectorAll("input")


      console.log(inputs[0].value)
      console.log(inputs[1].value)
      console.log(inputs[0].placeholder)
      let New_data_prop = {
        nameofitem: element.name,
        property: inputs[0].value,
        value: inputs[1].value
      }


      fetch("/API/ppsavenewproperties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(New_data_prop)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          console.log("Response from server:", data);
        })
        .catch(error => {
          console.error("Error sending POST request:", error);
        });

    })



    containerForNewItem.appendChild(savebutton)
    containerForNewItem.appendChild(delete_prop)
    hiddenRow.appendChild(containerForNewItem)

  })




  hiddenRow.appendChild(create_prop_button)
  let standard = document.createElement("button")
  standard.textContent = "Add Standart Props";




  standard.addEventListener("click", () => {

    let closestr = standard.closest("tr");

    standarts("calories per 100 gram")
    standarts("co2 per 1kg")
    standarts("protein pr 100 gram")
    standarts("carbohydrate pr 100 gram")
    standarts("fat pr 100 gram")


    function standarts(property) {

      let newproperty = document.createElement("input")
      let newvalue = document.createElement("input")


      newproperty.placeholder = property;
      newvalue.placeholder = "0"
      newproperty.value = property
      let containerForNewItem = document.createElement("tr")

      containerForNewItem.appendChild(newproperty)
      containerForNewItem.appendChild(newvalue)

      let delete_prop = document.createElement("button")
      delete_prop.textContent = "Delete";
      delete_prop.addEventListener("click", () => {
        containerForNewItem.parentNode.removeChild(containerForNewItem);
      });

      let savebutton = document.createElement("button")
      savebutton.textContent = "Save Changes" /// <------------ ufærdig feutere med at gemme den nye item


      savebutton.addEventListener("click", () => {



        let closestr = savebutton.closest("tr");
        let inputs = closestr.querySelectorAll("input")


        console.log(inputs[0].value)
        console.log(inputs[1].value)
        console.log(inputs[0].placeholder)
        let New_data_prop = {
          nameofitem: element.name,
          property: inputs[0].value,
          value: inputs[1].value
        }


        fetch("/API/ppsavenewproperties", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(New_data_prop)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(data => {
            console.log("Response from server:", data);
          })
          .catch(error => {
            console.error("Error sending POST request:", error);
          });

      })



      containerForNewItem.appendChild(savebutton)
      containerForNewItem.appendChild(delete_prop)
      hiddenRow.appendChild(containerForNewItem)




    }



  })

  hiddenRow.appendChild(standard)
  function printPropertyNames(obj) {
    for (let propName in obj) {

      if (propName === "name") { continue; }
      else {
        let prop_containtainer = document.createElement("tr")
        let property_name = document.createElement("input")
        let property_value = document.createElement("input")
        let delete_prop = document.createElement("button")
        delete_prop.textContent = "Delete";
        property_name.placeholder = propName;
        property_value.placeholder = obj[propName]
        prop_containtainer.appendChild(property_name)
        prop_containtainer.appendChild(property_value)


        delete_prop.addEventListener("click", () => {
          const propName = property_name.placeholder;
          const propValue = property_value.placeholder;

          console.log(`Deleting ${propName} : ${propValue}`);
          console.log(element)
          let Deleted_data = {
            name: element.name,
            properties: propName
          }

          fetch("/API/ppDeleteProperti", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(Deleted_data)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(data => {
              console.log("Response from server:", data);
            })
            .catch(error => {
              console.error("Error sending POST request:", error);
            });
          prop_containtainer.parentNode.removeChild(prop_containtainer);
          console.log("tried at least")
        })

        let savebutton = document.createElement("button")
        savebutton.textContent = "Save Changes"

        savebutton.addEventListener("click", () => {

          let closestr = savebutton.closest("tr");
          let inputs = closestr.querySelectorAll("input")


          console.log(inputs[0].value)
          console.log(inputs[1].value)
          console.log(inputs[0].placeholder)
          let New_data_prop = {
            nameofitem: element.name,
            formerprop: inputs[0].placeholder,
            property: inputs[0].value,
            value: inputs[1].value
          }


          fetch("/API/ppsaveproperties", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(New_data_prop)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(data => {
              console.log("Response from server:", data);
            })
            .catch(error => {
              console.error("Error sending POST request:", error);
            });

        })



        prop_containtainer.appendChild(savebutton)
        prop_containtainer.appendChild(delete_prop)

        hiddenRow.appendChild(prop_containtainer)
      }
    }
  }

  printPropertyNames(element);


  hiddenRow.style.display = "none";

  tr.appendChild(name);
  tr.appendChild(buttonContainer);
  container.appendChild(tr);
  container.appendChild(hiddenRow);
}

