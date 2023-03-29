document.addEventListener("DOMContentLoaded", (e) => {
    fetch("/API/gettopexp")
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
                cell1.textContent = item.location;
                row.appendChild(cell1);

                const cell2 = document.createElement("td");
                cell2.textContent = item.name;
                row.appendChild(cell2);

                const cell3 = document.createElement("td");
                let timeLeft = new Date(Date.parse(item.expirationDate) - currentDate);
                cell3.textContent = `Days left ${Math.ceil(timeLeft/ (1000 * 60 *60 *24))}`;
                // cell3.textContent = item.expirationDate;
                row.appendChild(cell3);

                // Add row to table
                table.appendChild(row);
            });

            // Add table to HTML page
            const tableContainer = document.getElementById("shoppinglist");
            tableContainer.appendChild(table);
        })
        .catch(error => console.error(error));
})