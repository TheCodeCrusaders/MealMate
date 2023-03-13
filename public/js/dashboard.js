const Papa = require('papaparse'); //Imports papaparse library, which can be accesed by "Papa"

fetch("../CSV/Items.csv")
.then(response => response.text())
.then(data => {
  // Parse the CSV data using PapaParse
  const parsedData = Papa.parse(data, { header: true });
  console.log(parsedData);
});

