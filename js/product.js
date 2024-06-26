function switchProductImage(imageNumber)
{
    // Switches 2 images on the product page to click on them
    const image1 = document.getElementById("product-img-1");
    const image2 = document.getElementById(`product-img-${imageNumber}`);

    let temp = image1.src;
    image1.src = image2.src;
    image2.src = temp;
}

function loadItemLeftContainer(item)
{
    // Self explainatory
    const image1 = document.getElementById("product-img-1");
    const image2 = document.getElementById("product-img-2");
    const image3 = document.getElementById("product-img-3");
    const image4 = document.getElementById("product-img-4");

    image1.src = `../img/items/${item.img}/1.png`;
    image2.src = `../img/items/${item.img}/2.png`;
    image3.src = `../img/items/${item.img}/3.png`;
    image4.src = `../img/items/${item.img}/4.png`;
    
    const starsContainer1 = document.getElementById("stars-container-1");
    starsContainer1.innerHTML = renderStars(item.rating);

    const reviewDiv = document.getElementById("review");
    reviewDiv.querySelector("p").textContent = item.lastReview;
    reviewDiv.querySelector("h3").textContent = item.lastReviewClient;
}

function loadItemRightContainer(item)
{
    // Self explainatory
    document.getElementById("item-name").innerText = item.name;
    const starsContainer2 = document.getElementById("stars-container-2");
    starsContainer2.innerHTML = renderStars(item.rating);

    const priveDiv = document.getElementById("item-price")
    priveDiv.querySelector(".price-whole").innerText = item.priceWhole;
    priveDiv.querySelector(".price-decimal").innerText = item.priceDecimal;

    document.getElementById("product-desc").innerText = item.desc;
    document.getElementById("product-features").innerText = item.features;
    document.getElementById("product-specs").innerText = item.specifications;
    document.getElementById("product-anecdote").innerText = item.customerAnecdotes;
    boldUntilColon();
    document.getElementById("nb-rating").innerText = item.reviews;

    const addToCartButton = document.getElementById("add-to-cart-button");
    addToCartButton.onclick = function () {
        const quantity = document.getElementById("quantity").value;
        addItemToBasket(item.name, 'add-to-cart-button', parseInt(quantity));
    };
}


function loadItem(item) {
    // Self explainatory
    loadItemLeftContainer(item);
    loadItemRightContainer(item);

    document.getElementById("main-container").style.display = "flex";
}


function openPopup() { // Aniation
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');
    const img = document.getElementById('product-img-1');
    popup.style.display = "block";
    popupImg.src = img.src;
}

function closePopup() { // Animation
    document.getElementById('popup').style.display = "none";
}

function boldUntilColon() {
    const boldables = ['product-features', 'product-specs'];
    boldables.forEach(boldable => {
        const container = document.getElementById(boldable);
        const lines = container.innerHTML.split('<br>');

        const modifiedLines = lines.map(line => {
            const index = line.indexOf(':');
            if (index !== -1) {
                return `<strong>${line.substring(0, index + 1)}</strong>${line.substring(index + 1)}`;
            }
            return line;
        });

        container.innerHTML = modifiedLines.join('<br>');
    });
}

function toggleBackgroundColor() {
    const bodyElement = document.querySelector('body');
    if (bodyElement) {
        bodyElement.classList.toggle('inverted-background');
    }
}



function init() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('name');

    let item = findItem(name);
    console.log(item);
    if (item) {
        loadItem(item);
    }
}

document.addEventListener("itemsLoaded", init);