async function fetchItems() {
    try {
        const response = await fetch('../data/json/items.json');
        const items = await response.json();
        return items;
    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
}

function onLoad() {

}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<div class="star full"></div>';
    }

    if (halfStars) {
        starsHtml += '<div class="star half"></div>';
    }

    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<div class="star empty"></div>';
    }

    return starsHtml;
}

function findItem(items, name) {
    return items.find(item => item.name === name);
}

function loadItem(item) {
    let image = document.getElementById("product-img-1");
    image.src = `../img/items/${item.img}/1.png`;
    
    let starsContainer1 = document.getElementById("stars-container-1");
    starsContainer1.innerHTML = renderStars(item.rating);
    
    let starsContainer2 = document.getElementById("stars-container-2");
    starsContainer2.innerHTML = renderStars(item.rating);
}

async function init() {
    document.addEventListener("DOMContentLoaded", onLoad());

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('name');

    let items = await fetchItems();
    let item = findItem(items, name);

    if (item) {
        loadItem(item);
    }
}

init();
