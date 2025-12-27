/* =======================
   1️ DOM SELECTION
======================= */

const app = document.getElementById("app");
const heading = document.querySelector("h1");
const navLinks = document.querySelectorAll(".nav-link");
const activeLink = document.querySelector(".nav-link.active");
const cards = document.querySelectorAll("article.card");
const secondCard = document.querySelector('article.card[data-id="2"]');
const cardParagraphs = document.querySelectorAll(".card p");


/* =======================
   2️ CREATE PRODUCT CARD
======================= */

function createProductCard(product) {
  const card = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("h3");
  const price = document.createElement("p");
  const button = document.createElement("button");

  card.className = "product-card";
  price.className = "price";
  button.className = "add-to-cart";

  img.src = product.image;
  img.alt = product.name;
  img.style.width = "150px";

  title.textContent = product.name;
  price.textContent = `$${product.price}`;
  button.textContent = "Add to Cart";

  card.append(img, title, price, button);
  return card;
}

const product = {
  name: "Laptop",
  price: 999.99,
  image:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/13-laptop-platinum-right-render-fy25"
};

document.body.appendChild(createProductCard(product));


/* =======================
   3️ ELEMENT MANIPULATION
======================= */

function changeText(element, newText) {
  element.textContent = newText;
}

function addClass(element, className) {
  element.classList.add(className);
}

function toggleClass(element, className) {
  element.classList.toggle(className);
}

function setStyles(element, styles) {
  for (const key in styles) {
    element.style[key] = styles[key];
  }
}

function setDataAttribute(element, key, value) {
  element.dataset[key] = value;
}


/* =======================
   4️ BUTTON DEMO
======================= */

const runDemoBtn = document.getElementById("runDemo");

if (runDemoBtn) {
  runDemoBtn.addEventListener("click", () => {
    const box = document.getElementById("box");
    if (!box) return;

    changeText(box, "Hello, World!");
    addClass(box, "highlight");
    toggleClass(box, "active");

    setStyles(box, {
      backgroundColor: "gray",
      color: "white",
      padding: "10px"
    });

    setDataAttribute(box, "userId", "101");
    console.log(box.dataset.userId);
  });
}


/* =======================
   5️ REMOVE & REPLACE LIST
======================= */

const list = document.getElementById("list");

function removeSecondItem() {
  list?.children[1]?.remove();
}

function replaceFirstItem() {
  if (!list?.firstElementChild) return;
  const li = document.createElement("li");
  li.textContent = "New Item 1";
  list.replaceChild(li, list.firstElementChild);
}

function insertBeforeLast(text) {
  if (!list) return;
  const li = document.createElement("li");
  li.textContent = text;
  list.insertBefore(li, list.lastElementChild);
}

function clearList() {
  if (list) list.innerHTML = "";
}


/* =======================
   6️ BASIC BUTTON EVENTS
======================= */

const btn = document.getElementById("btn");

if (btn) {
  btn.addEventListener("click", () => {
    console.log("Button clicked!");
    btn.textContent = "Clicked!";
  });

  btn.addEventListener("mouseover", () => {
    btn.style.backgroundColor = "green";
    btn.style.color = "white";
  });

  btn.addEventListener("mouseout", () => {
    btn.style.backgroundColor = "";
    btn.style.color = "";
  });
}


/* =======================
   7️ FORM EVENT (EVENT OBJECT)
======================= */

const form = document.getElementById("search-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("search-input");
    if (!input) return;
    console.log(input.value);
    input.value = "";
  });
}


/* =======================
   8️ EVENT DELEGATION
======================= */

const todoList = document.getElementById("todo-list");

if (todoList) {
  todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
      event.target.closest("li")?.remove();
    }
  });
}


/* =======================
   9️ KEYBOARD EVENTS (SAFE)
======================= */

document.addEventListener("keydown", (event) => {
  console.log("Key pressed:", event.key);

  if (event.key === "Escape") {
    const modal = document.getElementById("modal");
    modal?.classList.remove("show");
  }

  if (event.key === "Enter") {
    const active = document.activeElement;
    if (active?.tagName === "INPUT") {
      active.closest("form")?.requestSubmit();
    }
  }
});


/* =======================
   10 COUNTER
======================= */

const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const countDisplay = document.getElementById("count");

let count = 0;

function updateUI() {
  countDisplay.textContent = count;
  decrementBtn.disabled = count === 0;
}

if (incrementBtn && decrementBtn && countDisplay) {
  incrementBtn.addEventListener("click", () => {
    count++;
    updateUI();
  });

  decrementBtn.addEventListener("click", () => {
    if (count > 0) count--;
    updateUI();
  });

  updateUI(); // initial state
}
