scan_button=document.getElementById("barcode");
 barcode_backdrop = document.getElementById("barcode_backdrop")
 close_barcode=document.getElementById("close_barcode")
 name_of_item=document.getElementById("name_of_item")
 grams_of_item=document.getElementById("grams_of_item")
 found_barcode=document.getElementById("found_barcode")
 confirm_button=document.getElementById("confirm_button")
 expirationDate2=document.getElementById("expirationDate2")
 location_hidden=document.getElementById("location_hidden")
 barcode_scanned_label=document.getElementById("barcode_scanned_label")
 confirm_button2=document.getElementById("confirm_button2")
 new_item_pp=document.getElementById("new_item_pp")
 expirationDate5=document.getElementById("expirationDate5")
 if_barcode_no_item=document.getElementById("if_barcode_no_item")

 confirm_button.addEventListener("click", ()=>{
  let data_found_item = {
    "name": name_of_item.textContent,
    "expirationDate": expirationDate2.value,
    "weight": grams_of_item.textContent,
    "location":location_hidden.textContent
};
console.log(expirationDate2.value)
fetch("/API/postlist", {
  method: "POST", 
  mode: "cors", 
  cache: "no-cache", 
  credentials: "same-origin", 
  headers: {
      "Content-Type": "application/json",
     
  },
  redirect: "follow", 
  referrerPolicy: "no-referrer",
  body: JSON.stringify(data_found_item), 
});
})

 close_barcode.addEventListener("click", ()=>{
    barcode_backdrop.style.visibility="hidden"
 })

let resoult_of_scan4= 8710508551175;
let reoult_of_barcode_no_item=871050855117102;
let resoult_of_scan2=null
let resoult_of_scan=reoult_of_barcode_no_item

scan_button.addEventListener("click", ()=>{

//Here goes barcode code start scanning


//Here goes Test Barcode



if(typeof resoult_of_scan!== "number"){
alert("sorry did not find any barcode")//If no barcode is found
}else{// if it is found


resoult_of_scan= ""+resoult_of_scan;

//So now that we have validated that it is a number, now we need to scan through our know list,
const matchingObject = private_user_Item_property_data.find(obj => obj.barcode === resoult_of_scan);


if (matchingObject) {// Check if a matching object was found aka item in our system
  console.log("Matching object found:", matchingObject.name);
  barcode_backdrop.style.visibility="visible"
found_barcode.style.display="contents"
name_of_item.textContent=matchingObject.name
grams_of_item.textContent=matchingObject.grams
location_hidden.textContent=matchingObject.location



} else {// if no item was found
  console.log("No matching object found.");
  barcode_backdrop.style.visibility="visible"
  if_barcode_no_item.style.visibility="visible"
  barcode_scanned_label.textContent=resoult_of_scan
}
}


})
confirm_button2.addEventListener("click", ()=>{
let search_item=new_item_pp.value

resoult_of_scan= ""+resoult_of_scan;
  const matching = private_user_Item_property_data.find(obj => obj.name === search_item);//here we try to find the item the user try to search for
  if(matching){// if its found we link the item with the barcode, and then add the item to the users list.
    let New_prop={
      nameofitem:search_item,
      property:"barcode",
      value:resoult_of_scan
  }

  fetch("/API/ppsavenewproperties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(New_prop)
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

    let data_add_item = {
      "name": matching.name,
      "expirationDate": expirationDate5.value,
      "weight": matching.grams,
      "location":matching.location
  };

  fetch("/API/postlist", {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache", 
    credentials: "same-origin", 
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data_add_item), 
  });


    console.log("linked item to barcode")
  }
else{// Else we make a new item, and link barcode with it, and add the new item to the users list.
  let New_item_with_barcode={
    "name":search_item,
} 
fetch("/API/pp_new_item", {
  method: "POST",
  headers: {
  "Content-Type": "application/json"
  },
  body: JSON.stringify(New_item_with_barcode)
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

  let new_prop_item_with_barcode={
    nameofitem:search_item,
    property:"barcode",
    value:resoult_of_scan
}
  fetch("/API/ppsavenewproperties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(new_prop_item_with_barcode)
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
    grams_of_new_item=document.getElementById("grams_of_new_item")
    location2=document.getElementById("location2")
    let data_add_item = {
      "name": search_item,
      "expirationDate": expirationDate5.value,
      "weight": grams_of_new_item.value,
      "location":location2.value
  };
  
  fetch("/API/postlist", {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache", 
    credentials: "same-origin", 
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data_add_item), 
  });

console.log("Created new item & linked barcode")
}
})











