// 'use strict';
const leftBox = document.querySelector(".left");
const lists = document.querySelectorAll(".list"); // Use querySelectorAll to select all elements with class "list"
const rightBox = document.querySelector(".right");

for (const list of lists) { // Use "const" to declare list in the for...of loop
    list.addEventListener("dragstart", (e) => {
        let selected = e.target;

        rightBox.addEventListener("dragover", (e) => {
            e.preventDefault();
        });
        rightBox.addEventListener("drop", (e) => {
            e.preventDefault(); // Prevent the default drop behavior
            rightBox.appendChild(selected);
            selected = null;
        });

        leftBox.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        leftBox.addEventListener("drop", (e) => {
            e.preventDefault();
            leftBox.appendChild(selected);
            selected = null;
        })
    })
}