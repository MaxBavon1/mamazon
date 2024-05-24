async function fetchItems()
{
    try {
        const response = await fetch('../data/json/items.json');
        const items = await response.json();
        return items;
    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
}

function onLoad()
{
}

function findItem(items, name)
{
    return items.find(item => item.name === name);
}

function loadItem(item)
{
    let image = document.getElementById("product-img");
    image.src = `../img/items/${item.img}/1.png`;
}

async function init()
{
    document.addEventListener("DOMContentLoaded", onLoad());

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const name = urlParams.get('name');

    let items = await fetchItems();

    loadItem(findItem(items, name));
}

init();