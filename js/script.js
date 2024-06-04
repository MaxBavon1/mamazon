function setupEventListeners() {
    document.querySelectorAll('#menu-form input[type="radio"]').forEach((input, index) => {
        input.addEventListener('change', (event) => handleMenuChange(event, index));
    });
}

function clearSearch() {
    document.getElementById("main-search-bar").value = '';
    itemsFilterReset();
}

function handleSearch() {
    const query = document.getElementById("main-search-bar").value.trim().toLowerCase();

    if (query.length > 0) {
        document.getElementById("search-cross").style.display = "block";
    } else {
        document.getElementById("search-cross").style.display = "none";
    }

    items = itemList.filter(item => 
        item.name.toLowerCase().includes(query)
    ).sort((a, b) => {
        const aStartsWith = a.name.toLowerCase().startsWith(query);
        const bStartsWith = b.name.toLowerCase().startsWith(query);
    
        if (aStartsWith && !bStartsWith) {
            return -1;
        }
        if (!aStartsWith && bStartsWith) {
            return 1;
        }
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    document.dispatchEvent(new Event('searchUpdated'));
}

function goToHomePage() {
    window.location.href = "/html/home.html";
}

function goToAboutPage() {
    window.location.href = "/html/about.html";
}

function goToContactPage() {
    window.location.href = "/html/contact.html";
}

function goToBasket() {
    window.location.href = "/html/basket.html";
}

function goToProductPage(name) {
    window.location.href = `/html/product.html?name=${name}`;
}

function handleMenuChange(event, index) {
    const selectedValue = event.target.value;
    const selectedLabel = event.target.nextElementSibling;

    document.querySelectorAll('.menu-label span').forEach(span => {
        span.classList.remove('active');
    });
    selectedLabel.classList.add('active');
    updateUnderlinePosition(index);
    localStorage.setItem('activeMenu', selectedValue);

    handleRedirection(selectedValue);
}

function updateUnderlinePosition(index) {
    const menuItems = document.querySelectorAll('#menu-form .menu-label');
    const selectedLabel = menuItems[index];
    const underline = document.getElementById('underline');
    underline.style.left = `${selectedLabel.offsetLeft}px`;
    underline.style.width = `${selectedLabel.offsetWidth}px`;
}

function handleRedirection(selectedValue) {
    switch (selectedValue) {
        case 'all':
            console.log("all");
            if (!window.location.href.includes('home')) {
                goToHomePage();
            }
            itemsFilterReset();
            break;
        case 'new':
            console.log("new");
            if (!window.location.href.includes('home')) {
                goToHomePage();
            }
            itemsFilterByDate();
            break;
        case 'best':
            if (!window.location.href.includes('home')) {
                goToHomePage();
            }
            itemsFilterByBest();
            break;
        case 'cheap':
            if (!window.location.href.includes('home')) {
                goToHomePage();
            }
            itemsFilterByCheap();
            break;
        case 'expensive':
            if (!window.location.href.includes('home')) {
                goToHomePage();
            }
            itemsFilterByExpensive();
            break;
        case 'contact':
            if (!window.location.href.includes('contact')) {
                goToContactPage();
            }
            break;
        case 'about':
            if (!window.location.href.includes('about')) {
                goToAboutPage();
            }
            break;
        default:
            break;
    }
}

function initializeMenu() {
    if (!window.location.href.includes('basket') && !window.location.href.includes('product')) {
        const activeMenu = localStorage.getItem('activeMenu');
        const menuItems = document.querySelectorAll('#menu-form .menu-label input[type="radio"]');

        handleRedirection(activeMenu);

        if (activeMenu) {
            const activeRadio = document.querySelector(`#menu-form input[value=${activeMenu}]`);
            if (activeRadio) {
                activeRadio.checked = true;
                const index = Array.from(menuItems).indexOf(activeRadio);
                updateUnderlinePosition(index);
                activeRadio.nextElementSibling.classList.add('active');
            }
        } else if (menuItems.length > 0) {
            menuItems[0].checked = true;
            updateUnderlinePosition(0);
            menuItems[0].nextElementSibling.classList.add('active');
        }
    }
}

function resetMenu() {
    document.querySelectorAll('.menu-label span').forEach(span => {
        span.classList.remove('active');
    });
    const underline = document.getElementById('underline');
    underline.style.width = '0';
    underline.style.left = '0';
}

function setupMouseAnimations() {
    let headAnimationInProgress = false;
    let bodyAnimationInProgress = false;

    document.addEventListener("mousemove", function (event) {
        const accountButton = document.getElementById("account-button");
        const accountHead = document.getElementById("account-head");
        const accountBody = document.getElementById("account-body");
        const rect = accountButton.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const withinLeftDistance = mouseX >= rect.left - 25;
        const withinRightDistance = mouseX <= rect.right + 100;
        const withinTopDistance = mouseY >= rect.top - 100;
        const withinBottomDistance = mouseY <= rect.bottom + 100;

        if (
            withinLeftDistance &&
            withinRightDistance &&
            withinTopDistance &&
            withinBottomDistance
        ) {
            if (
                !headAnimationInProgress &&
                !accountHead.classList.contains("move-down-head")
            ) {
                headAnimationInProgress = true;
                accountHead.classList.remove("move-up-head");
                accountHead.classList.add("move-down-head");
                accountHead.addEventListener(
                    "animationend",
                    function () {
                        accountHead.style.display = "none";
                        headAnimationInProgress = false;
                    },
                    { once: true }
                );
            }
            if (
                !bodyAnimationInProgress &&
                !accountBody.classList.contains("move-down-body")
            ) {
                bodyAnimationInProgress = true;
                accountBody.classList.remove("move-up-body");
                accountBody.classList.add("move-down-body");
                accountBody.addEventListener(
                    "animationend",
                    function () {
                        accountBody.style.display = "none";
                        bodyAnimationInProgress = false;
                    },
                    { once: true }
                );
            }
        } else {
            if (
                !headAnimationInProgress &&
                accountHead.classList.contains("move-down-head")
            ) {
                headAnimationInProgress = true;
                accountHead.classList.remove("move-down-head");
                accountHead.style.display = "block";
                accountHead.classList.add("move-up-head");
                accountHead.addEventListener(
                    "animationend",
                    function () {
                        headAnimationInProgress = false;
                    },
                    { once: true }
                );
            }

            if (
                !bodyAnimationInProgress &&
                accountBody.classList.contains("move-down-body")
            ) {
                bodyAnimationInProgress = true;
                accountBody.classList.remove("move-down-body");
                accountBody.style.display = "block";
                accountBody.classList.add("move-up-body");
                accountBody.addEventListener(
                    "animationend",
                    function () {
                        bodyAnimationInProgress = false;
                    },
                    { once: true }
                );
            }
        }
    });
}

function renderStars(rating)
{
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

// Basket-related functions

let basketItems = [];

function saveBasketItems() {
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
}

function loadBasketItems() {
    basketItems = JSON.parse(localStorage.getItem("basketItems")) || [];
}

function getBasketTotalItems() {
    return basketItems.reduce((total, item) => total + item.quantity, 0);
}

function addItemToBasket(newItemName, uniqueId, quantity=1) {
    BigPop(uniqueId);

    const newItem = items.find(item => item.name === newItemName);
    if (!newItem) {
        console.error(`Item with name ${newItemName} not found in items list.`);
        return;
    }

    const existingItemIndex = basketItems.findIndex(item => item.item.name === newItemName);
    if (existingItemIndex !== -1) {
        if (basketItems[existingItemIndex].quantity + quantity <= 10) {
            basketItems[existingItemIndex].quantity += quantity;
        }
    } else {
        basketItems.push({ item: newItem, quantity: quantity });
    }

    updateBasketCount();
    saveBasketItems();
}

function updateBasketCount() {
    const basketCount = getBasketTotalItems();

    const notif = document.getElementById("notif");
    const basketCountElement = document.getElementById("basket-count"); 

    if (basketCount > 0) {
        notif.style.backgroundColor = "#ff4e4e";
    } else {
        notif.style.backgroundColor = "rgba(255,255,255,0)";
    }
    
    if (basketCount <= 9) {
        basketCountElement.textContent = getBasketTotalItems();
    }
    else {
        basketCountElement.textContent = "9+";
    }

    PopIn("basket-count");
}

// Animation helper functions

function PopIn(element) {
    const elem = document.getElementById(element);
    elem.classList.add("pop-in");
    elem.classList.remove("pop-out");
}

function PopOut(element) {
    const elem = document.getElementById(element);
    elem.classList.remove("pop-in");
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

// Items functions
function itemsFilterReset() {
    items = Array.from(itemList);
    document.dispatchEvent(new Event('searchUpdated'));
}
function itemsFilterByBest() {
    items = itemList.slice().sort((a, b) => b.rating - a.rating);
    document.dispatchEvent(new Event('searchUpdated'));
}
function itemsFilterByCheap() {
    items = itemList.slice().sort((a, b) => {
        const aPrice = parseFloat(a.priceWhole.replace('$', '').replace(/,/g, '')) + parseFloat(a.priceDecimal) / 100;
        const bPrice = parseFloat(b.priceWhole.replace('$', '').replace(/,/g, '')) + parseFloat(b.priceDecimal) / 100;
        return aPrice - bPrice;
    });
    document.dispatchEvent(new Event('searchUpdated'));
}
function itemsFilterByExpensive() {
    items = itemList.slice().sort((a, b) => {
        const aPrice = parseFloat(a.priceWhole.replace('$', '').replace(/,/g, '')) + parseFloat(a.priceDecimal) / 100;
        const bPrice = parseFloat(b.priceWhole.replace('$', '').replace(/,/g, '')) + parseFloat(b.priceDecimal) / 100;
        return bPrice - aPrice;
    });
    document.dispatchEvent(new Event('searchUpdated'));
}
function itemsFilterByDate() {
    items = itemList.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    document.dispatchEvent(new Event('searchUpdated'));
}


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

function findItem(name) {
    return itemList.find(item => item.name === name);
}

async function onLoad() {
    itemList = await fetchItems();
    items = Array.from(itemList);

    document.dispatchEvent(new Event('itemsLoaded'));

    setupEventListeners();
    initializeMenu();
    loadBasketItems();
    updateBasketCount();
    setupMouseAnimations();
}

function init() {
    document.addEventListener("DOMContentLoaded", onLoad);
}

let itemList = [];
let items = [];
init();