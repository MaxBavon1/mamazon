function switchProductImage(imageNumber)
{
    const image1 = document.getElementById("product-img-1");
    const image2 = document.getElementById(`product-img-${imageNumber}`);

    let temp = image1.src;
    image1.src = image2.src;
    image2.src = temp;
}

function loadItemLeftContainer(item)
{
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
    document.getElementById("item-name").innerText = item.name;
    const starsContainer2 = document.getElementById("stars-container-2");
    starsContainer2.innerHTML = renderStars(item.rating);

    const priveDiv = document.getElementById("item-price")
    priveDiv.querySelector(".price-whole").innerText = item.priceWhole;
    priveDiv.querySelector(".price-decimal").innerText = item.priceDecimal;

    document.getElementById("product-desc").innerText = item.desc;
    document.getElementById("product-features").innerText = item.features;
    document.getElementById("product-specs").innerText = item.specifications;

    const addToCartButton = document.getElementById("add-to-cart-button");
    addToCartButton.onclick = function () {
        const quantity = document.getElementById("quantity").value;
        addItemToBasket(item.name, 'add-to-cart-button', parseInt(quantity));
    };
}


function loadItem(item) {
    loadItemLeftContainer(item);
    loadItemRightContainer(item);

    document.getElementById("main-container").style.display = "flex";
}


// Fonction pour ouvrir la popup
function openPopup() {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');
    const img = document.getElementById('product-img-1');
    popup.style.display = "block";
    popupImg.src = img.src;
}

// Fonction pour fermer la popup
function closePopup() {
    document.getElementById('popup').style.display = "none";
}

// Ajoutez un écouteur d'événement pour l'image
document.getElementById('product-img-1').addEventListener('click', openPopup);



function init() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('name');

    let item = findItem(name);

    if (item) {
        loadItem(item);
    }
}

document.addEventListener("itemsLoaded", init);