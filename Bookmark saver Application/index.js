let savedBookmarks = [];

const storedBookmarks = localStorage.getItem("savedBookmarks");

if (storedBookmarks) {
    savedBookmarks = JSON.parse(storedBookmarks)
}

const bookmarkNameInput = document.querySelector('#bookmark-name');
const bookmarkUrlInput = document.querySelector('#bookmark-url');
const list = document.querySelector('.bookmark-list');
const form = document.querySelector('form');


//2

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = bookmarkNameInput.value;
    const url = bookmarkUrlInput.value;
    const savedBookmark = {
        id:Date.now(),
        name,
        url
    }

    savedBookmarks.push(savedBookmark);
    saveToLocalStorage();
    renderAllTransactions();

    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
});



//3 

function addBookmarkToDOM(savedBookmark) {
    const li = document.createElement("li");

    li.innerHTML = `
        <div class="list-div">
            ${savedBookmark.name}
            <span>${savedBookmark.url}</span>
            <button class="delete-btn" data-id="${savedBookmark.id}">Remove</button>
        </div>
    `;

    list.appendChild(li);
}

//4

function saveToLocalStorage() {
    localStorage.setItem("savedBookmarks", JSON.stringify(savedBookmarks));
}

//5
list.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const id = Number(e.target.dataset.id);
        deleteBookmark(id);
    }
});

function deleteBookmark(id) {
    savedBookmarks = savedBookmarks.filter(t => t.id !== id);

    saveToLocalStorage();
    renderAllTransactions();
}

function renderAllTransactions() {
    list.innerHTML = "";

    savedBookmarks.forEach(addBookmarkToDOM);
}

renderAllTransactions();