document.addEventListener("DOMContentLoaded", (e) => {
    fetch("/getList")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("response was not in the 200 range " + response.Error)
        })
        .then(data => createTable(data))
        .catch(error => console.error(error));

})

const form = document.querySelector("#itemForm");
form.expirationDate
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {
        "location": form.location.value,
        "name": form.name.value,
        "expirationDate": form.expirationDate.value
    };
    console.log(data)
    fetch("/postlist", {
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
})

function createTable(data) {
    data.forEach((element, index) => {
        let div = document.createElement("div");
        let name = document.createElement("div");
        let location = document.createElement("div");
        let expirationDate = document.createElement("div");


        name.textContent = element.name;
        location.textContent = element.location;
        expirationDate.textContent = element.expirationDate;

        let waistedButton = document.createElement("button");
        waistedButton.textContent = "waisted";

        let consumedButton = document.createElement("button");
        consumedButton.textContent = "consumed";

        waistedButton.addEventListener("click", (e) => {

        })

        consumedButton.addEventListener("click", (e) => {
            
        })
        
        div.appendChild(name);
        div.appendChild(location);
        div.appendChild(expirationDate);
        div.appendChild(waistedButton);
        div.appendChild(consumedButton);
        container.appendChild(div);

    });
}





