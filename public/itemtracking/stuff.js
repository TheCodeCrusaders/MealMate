document.addEventListener("DOMContentLoaded", (e) => {
    fetchData();
})
function fetchData() {
    fetch("/API/getList")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("response was not in the 200 range ")
        })
        .then(data => createTable(data))
    // .catch(error => {
    //     window.location.replace("/login");
    // });
}
let refIndex = undefined;
const form = document.querySelector("#itemForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (refIndex === undefined) {


        let data = {
            "location": form.location.value,
            "name": form.name.value,
            "expirationDate": form.expirationDate.value
        };
        fetch("/API/postlist", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
    }
    else{
        let data = {
            "location": form.location.value,
            "name": form.name.value,
            "expirationDate": form.expirationDate.value,
            "index":refIndex
        };
        fetch("/API/edititem", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
    }
    form.location.selected = "Fridge";
    form.name.value = "";
    form.expirationDate.value = "";
    refIndex = undefined;
    removeItems();

    addNewItem();
})

const container = document.querySelector("#container");
const backdrop = document.querySelector("#backdrop");
const additem = document.querySelector("#additem");
function addNewItem() {
    form.classList.toggle("visible");
    if (backdrop.style.display === "block") {
        backdrop.style.display = "none";
    }
    else {
        backdrop.style.display = "block";
    }
}
additem.addEventListener("click", (e) => {
    addNewItem();
})
backdrop.addEventListener("click", (e) => {
    addNewItem();
    refIndex = undefined;
})

function createTable(data) {
    data.forEach((element, index) => {
        createItem(element, index)
    });

}


function createItem(element, index) {
    let tr = document.createElement("tr");
    let name = document.createElement("td");
    let location = document.createElement("td");
    let expirationDate = document.createElement("td");
    let daysLeft = document.createElement("td");


    name.textContent = element.name;
    location.textContent = element.location;
    expirationDate.textContent = element.expirationDate;


    let currentDate = new Date();
    let timeLeft = new Date(Date.parse(element.expirationDate) - currentDate);
    daysLeft.textContent = `${Math.ceil(timeLeft / (1000 * 60 * 60 * 24))}`

    let buttonContainer = document.createElement("td");
    let waistedButton = document.createElement("button");
    waistedButton.textContent = "waisted";

    let consumedButton = document.createElement("button");
    consumedButton.textContent = "consumed";

    tr.addEventListener("click", (e) => {
        refIndex = index;
        form.location.selected = element.location;
        form.name.value = element.name;
        form.expirationDate.value = element.expirationDate;
        addNewItem();
    })

    waistedButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        let data = {
            "index": index
        };
        fetch("/API/waisteditem", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        }).then(response => {
            if (response.ok) {
                removeItems();
            }

        })

    })

    consumedButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        let data = {
            "index": index
        };
        fetch("/API/consumeditem", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        }).then(response => {
            if (response.ok) {
                removeItems();
            }

        })

    })

    tr.appendChild(name);
    tr.appendChild(location);
    tr.appendChild(expirationDate);
    tr.appendChild(daysLeft);
    buttonContainer.appendChild(waistedButton);
    buttonContainer.appendChild(consumedButton);
    tr.appendChild(buttonContainer);
    container.appendChild(tr);
}

function removeItems() {
    document.querySelectorAll("#container>tr").forEach((element) => {
        container.removeChild(element);

    })
    fetchData();

}
