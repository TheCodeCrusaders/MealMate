const form = document.querySelector("#itemForm");
const backdrop = document.querySelector("#backdrop");

let refIndex = undefined;

document.addEventListener("DOMContentLoaded", (e) => {
  loadShoppinglist();
})

function loadShoppinglist() {
  fetch("/api/shoppingList")
  .then(response => {
      if (response.ok) {
          return response.json();
      }
      throw new Error("response was not in the 200 range " + response.Error)
  })
  .then(data => {
      // Create table element
      const table = document.createElement("table");


      // Create header row
      const headerRow = document.createElement("tr");
      const header1 = document.createElement("th");
      header1.textContent = "Product";
      headerRow.appendChild(header1);

      const header2 = document.createElement("th");
      header2.textContent = "Quantity";
      headerRow.appendChild(header2);

      const header3 = document.createElement("th");
      header3.textContent = "Price";
      headerRow.appendChild(header3);

      const header4 = document.createElement("th");
      header4.textContent = "";
      headerRow.appendChild(header4);

      // Add header row to table
      table.appendChild(headerRow);

      let total = 0;
      const pricePromises = [];

      // Loop through data and create rows
      data.forEach(item => {
        let productName = "";
        let productLink = "";
          const row = document.createElement("tr");
          const cell1 = document.createElement("td");
          cell1.textContent = item.name;
          row.appendChild(cell1);

          const cell2 = document.createElement("td");
          cell2.textContent = item.quantity;
          row.appendChild(cell2);

          const cell3 = document.createElement("td");
          cell3.className = "cell3";
          cell3.textContent = "";
          cell3.style.cursor = "pointer";
          cell3.addEventListener("click", () => {
            window.open(productLink, "_blank");
          });

          cell3.addEventListener("mouseover", () => {
            cell3.setAttribute("title", "Origin: '" + productName + "' -> Click to view details");
          });

          row.appendChild(cell3);

          const cell4 = document.createElement("td");
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = () => {
            fetch(`/api/shoppingList/${item.id}`, {
              method: 'DELETE'
            })
              .then(response => {
                // Remove row from table on successful deletion
                if (response.ok) {
                  loadShoppinglist();    
                }
              })
              .catch(error => console.error(error));
          };
          cell4.appendChild(deleteButton);

          const addToInventory = document.createElement("button");
          addToInventory.textContent = "Add to inventory";
          addToInventory.onclick = () => {
              addNewItem(item.name, item.id);
          }

          cell4.appendChild(addToInventory);

          row.appendChild(cell4);

          table.appendChild(row);
        })

      // Add table to HTML page
      const tableContainer = document.getElementById("shoppinglist");
      tableContainer.innerHTML = "";
      tableContainer.appendChild(table);
      
  })
  .catch(error => console.error(error));
  }

  function loadPrices() {
    
  }

const addItemForm = document.getElementById('shoppinglist-form');
addItemForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(addItemForm); // Get the form data

  const quantityInput = formData.get('shoppinglist-amount');
  const parsedQuantity = parseInt(quantityInput);
  let itemData = {};

  if (!isNaN(parsedQuantity) && parsedQuantity >= 0 && parsedQuantity <= 1000) {
    itemData = {
      name: formData.get('shoppinglist-input'), // Replace 'username' with the name of your username input field
      quantity: parsedQuantity // Replace 'password' with the name of your password input field
    };
  } else {
    alert("Please enter a number between 1 and 1000 for the quantity.");
    return;
  }

  fetch('/api/shoppingList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemData)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Update the shopping list in the DOM
    setTimeout(() => {
        loadShoppinglist();
      }, 1000);

  })
  .catch(error => {
    console.error(error);

    setTimeout(() => {
        loadShoppinglist();
      }, 1000);
  });
});

function addNewItemToPersonalList(itemId) {
  if (refIndex === undefined) {

    let data = {
      "location": form.location.value,
      "name": form.name.value,
      "expirationDate": form.expirationDate.value
    };
    fetch("/API/postlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          fetch(`/api/shoppingList/` + itemId, {
            method: 'DELETE'
          })
            .then(response => {
              // Remove row from table on successful deletion
              if (response.ok) {
                loadShoppinglist();
              }
            })
        } else {
          throw new Error("Error adding item to personal list");
        }
      })
      .catch(error => {
        console.error(error);
        alert("Error adding item to personal list");
      });
  }
}


//addNewItem() function decleration
function addNewItem(itemName, itemId) {
  form.classList.toggle("visible");
  if (backdrop.style.display === "block") {
      backdrop.style.display = "none";
  }
  else {
      backdrop.style.display = "block";
  }

  document.getElementById("name").value = itemName;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewItemToPersonalList(itemId);
   });
}
backdrop.addEventListener("click", (e) => {
  addNewItem();
  refIndex = undefined;
})