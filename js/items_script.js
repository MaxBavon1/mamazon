async function fetchItems() {
    try {
        const response = await fetch('../json/items.json');
        const items = await response.json();
        return items;
    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
}


let currentPage = 1;
const itemsPerPage = 25;
let items = [];

async function initialize() {
    items = await fetchItems();
    renderTable();
}

  
function PopIn(element) {
    const elem = document.getElementById(element);
    elem.classList.remove("pop-out", "big-pop-in", "big-pop-out");
    elem.classList.add("pop-in");
}

function PopOut(element) {
    const elem = document.getElementById(element);
    elem.classList.remove("pop-in", "big-pop-in", "big-pop-out");
    elem.classList.add("pop-out");
}

function BigPop(element) {
    const elem = document.getElementById(element);
    elem.classList.remove("pop-in", "pop-out", "big-pop-out");
    elem.classList.add("big-pop-in");

    setTimeout(() => {
        elem.classList.remove("big-pop-in");
        elem.classList.add("big-pop-out");

        setTimeout(() => {
            elem.classList.remove("big-pop-out");
        }, 100);
    }, 100);
}


function renderTable() {
    const tableBody = document.querySelector('#items-table tbody');
    tableBody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const itemsToDisplay = items.slice(startIndex, endIndex);

    let row;
    itemsToDisplay.forEach((item, index) => {
        if (index % 5 === 0) {
            row = document.createElement('tr');
            tableBody.appendChild(row);
        }

        const uniqueId = `item-${startIndex + index}`;
        const cell = document.createElement('td');
        cell.innerHTML = `
            <div id="item-container">
                <div id="img-container">
                    <img src="../img/items/${item.img}" alt="${item.name}" width="125" id="item-img">
                </div>

                <div id="text-container">
                    <div id="name-rate-container">
                        <div id="name-container">
                            <p>${item.name}</p>
                        </div>

                        <div id="rating">
                            <div>${renderStars(item.rating)}</div>
                            <div id="reviews">${item.reviews}</div>
                        </div>
                    </div>
                    
                    <div id="buy-container">
                        <div id="grey-price-container">
                            <div class="price">
                                <span class="price-whole">${item.priceWhole}</span><span class="price-decimal">${item.priceDecimal}</span>
                            </div>
                            <button type="button" class="buy-button" id='${uniqueId}' onclick="BigPop('${uniqueId}')" onclick="AddToCart()" onmouseenter="PopIn('${uniqueId}')" onmouseleave="PopOut('${uniqueId}')" onclick="addToCart('${uniqueId}')">Add to Cart</button>                        </div>
                    </div>  
                </div>
            </div>
        `;
        row.appendChild(cell);
    });
}




document.getElementById('next-page').addEventListener('click', () => {
    if ((currentPage * itemsPerPage) < items.length) {
        currentPage++;
        renderTable();
    }
});

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});


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




initialize();
