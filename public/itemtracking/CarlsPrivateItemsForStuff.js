let global_item_data;

//Carls COOL API CALL
let private_user_Item_property_data;
function OnStartfetchDataOnce() {

    fetch("/API/GetPrivateProtertyList")            //fetch private item list
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("response was not in the 200 range ")
    })
    .then((data) => {
      private_user_Item_property_data = data;
      return fetch("/API/getListGlobalItems"); // Return the second fetch request
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("response was not in the 200 range ")
    })
    .then((data) => {
      global_item_data = data;
      return fetch("/API/getList"); // Return the third fetch request
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("response was not in the 200 range ")
    })
    .then((data) => createTable(data))
    .catch((error) => {
      alert("An error occured");
    });
}


function updatePrivatePlist(){              //function that gets the new private item property list. Function is called later
    fetch("/API/GetPrivateProtertyList")        
        .then((response) => {               
            if (response.ok) {              
                return response.json();    
            }
            throw new Error("response was not in the 200 range ") 
        })
        .then((data) => {
            private_user_Item_property_data = data
            // Adds the private persons items to the private_user_Item_property_data, which is used for later (erlier in code)
        })                        
        .catch((error) => {                                       
            alert("An error occured");                            
        });

}


const  Pprivate_button=document.getElementById("privateitem_submit")        //getElementId from HTML index
const  kaloriers=document.getElementById("Calories")
const  Protein=document.getElementById("Protein")
const  CO2=document.getElementById("CO2")
const  Carbonhydrate=document.getElementById("Carbonhydrate")
const  Fat=document.getElementById("Fat")

Pprivate_button.addEventListener('click' ,()=>{
    let ppropertydata = {                           //get the inputs from user to put into Private_properties
        "name": form.name.value,
        "location": form.location.value,
        "calories per 100gram": kaloriers.value,
        "co2 per 1kg": CO2.value,
        "protein pr 100 gram": Protein.value,
        "carbohydrate pr 100 gram": Carbonhydrate.value,
        "fat pr 100 gram": Fat.value,
      };

fetch("/API/Private_properties", {      //post ppropertydata to the Private_properties list
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ppropertydata) 
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

    updatePrivatePlist()
})