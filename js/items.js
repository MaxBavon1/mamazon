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

function renderItems() {
    renderTable();
    renderPagination();
    updateBasketCount();
}

let currentPage = 1;
const itemsPerPage = 25;

document.addEventListener('itemsLoaded', renderItems);
document.addEventListener('searchUpdated', renderItems);