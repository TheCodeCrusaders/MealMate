const fs = require('fs')

// Wait for the HTML to load before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Get the table element by ID
    const table = document.getElementById("food-table");
  
    // Use fetch to read the text file
    fs.readFile('../Dashboard/items.txt')
      .then(response => response.text())
      .then(data => {
        // Split the text file into lines
        const lines = data.split("\n");
  
        // Loop through each line and create a table row
        lines.forEach(line => {
          // Split each line into columns
          const columns = line.split(",");
  
          // Create a new row element
          const row = document.createElement("tr");
  
          // Create a cell for each column and add it to the row
          columns.forEach(column => {
            const cell = document.createElement("td");
            cell.textContent = column;
            row.appendChild(cell);
          });
  
          // Add the row to the table
          table.appendChild(row);
        });
      })
      .catch(error => console.log(error));
  });
  
  