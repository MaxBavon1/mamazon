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

let currentPage = 1;
const itemsPerPage = 25;
let items = [];

async function initialize() {
    items = await fetchItems();
    renderTable();
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
            <div class="item-container">
                <div class="img-container" onclick="goToProductPage('${item.name}')">
                    <img src="../img/items/${item.img}/1.png" alt="${item.name}" width="125" class="item-img">
                </div>

                <div class="text-container">
                    <div class="name-rate-container">
                        <div class="name-container">
                            <p class="item-name" onclick="goToProductPage('${item.name}')">${item.name}</p>
                        </div>

                        <div class="rating">
                            <div>${renderStars(item.rating)}</div>
                            <div class="reviews">${item.reviews}</div>
                        </div>
                    </div>
                    
                    <div class="buy-container">
                        <div class="grey-price-container">
                            <div class="price">
                                <span class="price-whole">${item.priceWhole}</span><span class="price-decimal">${item.priceDecimal}</span>
                            </div>
                            <button type="button" class="buy-button" class="add-to-basket" id='${uniqueId}' onclick="addItemToBasket('${item.name}', '${uniqueId}')" onmouseenter="PopIn('${uniqueId}')" onmouseleave="PopOut('${uniqueId}')"><img id="add-to-cart-img" src="../img/add_to_cart.png"></button>
                        </div>
                    </div>  
                </div>
            </div>
        `;
        row.appendChild(cell);
    });

    renderPagination();
    updateBasketCount();
}

function renderPagination() {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const paginationContainer = document.getElementById('page-numbers');
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return;

    const createPageButton = (pageNum, isActive = false) => {
        const pageButton = document.createElement('span');
        pageButton.className = 'page-number';
        pageButton.textContent = pageNum;
        if (isActive) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = pageNum;
            renderTable();
            window.scrollTo(0, 0);
        });
        paginationContainer.appendChild(pageButton);
    };

    if (currentPage > 3) {
        createPageButton(1);
        if (currentPage > 4) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            paginationContainer.appendChild(dots);
        }
    }

    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            createPageButton(i, i === currentPage);
        }
    }

    if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            paginationContainer.appendChild(dots);
        }
        createPageButton(totalPages);
    }

    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

document.getElementById('next-page').addEventListener('click', () => {
    if ((currentPage * itemsPerPage) < items.length) {
        currentPage++;
        renderTable();
        window.scrollTo(0, 0); // Téléporter en haut de la page
    }
});

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
        window.scrollTo(0, 0); // Téléporter en haut de la page
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
