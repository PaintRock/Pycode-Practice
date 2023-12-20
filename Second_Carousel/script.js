const accessKey = "iNPSDUyxa0TG_XFhLRcDYCsQ-F15nN45FnY106VpMAI";

const formEl = document.querySelector('form');
const searchInput = document.getElementById('search-input');
const myCarousel = document.querySelector('#myCarousel .carousel-inner');

formEl.addEventListener('submit', async function (e) {
    e.preventDefault();
    const inputData = searchInput.value;
    const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${inputData}&client_id=iNPSDUyxa0TG_XFhLRcDYCsQ-F15nN45FnY106VpMAI`);
    const data = await response.json();

    myCarousel.innerHTML = ''; // Clear existing carousel items

    data.results.slice(0, 3).forEach((result, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) carouselItem.classList.add('active');

        const img = document.createElement('img');
        img.src = result.urls.small;
        img.classList.add('d-block', 'w-100');
        img.alt = result.alt_description;

        carouselItem.appendChild(img);
        myCarousel.appendChild(carouselItem);
    });

    // Initialize the carousel
    $('#myCarousel').carousel();
});

