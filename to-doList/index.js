'use strict';

const inputField = document.querySelector("#workToDo");
const addBtn = document.querySelector("#addBtn");

const listContainer = document.querySelector(".todo-lists")

//on clicking the add button
addBtn.addEventListener("click", function () {
    if (inputField.value === '') {
        alert("Input Field cannot be empty.")
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputField.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    saveData();
    inputField.value = "";
})

//onclicking the list elements

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);


//this is the function to save data in local storage
function saveData() {
    // Check if the list container is empty. If it is, do not save the data.
    if (listContainer.innerHTML !== "") {
        localStorage.setItem("data", listContainer.innerHTML);
    }
}

//function to show data stored in local storage
function showData() {
    // Get the data from local storage.
    const data = localStorage.getItem("data");

    // If there is no data stored in local storage, do not display anything.
    if (data !== null) {
        // Display the data in the list container.
        listContainer.innerHTML = data;
    }
}

// Show the data stored in local storage when the page loads.
showData();
