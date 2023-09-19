'use strict';

const apiKey = "sZk11QMVoZ5_IveisrK8c5ECdDZFknoKZ310OqIlKTo";

const searchForm = document.querySelector(".search-form");
const searchFor = document.querySelector("#search-for");
const searchBtn = document.querySelector("#search-btn");
const searchResults = document.querySelector(".search-results");
const showMoreBtn = document.querySelector("#show-moreBtn");
const description = document.querySelector("#description");

let query = "";
let page = 1;


// this is the code using async function
// async function getImages() {
//     // Clear the search results before displaying the new results.
//     searchResults.innerHTML = "";

//     query = searchFor.value;

//     if (!query) {
//         alert("Search Field Cannot be Empty.");
//     } else {
//         const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=12&client_id=${apiKey}`;
//         const response = await fetch(url);
//         let data = await response.json();
//         description.style.display = 'block';


//         const results = data.results;
//         //check if there are 0 results
//         if (results != 0) {
//             if (page === 1) {
//             }

//             //render the each element of array into the html
//             results.map((result) => {
//                 const image = document.createElement("img");
//                 image.src = result.urls.small;
//                 const imgLinks = document.createElement("a");
//                 imgLinks.href = result.links.html;
//                 imgLinks.target = "_blank";
//                 imgLinks.appendChild(image);
//                 searchResults.appendChild(imgLinks);
//             })
//             description.textContent = ` Showing available images for "${query}"`;
//             showMoreBtn.style.display = 'block';
//         } else {
//             description.textContent = ` OOPS!! No images available for"${query}". Try searching something different.`;
//             showMoreBtn.style.display = 'none';

//         }
//     }
// }


//this is the code using promises..
function getImages() {
    // Clear the search results before displaying the new results.
    searchResults.innerHTML = "";

    query = searchFor.value;


    if (!query) {
        alert("Search Field Cannot be Empty.");
    } else {
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=12&client_id=${apiKey}`;
        const response = fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            const results = data.results;
            if (results != 0) {
                //render the each element of array into the html
                results.map((result) => {
                    const image = document.createElement("img");
                    image.src = result.urls.small;
                    const imgLinks = document.createElement("a");
                    imgLinks.href = result.links.html;
                    imgLinks.target = "_blank";
                    imgLinks.appendChild(image);
                    searchResults.appendChild(imgLinks);
                })
                description.textContent = ` Showing available images for "${query}"`;
                showMoreBtn.style.display = 'block';
            } else {
                description.textContent = ` OOPS!! No images available for"${query}". Try searching something different.`;
                showMoreBtn.style.display = 'none';

            }
        }).catch((e) => {
            console("E-", e);
        })


        //check if there are 0 results

    }
}

//to run the function after someone submits something in the search box...
searchForm.addEventListener("submit", function (e) {
    e.preventDefault();//stop the page from reloading..
    page = 1;
    getImages();
})

showMoreBtn.addEventListener("click", () => {
    page++;
    getImages();
})
