const searchBtn = document.querySelector('.search-btn');
const inputSearch = document.getElementById('input-search');
const addBtn = document.getElementById('add');
const mainEl = document.querySelector('main');
const formEl = document.querySelector('form');
const formCloseBtn = document.querySelector('.close');
const submitForm = document.getElementById("submitForm");
const appsContainerEl = document.querySelector('.apps-container');

// Load saved shortcuts on page load
document.addEventListener("DOMContentLoaded", loadShortcuts);

submitForm.addEventListener('click', function (e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let url = document.getElementById('url').value;
    let faviconUrl = getFavicon(url);

    if (!name || !url) {
        alert("Please enter a valid name and URL!");
        return;
    }

    let newShortcut = { name, url, faviconUrl };

    saveShortcut(newShortcut); // Save to localStorage
    createShortcut(newShortcut); // Display on the page

    mainEl.classList.remove('blur');
    formEl.classList.add('hide');

    // Clear input fields
    document.getElementById('name').value = "";
    document.getElementById('url').value = "";
});

function createShortcut(shortcut) {
    let aTag = document.createElement('a');
    let appDiv = document.createElement('div');
    let iconDiv = document.createElement('div');
    let img = document.createElement('img');
    let para = document.createElement('p');
    let deleteBtn = document.createElement('button');


    aTag.appendChild(appDiv);
    appDiv.appendChild(iconDiv);
    appDiv.appendChild(para);
    appDiv.appendChild(deleteBtn);
    iconDiv.appendChild(img);

    aTag.href = shortcut.url;
    aTag.classList.add('card');

    appDiv.classList.add('app');
    iconDiv.classList.add('icon');
    img.src = shortcut.faviconUrl;
    para.classList.add('name');
    para.textContent = shortcut.name;
    appsContainerEl.appendChild(aTag);


     // Add delete button styles & icon
     deleteBtn.textContent = "❌"; 
     deleteBtn.classList.add("delete-btn");

    //  Remove shortcut when delete button is clicked

    deleteBtn.addEventListener('click',function(e){
            e.preventDefault();
            removeShortcut(shortcut.url);
            aTag.remove();
    })

    appsContainerEl.appendChild(aTag);
}



// function to remove shortcut from local storage

function removeShortcut(url)
{
    let shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
    shortcuts = shortcuts.filter(shortcut => shortcut.url !==url); //Remove matching shortcut
    localStorage.setItem('shortcuts',JSON.stringify(shortcuts));// update local storage
}

function getFavicon(url) {
    try {
        let domain = new URL(url).hostname; // Extract domain from URL
        return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
    } catch (error) {
        return "default-icon.png"; // Fallback icon
    }
}

// Save shortcuts to localStorage
function saveShortcut(shortcut) {
    let shortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [];
    shortcuts.push(shortcut);
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
}

// Load shortcuts from localStorage when the page loads
function loadShortcuts() {
    let shortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [];
    shortcuts.forEach(createShortcut);
}

formCloseBtn.addEventListener('click', function (e) {
    e.preventDefault();
    mainEl.classList.remove('blur');
    formEl.classList.add('hide');
});

searchBtn.addEventListener('click', () => {
    searchGoogle();
});

window.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        searchGoogle();
    }
});

addBtn.addEventListener('click', function () {
    mainEl.classList.add('blur');
    formEl.classList.remove('hide');
});

function searchGoogle() {
    let query = inputSearch.value;
    if (query) {
        let googleSearchUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);
        window.open(googleSearchUrl, "_blank");
    }
}
