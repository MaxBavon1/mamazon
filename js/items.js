function renderTable() {
    // Main rendering function that dinamicly creates the table with items
    const tableBody = document.querySelector('#items-table tbody');
    tableBody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage; // Page indexing calculations

    const itemsToDisplay = items.slice(startIndex, endIndex);

    let row;
    itemsToDisplay.forEach((item, index) => { // For each item in the items array
        if (index % 5 === 0) {
            row = document.createElement('tr'); // Table row creation
            tableBody.appendChild(row);
        }

        const uniqueId = `item-${startIndex + index}`;
        const cell = document.createElement('td');
        // Whole dinamyc HTML creation
        cell.innerHTML = `
            <div class="item-container">
                <div class="img-container" onclick="goToProductPage('${item.name}')">
                    <img id="${item.img}-id" src="../img/items/${item.img}/1.png" alt="${item.name}" width="125" class="item-img" onmouseenter="PopIn('${item.img}-id')" onmouseleave="PopOut('${item.img}-id')">
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
}

function renderPagination() {
    // Renders the bottom pagination buttons (1, 2, 3, ...)
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
            renderItems();
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
        createPageButton(i, i === currentPage);
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

function renderItems() {
    renderTable();
    renderPagination();
    updateBasketCount();
}

function setupPaginationButtons() {
    // Set up the event listeners for the pagination buttons (prev, next)
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderItems();
            window.scrollTo(0, 0);
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderItems();
            window.scrollTo(0, 0);
        }
    });
}

let currentPage = 1; // Current page number
const itemsPerPage = 25; // Number of items per page

document.addEventListener('itemsLoaded', renderItems);
document.addEventListener('searchUpdated', renderItems);

setupPaginationButtons();
