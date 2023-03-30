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
      let currentDate = new Date();
      // Loop through data and create rows
      data.forEach(item => {
          const row = document.createElement("tr");
          const cell1 = document.createElement("td");
          cell1.textContent = item.name;
          row.appendChild(cell1);

          const cell2 = document.createElement("td");
          cell2.textContent = item.quantity;
          row.appendChild(cell2);

          const cell3 = document.createElement("td");
          cell3.textContent = "";
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
                  table.removeChild(row);
                }
              })
              .catch(error => console.error(error));
          };
          cell4.appendChild(deleteButton);
          row.appendChild(cell4);

          // Add row to table
          table.appendChild(row);
      });

      // Add table to HTML page
      const tableContainer = document.getElementById("shoppinglist");
      tableContainer.appendChild(table);
  })
  .catch(error => console.error(error));
}

const addItemForm = document.getElementById('shoppinglist-form');
addItemForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const itemName = document.getElementById('shoppinglist-input').value;
  const itemQuantity = document.getElementById('shoppinglist-amount').value;
  const itemData = {
    name: itemName,
    quantity: itemQuantity
  };
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
    // do something with the response data, like update the UI
  })
  .catch(error => {
    console.error(error);
  });
});