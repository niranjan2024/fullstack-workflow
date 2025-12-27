const tabsData = [
  { title: "Overview", content: "Overview content here..." },
  { title: "Features", content: "Features content here..." },
  { title: "Pricing", content: "Pricing content here..." }
];

const tabsContainer = document.getElementById("tabs");
const contentContainer = document.getElementById("tabContent");

let activeIndex = 0;

const createTabs = () => {
  tabsContainer.innerHTML = "";

  tabsData.forEach((tab, index) => {
    const button = document.createElement("button");
    button.className = "tab";
    button.innerText = tab.title;
    button.dataset.index = index;
    button.setAttribute("tabindex", "0");

    if (index === activeIndex) button.classList.add("active");

    tabsContainer.appendChild(button);
  });

  updateContent();
};

const updateContent = () => {
  contentContainer.innerText = tabsData[activeIndex].content;

  document.querySelectorAll(".tab").forEach((tab, index) => {
    tab.classList.toggle("active", index === activeIndex);
  });
};

tabsContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("tab")) return;

  activeIndex = Number(e.target.dataset.index);
  updateContent();
});

tabsContainer.addEventListener("keydown", (e) => {
  const totalTabs = tabsData.length;

  if (e.key === "ArrowRight") {
    activeIndex = (activeIndex + 1) % totalTabs;
    updateContent();
    tabsContainer.children[activeIndex].focus();
  }

  if (e.key === "ArrowLeft") {
    activeIndex = (activeIndex - 1 + totalTabs) % totalTabs;
    updateContent();
    tabsContainer.children[activeIndex].focus();
  }
});

createTabs();
