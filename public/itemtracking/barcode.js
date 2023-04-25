scan_button=document.getElementById("barcode");
 barcode_backdrop = document.getElementById("barcode_backdrop")
 close_barcode=document.getElementById("close_barcode")
 name_of_item=document.getElementById("name_of_item")
 grams_of_item=document.getElementById("grams_of_item")
 found_barcode=document.getElementById("found_barcode")
 close_barcode.addEventListener("click", ()=>{
    barcode_backdrop.style.visibility="hidden"
 })

scan_button.addEventListener("click", ()=>{

//Here goes barcode code start scanning


//Here goes Test Barcode

let resoult_of_scan= 8710508551172;
let resoult_of_scan2=null
//If no item found 
if(typeof resoult_of_scan!== "number"){
alert("sorry did not find any barcode")
}else{

console.log("this is working")
console.log(resoult_of_scan)
console.log(private_user_Item_property_data)

resoult_of_scan= ""+resoult_of_scan;
//So now that we have validated that it is a number, now we need to scan through our know list,
const matchingObject = private_user_Item_property_data.find(obj => obj.barcode === resoult_of_scan);

// Check if a matching object was found
if (matchingObject) {
  console.log("Matching object found:", matchingObject.name);
  barcode_backdrop.style.visibility="visible"
found_barcode.style.display="contents"
name_of_item.textContent=matchingObject.name
grams_of_item.textContent=matchingObject.grams







} else {
  console.log("No matching object found.");
}








}
//If result Pop up

})












