  // get total wasted and put it into the table
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
          header3.textContent = "Date";
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

              const cell4 = document.createElement("td");
              cell4.textContent = item.wastedDate;
              row.appendChild(cell4);
              
              // Add row to table
              table.appendChild(row);
          });
          
          // Add table to HTML page
          const tableContainer = document.getElementById("Total-waste");
          tableContainer.appendChild(table);
      })
      .catch(error => console.error(error));
  })


  // get total consumed and put it into the table
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
          header3.textContent = "Date";
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
              cell3.textContent = item.wastedDate;
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



  // get weekly and put it into the table
  document.addEventListener("DOMContentLoaded", (e) => {
    fetch("/API/getweeklyWaste")
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
          header3.textContent = "Date";
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
              cell3.textContent = item.wastedDate;
              row.appendChild(cell3);
              
              // Add row to table
              table.appendChild(row);
          });
          
          // Add table to HTML page
          const tableContainer = document.getElementById("Weekly-waste");
          tableContainer.appendChild(table);
      })
      .catch(error => console.error(error));
  })

  // get monthly and put it into the table
document.addEventListener("DOMContentLoaded", (e) => {
        fetch("/API/getmonthlyWaste")
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
              header3.textContent = "Date";
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
                  cell3.textContent = item.wastedDate;
                  row.appendChild(cell3);
                  
                  // Add row to table
                  table.appendChild(row);
              });
              
              // Add table to HTML page
              const tableContainer = document.getElementById("Monthly-waste");
              tableContainer.appendChild(table);
          })
          .catch(error => console.error(error));
      })


  function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function openTab2(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent2");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink2");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  // Show the first tab by default
  document.getElementById("table1").style.display = "block";
  document.getElementsByClassName("tablinks")[0].className += " active";
  
  document.getElementById("weekly").style.display = "block";
  document.getElementsByClassName("tablink2")[0].className += " active";