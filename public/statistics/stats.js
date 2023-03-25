function getstuff(api, id){
  fetch(api)
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
        const tableContainer = document.getElementById(id);
        tableContainer.appendChild(table);
    })
  }



  function getchartstuff(api, id) {
    fetch(api)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("response was not in the 200 range " + response.Error);
      })
      .then(data => {
        // Prepare the chart data
        const chartData = {
          labels: [],
          datasets: [],
        };
  
        // Loop through data and populate chartData
        data.forEach(item => {
          // Check if the item name is already in the datasets
          let datasetIndex = chartData.datasets.findIndex(dataset => dataset.label === item.name);
  
          // If the item name is not in the datasets, create a new dataset for the item
          if (datasetIndex === -1) {
            datasetIndex = chartData.datasets.length;
            chartData.datasets.push({
              label: item.name,
              data: [],
              fill: false,
              borderColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              tension: 0.1,
            });
          }
  
          // Add the date to the labels if it's not already there
          if (!chartData.labels.includes(item.wastedDate)) {
            chartData.labels.push(item.wastedDate);
          }
  
          // Increment the data value for the item at the corresponding date index
          const dateIndex = chartData.labels.indexOf(item.wastedDate);
          if (chartData.datasets[datasetIndex].data[dateIndex] === undefined) {
            chartData.datasets[datasetIndex].data[dateIndex] = 1;
          } else {
            chartData.datasets[datasetIndex].data[dateIndex]++;
          }
        });
  
        // Sort the labels (dates) in ascending order
        chartData.labels.sort();
  
        // Create a chart
        const ctx = document.getElementById(id).getContext('2d');
        const chart = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
  }
  
  

// get total wasted and put it into the table
  document.addEventListener("DOMContentLoaded", (e) => {
    getstuff("/API/getWastedItems", "Total-waste");

    getstuff("/API/getConsumedItems", "Total-consumed");

    getstuff("/API/getweeklyWaste", "Weekly-waste");

    getstuff("/API/getmonthlyWaste", "Monthly-waste");

    getchartstuff("/API/getweeklyWaste", "compareNowChart");
    getchartstuff("/API/prevous7days", "compareBeforeChart");

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