const accessKey = "iNPSDUyxa0TG_XFhLRcDYCsQ-F15nN45FnY106VpMAI";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;
let loadedImages = 0;
const imagesPerLoad = 3;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    const results = data.results;

    const imagesToShow = results.slice(loadedImages, loadedImages + imagesPerLoad);

    if (page === 1) {
        searchResults.innerHTML = ""; // Clear existing images for the first load
    }

    imagesToShow.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
        console.log(result);
    });

    loadedImages += imagesPerLoad;
    if (loadedImages >= results.length) {
        showMore.style.display = "none"; // Hide the button if no more images
    } else {
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => { 
    event.preventDefault();
    page = 1;
    loadedImages = 0;
    searchResults.innerHTML = "";
    searchImages();
});

showMore.addEventListener("click", () => { 
    searchImages();
});
