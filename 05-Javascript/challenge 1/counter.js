let count = 0;
let step = 1;

const countEl = document.getElementById("count");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");
const resetBtn = document.getElementById("reset");
const stepBtns = document.querySelectorAll(".step");

function updateCount() {
  countEl.innerText = count;

  if (count > 0) countEl.style.color = "green";
  else if (count < 0) countEl.style.color = "red";
  else countEl.style.color = "black";
}

incBtn.addEventListener("click", () => {
  count += step;
  updateCount();
});

decBtn.addEventListener("click", () => {
  if (count - step >= 0) {
    count -= step;
    updateCount();
  }
});

resetBtn.addEventListener("click", () => {
  count = 0;
  updateCount();
});

stepBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    step = Number(btn.innerText);
  });
});
