let private_user_Item_property_data;
function OnStartfetchDataOnce() {
    fetch("/API/GetPrivateProtertyList")        
    .then((response) => {               
        if (response.ok) {              
            return response.json();
        }
        throw new Error("response was not in the 200 range ") 
    })    
    .then((data) => {
        private_user_Item_property_data=data
        createTable(data)        
    })                        
    .catch((error) => {                                       
        alert("An error occured");                            
    });
}