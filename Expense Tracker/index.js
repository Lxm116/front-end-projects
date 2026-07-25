let transactions = [];

const storedTransactions = localStorage.getItem("transactions");

if (storedTransactions) {
    transactions = JSON.parse(storedTransactions);
}

const form = document.querySelector("form");
const descriptionInput = document.querySelector("#dname");
const amountInput = document.querySelector("#ename");
const list = document.querySelector("#transaction-list");




// step 2: Handling user's data

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const description = descriptionInput.value;
    const amount = Number(amountInput.value);
    const transaction = {
        id:Date.now(),
        description,
        amount
    }
    transactions.push(transaction);
    renderAllTransactions();
    updateTotals();
    saveToLocalStorage();

    form.reset();
});


// step 3: 

function addTransactionToDOM(transaction) {
    const li = document.createElement("li");

    li.innerHTML = `
        <div class="list-div">
            ${transaction.description}
            <span>${transaction.amount}</span>
            <button class="delete-btn" data-id="${transaction.id}"> X </button>
        </div>
    `;

    list.appendChild(li);
}


// step 4: updating what user sees

function updateTotals() {
    const amounts = transactions.map(t => t.amount);
    const total = amounts.reduce((acc,val) => acc + val,0);

    const income = amounts  //calculating income(only positives)
        .filter(a => a > 0)
        .reduce((acc, val) => acc + val, 0);

    const expenses = amounts  //calculating expenses(only negatives)
        .filter(a => a < 0)
        .reduce((acc, val) => acc + val, 0);

    //Updating the UI
    document.querySelector(".balance-h2").innerText = `$${total}`;
    document.querySelector(".income-div-amount").innerText = `$${income}`;
    document.querySelector(".expenses-div-amount").innerText = `$${expenses}`;
}



//step 5: Deleting

list.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const id = Number(e.target.dataset.id);
        deleteTransaction(id);
    }
});

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);

    saveToLocalStorage();
    renderAllTransactions();
    updateTotals();
}

function renderAllTransactions() {
    list.innerHTML = "";

    transactions.forEach(addTransactionToDOM);
}


//Step 6: saving

function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

renderAllTransactions();
updateTotals();

