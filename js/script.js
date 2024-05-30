function handleMenuChange(event) {
    const underline = document.getElementById('underline');
    const selectedValue = event.target.value;

    // Remove active class from all labels
    document.querySelectorAll('.menu-label span').forEach(span => {
        span.classList.remove('active');
    });

    // Add active class to the selected label
    const selectedLabel = event.target.nextElementSibling;
    selectedLabel.classList.add('active');

    // Adjust the underline position based on the selected value
    if (selectedValue === 'new') {
        underline.style.left = '683px';
        underline.style.width = selectedLabel.offsetWidth + 'px';
    } else if (selectedValue === 'trending') {
        underline.style.left = '888px';
        underline.style.width = selectedLabel.offsetWidth + 'px';
    } else if (selectedValue === 'about') {
        underline.style.left = '1121px';
        underline.style.width = selectedLabel.offsetWidth + 'px';
    }

    // Store the active menu in localStorage
    localStorage.setItem('activeMenu', selectedValue);

    // Handle redirection
    if (selectedValue === 'about') {
        window.location.href = 'about.html';
    } else if (selectedValue === 'new') {
        window.location.href = 'home.html'; // Assuming home.html is the home page
    }
    // Add more conditions as needed for other menu items
}

function positionUnderline(selectedLabel) {
    const underline = document.getElementById('underline');
    underline.style.left = selectedLabel.offsetLeft + 'px';
    underline.style.width = selectedLabel.offsetWidth + 'px';
}

function setActiveMenu() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    let activeRadio = null;

    if (page === 'about.html') {
        activeRadio = document.getElementById('about-button');
    } else if (page === 'home.html') {
        activeRadio = document.getElementById('new-button');
    }

    if (activeRadio) {
        activeRadio.checked = true;

        // Add active class to the selected label
        const selectedLabel = activeRadio.nextElementSibling;
        selectedLabel.classList.add('active');

        // Adjust the underline position based on the selected value
        const selectedValue = activeRadio.value;
        const underline = document.getElementById('underline');
        if (selectedValue === 'new') {
            underline.style.left = '683px';
            underline.style.width = selectedLabel.offsetWidth + 'px';
        } else if (selectedValue === 'trending') {
            underline.style.left = '880px';
            underline.style.width = selectedLabel.offsetWidth + 'px';
        } else if (selectedValue === 'about') {
            underline.style.left = '1121px';
            underline.style.width = selectedLabel.offsetWidth + 'px';
        }
    } else {
        // Remove active class from all labels and hide underline
        document.querySelectorAll('.menu-label span').forEach(span => {
            span.classList.remove('active');
        });
        const underline = document.getElementById('underline');
        underline.style.width = '0';
        underline.style.left = '0';
    }
}

function onLoad() {
    document.getElementById("search-button").addEventListener("click", function () {
        const query = document.getElementById("main-search-bar").value.trim();
        if (query) {
            console.log("Search query:", query);
        } else {
            console.log("Please enter a search query");
        }
    });

    document.getElementById("home-button").addEventListener("click", goToHomePage);
    document.getElementById("basket-button").addEventListener("click", goToBasket);

    function goToHomePage() {
        window.location.href = "/html/home.html";
    }

    function goToBasket() {
        window.location.href = "/html/basket.html";
    }

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

    const menuForm = document.getElementById('menu-form');
    menuForm.addEventListener('change', handleMenuChange);

    // Initialize the active menu and underline position
    setActiveMenu();

    loadBasketItems();
    updateBasketCount();
}

document.addEventListener("DOMContentLoaded", onLoad);

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

function saveBasketItems()
{
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
}

function loadBasketItems()
{
    basketItems = JSON.parse(localStorage.getItem("basketItems")) || [];
}

function getBasketTotalItems()
{
    let total = 0;

    basketItems.forEach(item => {
        total += item.quantity;
    });
    return total;
}

function updateBasketCount()
{
    document.getElementById("basket-count").textContent = getBasketTotalItems();
}

function init()
{
    document.addEventListener("DOMContentLoaded", onLoad);
}

let basketItems = [];


init();