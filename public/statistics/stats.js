document.addEventListener("DOMContentLoaded", (e) => {
    fetch("/API/getWastedItems")
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
          header1.textContent = "Location";
          headerRow.appendChild(header1);
  
          const header2 = document.createElement("th");
          header2.textContent = "Name";
          headerRow.appendChild(header2);
  
          const header3 = document.createElement("th");
          header3.textContent = "Expiration date";
          headerRow.appendChild(header3);
  
          // Add header row to table
          table.appendChild(headerRow);
          
          // Loop through data and create rows
          data.forEach(item => {
              const row = document.createElement("tr");
              const cell1 = document.createElement("td");
              cell1.textContent = item.location;
              row.appendChild(cell1);
              
              const cell2 = document.createElement("td");
              cell2.textContent = item.name;
              row.appendChild(cell2);
  
              const cell3 = document.createElement("td");
              cell3.textContent = item.expirationDate;
              row.appendChild(cell3);
              
              // Add row to table
              table.appendChild(row);
          });
          
          // Add table to HTML page
          const tableContainer = document.getElementById("Total-waste");
          tableContainer.appendChild(table);
      })
      .catch(error => console.error(error));
  })

  document.addEventListener("DOMContentLoaded", (e) => {
    fetch("/API/getConsumedItems")
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
          header1.textContent = "Location";
          headerRow.appendChild(header1);
  
          const header2 = document.createElement("th");
          header2.textContent = "Name";
          headerRow.appendChild(header2);
  
          const header3 = document.createElement("th");
          header3.textContent = "Expiration date";
          headerRow.appendChild(header3);
  
          // Add header row to table
          table.appendChild(headerRow);
          
          // Loop through data and create rows
          data.forEach(item => {
              const row = document.createElement("tr");
              const cell1 = document.createElement("td");
              cell1.textContent = item.location;
              row.appendChild(cell1);
              
              const cell2 = document.createElement("td");
              cell2.textContent = item.name;
              row.appendChild(cell2);
  
              const cell3 = document.createElement("td");
              cell3.textContent = item.expirationDate;
              row.appendChild(cell3);
              
              // Add row to table
              table.appendChild(row);
          });
          
          // Add table to HTML page
          const tableContainer = document.getElementById("Total-consumed");
          tableContainer.appendChild(table);
      })
      .catch(error => console.error(error));
  })