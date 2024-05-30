function setupEventListeners() {
    document.getElementById("search-button").addEventListener("click", handleSearch);
    document.getElementById("home-button").addEventListener("click", goToHomePage);
    document.getElementById("basket-button").addEventListener("click", goToBasket);
    document.querySelectorAll('#menu-form input[type="radio"]').forEach((input, index) => {
        input.addEventListener('change', (event) => handleMenuChange(event, index));
    });
}

function handleSearch() {
    const query = document.getElementById("main-search-bar").value.trim();
    if (query) {
        console.log("Search query:", query);
    } else {
        console.log("Please enter a search query");
    }
}

function goToHomePage() {
    window.location.href = "/html/home.html";
}

function goToAboutPage() {
    window.location.href = "/html/about.html";
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

    // Remove active class from all labels
    document.querySelectorAll('.menu-label span').forEach(span => {
        span.classList.remove('active');
    });

    // Add active class to the selected label
    selectedLabel.classList.add('active');

    // Adjust the underline position based on the selected value
    updateUnderlinePosition(index);

    // Store the active menu in localStorage
    localStorage.setItem('activeMenu', selectedValue);

    // Handle redirection
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
    if (selectedValue === 'about') {
        goToAboutPage();
    } else if (selectedValue === 'new') {
        goToHomePage();
    }
    // Add more conditions as needed for other menu items
}

function initializeMenu() {
    const activeMenu = localStorage.getItem('activeMenu');
    const menuItems = document.querySelectorAll('#menu-form .menu-label input[type="radio"]');

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

function addItemToBasket(newItemName, uniqueId) {
    BigPop(uniqueId);

    const newItem = items.find(item => item.name === newItemName);
    if (!newItem) {
        console.error(`Item with name ${newItemName} not found in items list.`);
        return;
    }

    const existingItemIndex = basketItems.findIndex(item => item.item.name === newItemName);
    if (existingItemIndex !== -1) {
        basketItems[existingItemIndex].quantity++;
    } else {
        basketItems.push({ item: newItem, quantity: 1 });
    }

    updateBasketCount();
    saveBasketItems();
}

function updateBasketCount() {
    document.getElementById("basket-count").textContent = getBasketTotalItems();
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

function onLoad() {
    setupEventListeners();
    initializeMenu();
    loadBasketItems();
    updateBasketCount();
    setupMouseAnimations();
}

function init() {
    document.addEventListener("DOMContentLoaded", onLoad);
}

init();