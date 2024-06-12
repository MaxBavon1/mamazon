let checkoutTimeOut;

function proceedToCheckout(button) {
    // The is the fancy animation for the checkout button
    // It moves the button to a random location on the screen
    const minTranslateX = -1310; // location boudaries
    const maxTranslateX = 205;
    const minTranslateY = -160;
    const maxTranslateY = 600;

    let translateX, translateY;
    do { // Calculates the amount of pixels to move the button
        translateX = Math.floor(Math.random() * (maxTranslateX - minTranslateX + 1)) + minTranslateX;
        translateY = Math.floor(Math.random() * (maxTranslateY - minTranslateY + 1)) + minTranslateY;
    } while (Math.abs(translateX) < 200 || Math.abs(translateY) < 100);

    button.style.transform = `translate(${translateX}px, ${translateY}px)`;

    if (checkoutTimeOut) {
        clearTimeout(checkoutTimeOut);
    }

    checkoutTimeOut = setTimeout(() => {
        button.style.transform = "translate(0px, 0px)";
    }, 2000);
}

function deleteBasketItem(oldItemName) {
    // Self explainatory
    basketItems = basketItems.filter(item => item.item.name !== oldItemName);
    
    updateBasketPage();
}

function updateItemQuantity(itemName, newQuantity) {
    const item = basketItems.find(basketItem => basketItem.item.name === itemName);

    if (item) {
        item.quantity = newQuantity;
    }

    updateBasketPage();
}

function renderBasketItems() {
    // That is the main function that renders the basket items dynamically by creating divs
    const itemsDiv = document.getElementById("basket-items");
    itemsDiv.innerHTML = '';

    basketItems.forEach(basketItem => {
        const item = basketItem.item;
        const wholePrice = calculateItemPrice(item, basketItem.quantity).wholePrice;
        const decimalPrice = calculateItemPrice(item, basketItem.quantity).decimalPrice;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("basket-item");
        // Dynamic div creation and HTML Code
        itemDiv.innerHTML = `
            <div class="basket-item-img">
                <img  id="${item.name}-img" class="basket-item-image" src="../img/items/${item.img}/1.png" alt="${item.name}" width="128" onmouseenter="PopIn('${item.name}-img')" onmouseleave="PopOut('${item.name}-img')">
            </div>
            <div class="basket-item-name">
                <h3 class="item-name"> ${item.name} </h3>
                <p> In stock</p>
                <label id="gift" for="gift"> <input id="gift" type="checkbox"> This is a gift </label>
                
                <div>
                    <div class="quantity-item">
                        <select id="quantity-select-${item.name}">
                            <option value="1"> Qty : 1 </option>
                            <option value="2"> Qty : 2 </option>
                            <option value="3"> Qty : 3 </option>
                            <option value="4"> Qty : 4 </option>
                            <option value="5"> Qty : 5 </option>
                            <option value="6"> Qty : 6 </option>
                            <option value="7"> Qty : 7 </option>
                            <option value="8"> Qty : 8 </option>
                            <option value="9"> Qty : 9 </option>
                            <option value="10"> Qty : 10 </option>
                        </select>
                    </div>
                        
                    <button id="delete-button" class="noselect" onclick="deleteBasketItem('${item.name}')">
                        <span class="text">Delete</span>
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                                </path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
            <div class="basket-item-price">
                <h3> ${wholePrice} </h3>
                <p> ${decimalPrice} </p>
            </div>`;

        itemsDiv.appendChild(itemDiv);

        // Makes the HMTL content created dynamic
        const selectQuantity = document.getElementById(`quantity-select-${item.name}`);

        selectQuantity.value = basketItem.quantity.toString();

        selectQuantity.addEventListener('change', (event) => {
            updateItemQuantity(item.name, parseInt(event.target.value, 10));
        })

        // Product Page for each image
        itemDiv.querySelector(".basket-item-image").addEventListener("click", () => goToProductPage(item.name));
        itemDiv.querySelector(".item-name").addEventListener("click", () => goToProductPage(item.name));
    });
}

function renderRecommendedItems()
{
    // This function renders the recommended items on the basket page
    const itemsDiv = document.getElementById("recom-items");
    itemsDiv.innerHTML = '';

    let itemIndexs = []; // It selects 3 random items from the list
    for (i = 0; i < 3; i++) {
        let itemIndex;
        do {
            itemIndex = Math.floor(Math.random() * itemList.length); // Random number from 0 to the length of the list
        } while (itemIndexs.includes(itemIndex));
        itemIndexs.push(itemIndex);
    }

    for (i = 0; i < itemIndexs.length; i++) { // 3 times for 3 random items
        let itemIndex = itemIndexs[i];
        let item = itemList[itemIndex];

        const itemDiv = document.createElement("div");
        const uniqueId = `recom-item-${itemIndex}`;
        itemDiv.classList.add("recom-item");
        // Dynamic div creation and HTML Code
        itemDiv.innerHTML = `
            <div class="recom-item-img">
                <img id="${item.name}-img2" class="recom-item-image" src="../img/items/${item.img}/1.png" alt="${item.name}" onmouseenter="PopIn('${item.name}-img2')" onmouseleave="PopOut('${item.name}-img2')">
            </div>
            <div class="recom-item-name">
                <p class="recom-name"> ${item.name} </p>
                <p id="recom-price"> ${item.priceWhole} <span> ${item.priceDecimal} </span> </p>
                <button class="buy-button" id="${uniqueId}" onmouseenter="PopIn('${uniqueId}')" onmouseleave="PopOut('${uniqueId}')"> Add to Cart </button>
                
            </div>`;

        itemsDiv.appendChild(itemDiv);
        
        // Makes the HMTL content created dynamic
        itemDiv.querySelector(".recom-item-img").addEventListener("click", () => goToProductPage(item.name));
        itemDiv.querySelector(".recom-name").addEventListener("click", () => goToProductPage(item.name));
        itemDiv.querySelector(".buy-button").addEventListener("click", function() {
            addItemToBasket(item.name, uniqueId)
            updateBasketPage(); });
    }
}

function calculateItemPrice(item, quantity)
{
    // This function calculates the price of an item based on the quantity
    // Needed because the price is split into 2 parts
    // It returns the whole price and the decimal price
    let totalWholePrice = 0;
    let totalDecimalPrice = 0;

    const wholePrice = parseInt(item.priceWhole.replace(/[\$,]/g, ''), 10);
    const decimalPrice = parseInt(item.priceDecimal, 10);

    totalWholePrice += wholePrice * quantity;
    totalDecimalPrice += decimalPrice * quantity;

    // Handle decimal overflow (e.g., 100 cents = 1 dollar)
    const additionalWholePrice = Math.floor(totalDecimalPrice / 100);
    totalWholePrice += additionalWholePrice;
    totalDecimalPrice = totalDecimalPrice % 100;

    // Format the whole price with commas
    const formattedWholePrice = totalWholePrice.toLocaleString("en-US");


    return {
        wholePrice: `$${formattedWholePrice}`,
        decimalPrice: totalDecimalPrice.toString().padStart(2, '0')
    };  
}

function calculateTotalPrice(basketItems) {
    // Number of items in the basket * quantity for each item
    let totalWholePrice = 0;
    let totalDecimalPrice = 0;

    basketItems.forEach(basketItem => {
        const item = basketItem.item;
        
        // Remove non-numeric characters (e.g., $, ,) and parse as integer
        const wholePrice = parseInt(item.priceWhole.replace(/[\$,]/g, ''), 10);
        const decimalPrice = parseInt(item.priceDecimal, 10);

        totalWholePrice += wholePrice * basketItem.quantity;
        totalDecimalPrice += decimalPrice * basketItem.quantity;
    });

    // Handle decimal overflow (e.g., 100 cents = 1 dollar)
    const additionalWholePrice = Math.floor(totalDecimalPrice / 100);
    totalWholePrice += additionalWholePrice;
    totalDecimalPrice = totalDecimalPrice % 100;

    // Format the whole price with commas
    const formattedWholePrice = totalWholePrice.toLocaleString("en-US");

    return {
        wholePrice: `$${formattedWholePrice}`,
        decimalPrice: totalDecimalPrice.toString().padStart(2, '0')
    };
}

function renderSubTotal() {
    // Shows the sub total using the 2 above functions
    document.getElementById("number-items").innerText = getBasketTotalItems();
    let prices = calculateTotalPrice(basketItems);
    document.getElementById("subtotal-whole-price").innerText = prices.wholePrice;
    document.getElementById("subtotal-decimal-price").innerText = prices.decimalPrice;
}

function updateBasketPage()
{
    saveBasketItems();
    renderBasketItems();
    renderSubTotal();
    updateBasketCount();
}

function onLoad() {
    loadBasketItems();
    updateBasketPage();
}

document.addEventListener("DOMContentLoaded", onLoad);
document.addEventListener("itemsLoaded", renderRecommendedItems);