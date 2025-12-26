let count = 0;
let step = 1;

const countEl = document.getElementById("count");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");
const resetBtn = document.getElementById("reset");
const stepBtns = document.querySelectorAll(".step");

// Update UI
function updateCount() {
  countEl.innerText = count;

  if (count > 0) countEl.style.color = "green";
  else if (count < 0) countEl.style.color = "red";
  else countEl.style.color = "black";
}

// Increment
incBtn.addEventListener("click", () => {
  count += step;
  updateCount();
});

// Decrement (no below 0)
decBtn.addEventListener("click", () => {
  if (count - step >= 0) {
    count -= step;
    updateCount();
  }
});

// Reset
resetBtn.addEventListener("click", () => {
  count = 0;
  updateCount();
});

// Step selector
stepBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    step = Number(btn.innerText);
  });
});
