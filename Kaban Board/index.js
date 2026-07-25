const lists = document.querySelectorAll(".list");
const cards = document.querySelectorAll(".card");


for (const list of lists) {
    list.addEventListener("dragstart", dragStart);
    list.addEventListener("dragend", dragEnd);
}

for (const card of cards) {
    card.addEventListener("dragover",dragOver);
    card.addEventListener("dragenter",dragEnter);
    card.addEventListener("dragleave",dragLeave);
    card.addEventListener("drop",dragDrop);
}

function dragStart(e) {
    e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
    console.log("Drag ended.");
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("over");
}

function dragLeave(e) {
    this.classList.remove("over");
}

function dragDrop(e) {
    const id = e.dataTransfer.getData("text/plain");

    const list = document.getElementById(id);
    this.appendChild(list);
    this.classList.remove("over");
}